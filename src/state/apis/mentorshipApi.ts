import { api } from "../api"; // Import your main API slice

// --- Types based on Backend Models ---

export interface MentorshipSession {
  sessionId: string;
  studentId: string;
  teacherId: string;
  courseId: string;
  date: string; // ISO Date String
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatMessage {
  sessionId: string;
  timestamp: number;
  senderId: string;
  senderName: string;
  text: string;
}

export interface AgoraTokenResponse {
  token: string;
  channelName: string;
  uid: number;
}

// --- API Slice ---

export const mentorshipApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Schedule a new session
    createMentorshipSession: builder.mutation<
      { message: string; data: MentorshipSession },
      {
        studentId: string;
        teacherId: string;
        courseId: string;
        date: string;
      }
    >({
      query: (body) => ({
        url: "/mentorship",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MentorshipSessions"],
    }),

    // 2. Get sessions for a user (Student or Teacher)
    getUserMentorshipSessions: builder.query<
      MentorshipSession[],
      { userId: string; type: "student" | "teacher" }
    >({
      query: ({ userId, type }) => ({
        url: `/mentorship/user/${userId}`,
        params: { type },
      }),
      providesTags: ["MentorshipSessions"],
    }),
    // 5. Update Session Status
    updateMentorshipSession: builder.mutation<
      { message: string; data: MentorshipSession },
      { sessionId: string; status: "scheduled" | "completed" | "cancelled" }
    >({
      query: ({ sessionId, status }) => ({
        url: `/mentorship/${sessionId}`,
        method: "PATCH",
        body: { status },
      }),
      // Invalidate tags so the Session List updates immediately
      invalidatesTags: ["MentorshipSessions"],
    }),

    // 3. Get Agora Video Token
    getAgoraToken: builder.query<AgoraTokenResponse, string>({
      query: (sessionId) => `/mentorship/token/${sessionId}`,
      // Don't cache tokens for too long as they expire
      keepUnusedDataFor: 0,
    }),

    // 4. Get Chat History
    getChatHistory: builder.query<ChatMessage[], string>({
      query: (sessionId) => `/mentorship/chat/${sessionId}`,
      //   transformResponse: (response: { data: ChatMessage[] }) => response.data,
    }),
  }),
});

export const {
  useCreateMentorshipSessionMutation,
  useGetUserMentorshipSessionsQuery,
  useUpdateMentorshipSessionMutation,
  useGetAgoraTokenQuery, // Use 'lazy' to fetch on click
  useLazyGetAgoraTokenQuery,
  useGetChatHistoryQuery,
} = mentorshipApi;
