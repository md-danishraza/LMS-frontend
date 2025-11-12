'use client'
import HeaderProfile from '@/components/HeaderProfile';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CourseFormData, courseSchema } from '@/lib/schemas';
import { createCourseFormData, formatPrice } from '@/lib/utils';
import { setSections } from '@/state';
import { useGetCourseQuery } from '@/state/api';
import { useUpdateCourseMutation } from '@/state/apis/courseApi';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';


function courseEditor() {
    const params = useParams();
  const id = params.id as string;
  const router = useRouter()
  // fetching current course
  const {data:course,isLoading,refetch} = useGetCourseQuery(id);
  // update course mutation
  const [updateCourse] = useUpdateCourseMutation();

  // storing state in redux for sections 
  const dispatch = useAppDispatch()
  const {sections} = useAppSelector((state)=>state.global.courseEditor);

  // useform+shadcnForm with zod validation
  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseTitle: "",
      courseDescription: "",
      courseCategory: "",
      coursePrice: "0",
      courseStatus: false,
    },
  });

  // update the course editor state and form
  useEffect(() => {
    if (course) {
      form.reset({
        courseTitle: course.title,
        courseDescription: course.description,
        courseCategory: course.category,
        coursePrice: formatPrice(course.price),
        courseStatus: course.status === "Published",
      });
      // updating the state
      dispatch(setSections(course.sections || []));
    }
  }, [course, form]); 

  const onSubmit = async (data: CourseFormData) => {
    try {
      // const updatedSections = await uploadAllVideos(
      //   sections,
      //   id,
      //   getUploadVideoUrl
      // );

      // // formdata with form + sections
      // const formData = createCourseFormData(data, updatedSections);

      // await updateCourse({
      //   courseId: id,
      //   formData,
      // }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };
  

  return (
    <div>
      {/* back to courses */}
      <div className="flex items-center gap-5 mb-5">
        <button
          className="flex items-center border border-customgreys-dirtyGrey rounded-lg p-2 gap-2 cursor-pointer hover:bg-customgreys-dirtyGrey hover:text-white-100 text-customgreys-dirtyGrey"
          onClick={() => router.push("/teacher/courses", { scroll: false })}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
      </div>

      {/* shadcn form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl"
        >
          {/* header with right element of save draft/published btn */}
          <HeaderProfile 
            title="Course Setup"
            subtitle="Complete all fields and save your course"
            
            // make this seperate component
            // will submit the form
            rightElement= {(
              <div className="flex items-center space-x-4">
                {/* <CustomFormField
                  name="courseStatus"
                  // published or draft
                  label={form.watch("courseStatus") ? "Published" : "Draft"}
                  type="switch"
                  className="flex items-center space-x-2"
                  labelClassName={`text-sm font-medium ${
                    form.watch("courseStatus")
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                  inputClassName="data-[state=checked]:bg-green-500"
                /> */}
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-600"
                >
                  {form.watch("courseStatus")
                    ? "Update Published Course"
                    : "Save Draft"}
                </Button>
              </div>
            )}
          />
        </form>
        
      </Form>

      {/* two column layout */}
      <div className="flex justify-between md:flex-row flex-col gap-10 mt-5 font-dm-sans">
          {/* left container for form */}
          <div className="basis-1/2">
            <div className="space-y-4">
              {/* inputs */}
              {/* course title */}
              {/* course description */}
              {/* course category - select option */}
              {/* course price */}
              
            </div>
          </div>
          {/* right container for sections */}
          <div className="basis-1/2">
            <div className='flex justify-between items-center mb-2'>

            </div>
          </div>
      </div>

    </div>
  )

}

export default courseEditor
