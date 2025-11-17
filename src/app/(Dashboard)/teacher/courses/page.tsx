'use client'
import HeaderProfile from '@/components/HeaderProfile';
import Loader from '@/components/Loader';
import TeacherCourseCard from '@/components/TeacherCourseCard';
import Toolbar from '@/components/Toolbar';
import { Button } from '@/components/ui/button';
import {  useGetTeacherCoursesQuery } from '@/state/api';
import { useCreateCourseMutation, useDeleteCourseMutation } from '@/state/apis/courseApi';
import { useUser } from '@clerk/nextjs';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function TeacherCoursesPage() {
  const router = useRouter()
  const {user} = useUser();

  // get list of all courses
  const {
    data: courses, // This is now *only* the teacher's courses
    isLoading,
    isError,
  } = useGetTeacherCoursesQuery(undefined, {
    skip: !user, // Skip if user isn't loaded
  });

  // create and delete course mutation
  const [createCourse] = useCreateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  // filtered courses 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // caching filteredCourses to prevent it from re-execution bw re-render
  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    return courses.filter((course) => {
      // by search term
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
        // by category
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  // handle actions
  const handleEdit = (course: Course) => {
    router.push(`/teacher/courses/${course.courseId}`, { scroll: false });
  };

  const handleDelete = async (course: Course) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse({courseId:course.courseId}).unwrap();
    }
  };

  const handleCreateCourse = async () => {
    if (!user) return;

    const result = await createCourse({
      teacherId: user.id,
      teacherName: user.fullName || "Unknown Teacher",
    }).unwrap();
    // created course
    // 9c6a4a91-792c-42a9-900e-b32339852542
    router.push(`/teacher/courses/${result.courseId}`);
  };


  if (isLoading) {
    return <Loader />;
  }

  if (!user && !courses) {
    return (
      <h1 className="text-4xl text-center text-destructive">
        Error loading courses!!.
      </h1>
    );
  }
  return (
    <div className="w-full h-full">
      {/* header */}
      <HeaderProfile
        title="Courses"
        subtitle="Browse your courses"
        rightElement={
          <Button
            onClick={handleCreateCourse}
            variant="outline"
            className="cursor-pointer "
          >
            Create Course
          </Button>
        }
      />
      {/* filter bar */}
      <Toolbar
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-6 w-full">
        {filteredCourses.map((course) => (
          <TeacherCourseCard
            key={course.courseId}
            course={course}
            onEdit={handleEdit}
            onDelete={handleDelete}
            // owner boolean 
            // used to edit and delete
            isOwner={course.teacherId === user?.id}
          />
        ))}
      </div>
    </div>
  );

}