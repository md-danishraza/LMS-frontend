'use client'; 

import AccordianSections from '@/components/AccordianSections';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';


type SelectedCourseProp = {
  course: Course;
  handleEnrollNow: (courseId: string) => void;
};

function SelectedCourse({ course, handleEnrollNow }: SelectedCourseProp) {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  // 1. Check User Role
  const userType = user?.publicMetadata?.userType as 'student' | 'teacher';
  const isTeacher = userType === 'teacher';

  // 2. Check Enrollment Status
  // We check if the current user's ID exists in the course's enrollment list
  const hasEnrolled = course?.enrollments?.some(
    (enrollment) => enrollment.userId === user?.id
  );

  // Logic to navigate to the course player (First chapter of first section)
  const handleGoToCourse = () => {
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
      // Fallback if course has no content yet
      router.push(`/user/courses/${course.courseId}`, { scroll: false });
    }
  };

  // Logic to render the correct button button
  const renderButton = () => {
    // Case 1: User is a Teacher
    if (isSignedIn && isTeacher) {
      return (
        <Button
          variant="secondary"
          className="cursor-pointer font-semibold"
          onClick={() => router.push('/teacher/courses')}
        >
          Go to Dashboard
        </Button>
      );
    }

    // Case 2: User is Student AND Already Enrolled
    if (isSignedIn && hasEnrolled) {
      return (
        <Button
          variant="outline"
          className="cursor-pointer font-semibold bg-white text-black hover:bg-gray-200 border-none"
          onClick={handleGoToCourse}
        >
          Go to Course
        </Button>
      );
    }

    // Case 3: Not Logged In OR Student Not Enrolled (Default)
    return (
      <Button
        variant="default"
        className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97] hover:shadow-md"
        onClick={() => handleEnrollNow(course.courseId)}
      >
        Enroll Now
      </Button>
    );
  };

  return (
    <div className="overflow-hidden p-2 sm:p-9">
      {/* title */}
      <div>
        <h3 className="text-white-50 font-primary text-wrap font-semibold text-3xl">
          {course.title}
        </h3>
        <p className="text-gray-400 text-sm pt-3">
          By {course.teacherName} |{' '}
          <span className="font-bold text-gray-500 dark:text-white">
            {course?.enrollments?.length || 0} enrolled
          </span>
        </p>
      </div>

      {/* content */}
      <div className="mt-5">
        <p className="text-gray-500 text-wrap mb-2">{course.description}</p>

        <div className="mt-5">
          <h4 className="font-semibold mb-2">Course contents</h4>
          <AccordianSections sections={course.sections} />
        </div>
      </div>

      {/* footer */}
      <div className="flex justify-between items-center mt-5">
        <span className="text-primary dark:text-foreground font-semibold text-shadow">
          {formatPrice(course.price)}
        </span>
        
        {/* Render the dynamic button based on logic */}
        {renderButton()}
      </div>
    </div>
  );
}

export default SelectedCourse;