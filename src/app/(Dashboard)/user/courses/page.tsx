'use client';

import Toolbar from '@/components/Toolbar';
import UserCourseCard from '@/components/UserCourseCard';
import { useGetUserEnrolledCoursesQuery } from '@/state/apis/courseApi';
import { useRouter } from 'next/navigation';
import HeaderProfile from '@/components/HeaderProfile';
import { useUser } from '@clerk/nextjs';
import { useState, useMemo } from 'react';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';


// Define the type for an enrolled course
type EnrolledCourse = Course & {
  overallProgress: number;
};

const StudentCoursesPage = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetUserEnrolledCoursesQuery(user?.id ?? '', {
    skip: !isLoaded || !user,
  });

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  const handleGoToCourse = (course: Course) => {
    // This finds the very first chapter of the first section to start.
    if (
      course.sections &&
      course.sections.length > 0 &&
      course.sections[0].chapters.length > 0
    ) {
      const firstChapter = course.sections[0].chapters[0];
      router.push(
        `/user/courses/${course.courseId}/chapters/${firstChapter.chapterId}`,
        { scroll: false }
      );
    } else {
      // Fallback if course has no chapters (shouldn't happen)
      router.push(`/user/courses/${course.courseId}`, {
        scroll: false,
      });
    }
  };

  if (!isLoaded || isLoading) return <Loader />;
  if (!user)
    return (
      <div className="text-4xl text-center text-destructive">
        Please sign in to view your courses.
      </div>
    );
  if (isError)
    return (
      <div className="text-4xl text-center text-destructive">
        Error loading your courses.
      </div>
    );

  // --- Main Content ---
  return (
    <div className="w-full h-full">
      <HeaderProfile
        title="My Courses"
        subtitle="Continue your learning journey."
      />
      <Toolbar
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      {/* --- Empty State --- */}
      {!isLoading && (!courses || filteredCourses.length === 0) && (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <BookOpen className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-semibold">No Courses Found</h2>
          <p className="mt-2 text-muted-foreground">
            {courses && courses.length > 0
              ? 'No courses match your filters.'
              : 'You are not enrolled in any courses yet.'}
          </p>
          <Button asChild className="mt-6">
            <Link href="/search">Browse Courses</Link>
          </Button>
        </div>
      )}

      {/* --- Course Grid --- */}
      {courses && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-6 w-full">
          {filteredCourses.map((course) => (
            <UserCourseCard
              key={course.courseId}
              course={course as EnrolledCourse} // Cast to EnrolledCourse
              onGoToCourse={handleGoToCourse}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;