'use client';
import { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle,
  Trophy,
  PlayCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
 
} from '@/components/ui/sidebar';
import Loader from '@/components/Loader'; 
import { useCourseProgressData } from '@/hooks/useCourseProgressData'; 

const ChapterSidebar = () => {
  const router = useRouter();
  
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const {
    user,
    course,
    userProgress,
    chapterId,
    courseId,
    isLoading,
    updateChapterProgress,
  } = useCourseProgressData();

  // Expand the section that contains the current chapter on load
  useEffect(() => {
    if (course && chapterId) {
      const currentSection = course.sections.find((s) =>
        s.chapters.some((c) => c.chapterId === chapterId)
      );
      if (currentSection && !expandedSections.includes(currentSection.sectionTitle)) {
        setExpandedSections((prev) => [...prev, currentSection.sectionTitle]);
      }
    }
  }, [course, chapterId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <div className="p-4"><Loader /></div>;
  if (!user) return <div className="p-4 text-muted-foreground">Please sign in.</div>;
  if (!course || !userProgress) return <div className="p-4 text-destructive">Error loading content</div>;

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(sectionTitle)
        ? prevSections.filter((title) => title !== sectionTitle)
        : [...prevSections, sectionTitle]
    );
  };

  const handleChapterClick = (sectionId: string, chapterId: string) => {
    router.push(`/user/courses/${courseId}/chapters/${chapterId}`, {
      scroll: false,
    });
  };

  return (
    <Sidebar
      collapsible="none"
      className="hidden md:flex w-80 border-r bg-card h-full overflow-y-auto"
    >
      <SidebarHeader className="p-5 border-b">
        <h2 className="font-bold text-lg line-clamp-2">{course.title}</h2>
      </SidebarHeader>
      
      <SidebarContent className="p-0 gap-0">
        {course.sections.map((section, index) => (
          <Section
            key={section.sectionId}
            section={section}
            index={index}
            sectionProgress={userProgress.sections?.find(
              (s) => s.sectionId === section.sectionId
            )}
            chapterId={chapterId as string}
            courseId={courseId as string}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            handleChapterClick={handleChapterClick}
            updateChapterProgress={updateChapterProgress}
          />
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

const Section = ({
  section,
  index,
  sectionProgress,
  chapterId,
  expandedSections,
  toggleSection,
  handleChapterClick,
  updateChapterProgress,
}: any) => {
  const completedChapters =
    sectionProgress?.chapters.filter((c: any) => c.completed).length || 0;
  const totalChapters = section.chapters.length;
  const isExpanded = expandedSections.includes(section.sectionTitle);

  return (
    <div className="border-b last:border-none">
      {/* Section Header */}
      <div
        onClick={() => toggleSection(section.sectionTitle)}
        className="flex w-full items-center justify-between p-4 hover:bg-accent/50 cursor-pointer transition-colors"
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Section {index + 1}
          </p>
          <h3 className="font-semibold text-sm text-foreground">
            {section.sectionTitle}
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="bg-background pb-2">
          <ProgressVisuals
            section={section}
            sectionProgress={sectionProgress}
            completedChapters={completedChapters}
            totalChapters={totalChapters}
          />
          <ChaptersList
            section={section}
            sectionProgress={sectionProgress}
            chapterId={chapterId}
            handleChapterClick={handleChapterClick}
            updateChapterProgress={updateChapterProgress}
          />
        </div>
      )}
    </div>
  );
};

const ProgressVisuals = ({
  section,
  sectionProgress,
  completedChapters,
  totalChapters,
}: any) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        {/* Segmented Progress Bar */}
        <div className="flex flex-1 gap-1 h-1.5">
          {section.chapters.map((chapter: any) => {
            const isCompleted = sectionProgress?.chapters.find(
              (c: any) => c.chapterId === chapter.chapterId
            )?.completed;
            return (
              <div
                key={chapter.chapterId}
                className={cn(
                  "flex-1 rounded-full h-full transition-all duration-300",
                  isCompleted ? "bg-green-500" : "bg-muted-foreground/20"
                )}
              />
            );
          })}
        </div>
        {/* Trophy Icon if section complete */}
        <div className={cn("p-1 rounded-full transition-colors", completedChapters === totalChapters && totalChapters > 0 ? "bg-yellow-100" : "bg-transparent")}>
           <Trophy className={cn("h-3 w-3", completedChapters === totalChapters && totalChapters > 0 ? "text-yellow-600" : "text-muted-foreground/20")} />
        </div>
      </div>
      <p className="text-xs text-muted-foreground font-medium">
        {completedChapters}/{totalChapters} COMPLETED
      </p>
    </div>
  );
};

const ChaptersList = ({
  section,
  sectionProgress,
  chapterId,
  handleChapterClick,
  updateChapterProgress,
}: any) => {
  return (
    <ul className="flex flex-col">
      {section.chapters.map((chapter: any, index: number) => (
        <Chapter
          key={chapter.chapterId}
          chapter={chapter}
          index={index}
          sectionId={section.sectionId}
          sectionProgress={sectionProgress}
          chapterId={chapterId}
          handleChapterClick={handleChapterClick}
          updateChapterProgress={updateChapterProgress}
        />
      ))}
    </ul>
  );
};

const Chapter = ({
  chapter,
  index,
  sectionId,
  sectionProgress,
  chapterId,
  handleChapterClick,
  updateChapterProgress,
}: any) => {
  const chapterProgress = sectionProgress?.chapters.find(
    (c: any) => c.chapterId === chapter.chapterId
  );
  const isCompleted = chapterProgress?.completed;
  const isCurrentChapter = chapterId === chapter.chapterId;

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateChapterProgress(sectionId, chapter.chapterId, !isCompleted);
  };

  return (
    <li
      className={cn(
        "flex items-center gap-3 px-5 py-3 cursor-pointer transition-all border-l-4 border-transparent hover:bg-accent/50",
        isCurrentChapter && "bg-secondary border-primary"
      )}
      onClick={() => handleChapterClick(sectionId, chapter.chapterId)}
    >
      {/* Checkbox / Number */}
      <div
        className="flex-shrink-0 cursor-pointer hover:scale-110 transition-transform"
        onClick={handleToggleComplete}
        title="Toggle completion"
      >
        {isCompleted ? (
          <CheckCircle className="h-5 w-5 text-green-500 fill-green-500/10" />
        ) : (
          <div className={cn(
            "h-5 w-5 flex items-center justify-center rounded-full text-xs font-medium border",
            isCurrentChapter ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground"
          )}>
            {index + 1}
          </div>
        )}
      </div>

      {/* Title */}
      <span
        className={cn(
          "text-sm font-medium flex-1 line-clamp-2",
          isCompleted && "text-muted-foreground line-through decoration-border",
          isCurrentChapter && "text-primary font-semibold no-underline"
        )}
      >
        {chapter.title}
      </span>

      {/* Type Icon */}
      {chapter.type === "Text" ? (
        <FileText className="h-4 w-4 text-muted-foreground/50" />
      ) : (
        <PlayCircle className="h-4 w-4 text-muted-foreground/50" />
      )}
    </li>
  );
};

export default ChapterSidebar;