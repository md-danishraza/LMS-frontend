'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { Loader2, Mic, Video, PhoneOff, Send, MicOff, VideoOff, User as UserIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useGetAgoraTokenQuery, useGetChatHistoryQuery,useUpdateMentorshipSessionMutation } from '@/state/apis/mentorshipApi';
import { io, Socket } from 'socket.io-client';
import { cn } from '@/lib/utils';
import AgoraRTC, {
  AgoraRTCProvider,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
  RemoteUser,
  LocalVideoTrack,
} from 'agora-rtc-react';

// --- 1. MAIN PAGE COMPONENT (Data Fetching) ---
export default function TeacherSessionPage() {
  const { sessionId } = useParams();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Fetch Token
  const { 
    data: tokenData, 
    isLoading: isTokenLoading, 
    error: tokenError 
  } = useGetAgoraTokenQuery(sessionId as string, {
    skip: !sessionId || !user,
  });

  // Fetch Chat History
  const { data: chatHistory } = useGetChatHistoryQuery(sessionId as string, {
    skip: !sessionId || !user,
  });

  if (!isLoaded || isTokenLoading) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Connecting to secure session...</p>
      </div>
    );
  }

  if (!user) return <div className="p-10 text-center">Please sign in.</div>;
  
  if (tokenError || !tokenData) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-destructive">Connection Failed</h2>
        <p className="text-muted-foreground">Could not verify session token.</p>
        <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <AgoraWrapper 
      sessionId={sessionId as string} 
      token={tokenData.token} 
      uid={tokenData.uid}
      user={user}
      initialChatHistory={chatHistory || []}
    />
  );
}

// --- 2. AGORA WRAPPER (Initializes Client) ---
// We separate this to ensure the Agora Client is created only once
function AgoraWrapper({ sessionId, token, uid, user, initialChatHistory }: any) {
  // Create the client instance
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' })
  );

  return (
    <AgoraRTCProvider client={client}>
      <SessionRoom 
        sessionId={sessionId} 
        token={token} 
        uid={uid} 
        user={user}
        initialChatHistory={initialChatHistory}
      />
    </AgoraRTCProvider>
  );
}

// --- 3. SESSION ROOM (The Actual UI) ---
function SessionRoom({ sessionId, token, uid, user, initialChatHistory }: any) {
  const router = useRouter();
//   updating session to mark completed
  const [updateSession] = useUpdateMentorshipSessionMutation();
  // get clerk token
  const { getToken } = useAuth();

  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
   // Safety Check
   if (!appId) {
    return (
      <div className="flex h-full items-center justify-center text-destructive">
        Error: Agora App ID is missing in environment variables.
      </div>
    );
  }
  
  // -- Agora Hooks --
  const { isLoading: isJoining } = useJoin(
    { appid: appId, channel: sessionId, token, uid }
  );
  
  
  const { localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { localCameraTrack } = useLocalCameraTrack();

  // This prevents publishing "empty" tracks which can look like mute
  const [readyToPublish, setReadyToPublish] = useState(false);
  
  useEffect(() => {
    if (localMicrophoneTrack && localCameraTrack) {
      setReadyToPublish(true);
    }
  }, [localMicrophoneTrack, localCameraTrack]);

  usePublish([
    readyToPublish ? localMicrophoneTrack : null,
    readyToPublish ? localCameraTrack : null
  ]);

  const remoteUsers = useRemoteUsers();

  // -- Local UI State --
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Declare the variable OUTSIDE the async function
    let socketInstance: Socket | null = null;

    const initSocket = async () => {
      const token = await getToken();
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001";
      
      // 2. Assign to the outer variable
      socketInstance = io(baseUrl, {
        auth: { token: token } 
      });
      
      setSocket(socketInstance);

      socketInstance.emit("joinRoom", { sessionId });

      socketInstance.on("newMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      if (initialChatHistory) {
        setMessages(initialChatHistory);
      }
    };

    initSocket();

    // 3. Cleanup using the outer variable
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [sessionId, initialChatHistory, getToken]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
        // Simple, robust scroll to bottom
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      sessionId,
      senderId: user.id,
      senderName: user.fullName || "Teacher", // Fallback if name isn't available
      text: newMessage,
      timestamp: Date.now(),
    };

    // Emit to server (Server will broadcast back)
    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  // -- Media Controls --
  const toggleMic = () => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack.setEnabled(!micOn);
      setMicOn(!micOn);
    }
  };

  const toggleCamera = () => {
    if (localCameraTrack) {
      localCameraTrack.setEnabled(!cameraOn);
      setCameraOn(!cameraOn);
    }
  };

  const handleLeave = async () => {
    // Confirm with the teacher
    if (window.confirm("Do you want to mark this session as Completed?")) {
      try {
        // Call backend to update status
        await updateSession({ 
          sessionId, 
          status: "completed" 
        }).unwrap();
        
        // Redirect to dashboard
        router.push('/teacher/sessions');
      } catch (error) {
        console.error("Failed to update session:", error);
        // Even if it fails, we probably want to leave the page
        router.push('/teacher/sessions');
      }
    } else {
        // If they cancel, maybe they just want to leave the room without ending the session?
        // Or just do nothing.
        router.push('/teacher/sessions'); 
    }
  };
    return (
      // 1. Main Wrapper:
      // Mobile: Allow page scroll if content is tall.
      // Desktop: Fixed height (viewport - header), no page scroll.
      <div className="flex flex-col p-4 gap-4 lg:h-[calc(100vh-100px)] lg:overflow-hidden">
        
        {/* Header / Back Button */}
        <div className="flex items-center justify-between shrink-0">
          <Button variant="ghost" size="sm" onClick={handleLeave} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            Session ID: {sessionId}
          </div>
        </div>
  
        {/* 2. Content Container */}
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-1 lg:min-h-0">
          
          {/* --- LEFT: VIDEO AREA --- */}
          {/* Mobile: Fixed height (50vh or 400px) so it doesn't squash. */}
          {/* Desktop: Flex-1 (take remaining width) and full height. */}
          <div className="flex-col gap-4 relative w-full h-[500px] min-h-[500px] lg:h-auto lg:flex-1 lg:flex">
            <Card className="flex-1 bg-zinc-950 relative overflow-hidden rounded-xl border-zinc-800 w-full h-full">
              
              {/* Remote Video (Student) */}
              <div className="absolute inset-0 flex items-center justify-center">
                {remoteUsers.length > 0 ? (
                  <div className="w-full h-full grid grid-cols-1 gap-2 p-2">
                    {remoteUsers.map((remoteUser) => (
                      <div key={remoteUser.uid} className="relative w-full h-full bg-zinc-900 rounded-lg overflow-hidden">
                        <RemoteUser user={remoteUser} style={{ width: '100%', height: '100%' }} />
                        <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-white text-sm">
                          Student (Remote)
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-zinc-500 flex flex-col items-center gap-2">
                    {isJoining ? (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    ) : (
                      <UserIcon className="h-16 w-16 opacity-20" />
                    )}
                    <p>Waiting for student to join...</p>
                  </div>
                )}
              </div>
  
              {/* Local Video (Teacher - PIP) */}
              <div className="absolute top-4 right-4 w-32 h-24  bg-zinc-900 rounded-lg border border-zinc-700 shadow-xl overflow-hidden z-10">
                {cameraOn && localCameraTrack ? (
                  <LocalVideoTrack track={localCameraTrack} play style={{ width: '100%', height: '100%' }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500 text-xs">
                    Camera Off
                  </div>
                )}
              </div>
  
              {/* Controls Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 p-3 bg-zinc-900/90 backdrop-blur-md rounded-full border border-zinc-800 z-20">
                <Button 
                  variant={micOn ? "secondary" : "destructive"} 
                  size="icon" 
                  className="rounded-full"
                  onClick={toggleMic}
                >
                  {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                <Button 
                  variant={cameraOn ? "secondary" : "destructive"} 
                  size="icon" 
                  className="rounded-full"
                  onClick={toggleCamera}
                >
                  {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="rounded-full px-8"
                  onClick={handleLeave}
                  title="End Session"
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
  
          {/* --- RIGHT: CHAT AREA --- */}
          {/* Mobile: Fixed height (500px) so it's usable. */}
          {/* Desktop: Fixed width (96) and full height (h-auto/full). */}
          <Card className="w-full h-[500px] flex flex-col border shadow-sm overflow-hidden lg:w-96 lg:h-auto">
            {/* Header */}
            <div className="p-4 border-b font-semibold bg-muted/30 flex justify-between items-center shrink-0">
              <span>Session Chat</span>
              <div 
                className={cn("h-2 w-2 rounded-full", socket?.connected ? "bg-green-500" : "bg-yellow-500")} 
                title={socket?.connected ? "Connected" : "Connecting..."}
              />
            </div>
            
            {/* Messages List */}
            {/* flex-1 + min-h-0 is crucial for internal scrolling */}
            <div 
              ref={scrollRef} 
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-background"
            >
              {messages.map((msg, i) => {
                const isMe = msg.senderId === user.id;
                return (
                  <div key={i} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                    <div className={cn(
                      "px-3 py-2 rounded-lg text-sm max-w-[85%] break-words",
                      isMe 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-secondary text-secondary-foreground rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 mx-1">
                      {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm opacity-50">
                   No messages yet. Say hi!
                </div>
              )}
            </div>
  
            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2 bg-background shrink-0">
              <Input 
                placeholder="Type a message..." 
                className="flex-1" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>
  
        </div>
      </div>
    );
}



