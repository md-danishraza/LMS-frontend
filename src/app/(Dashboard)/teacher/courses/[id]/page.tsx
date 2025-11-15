'use client'

import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { CourseFormData, courseSchema } from '@/lib/schemas';
import { createCourseFormData, formatPrice } from '@/lib/utils';
import { openSectionModal, setSections } from '@/state';
import { useGetCourseQuery } from '@/state/api';
import { useUpdateCourseMutation } from '@/state/apis/courseApi';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import ChapterModal from './ChapterModal';
import SectionModal from './SectionModal';
import SectionList from './SectionList';
import { toast } from 'sonner';



function courseEditor() {
    const params = useParams();
  const id = params.id as string;
  const router = useRouter()
  // fetching current course
  const {data:course,isLoading,refetch} = useGetCourseQuery(id);
  // update course mutation
  const [updateCourse,{ isLoading: isUpdating }] = useUpdateCourseMutation();

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
  }, [course, form,dispatch]); 

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

      toast.success("course published successfully!!")
      
      refetch();
    } catch (error) {
      console.error("Failed to update course:", error);
      toast.error("error in publishing course!!")
    }
  };

  // sample select option
  const categories = [
    'Development',
    'Design',
    'Business',
    'Marketing',
    'Music',
    'IT & Software',
  ];

  if(isLoading) return <Loader/>
  

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
      {/* shadcn form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* --- Form Header / Right Element --- */}
          <Card>
            <CardHeader className="flex flex-wrap gap-2 flex-row items-center justify-between space-y-0">
              <CardTitle>Course Status & Actions</CardTitle>
              <div className="flex flex-wrap items-center space-x-4 gap-2">
                <FormField
                  control={form.control}
                  name="courseStatus"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 ">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-green-500 cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel
                        className={`text-sm font-medium ${
                          field.value ? 'text-green-500' : 'text-yellow-500'
                        }`}
                      >
                        {field.value ? 'Published' : 'Draft'}
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isUpdating} className='cursor-pointer'>
                  {isUpdating && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {form.watch('courseStatus')
                    ? 'Update Published Course'
                    : 'Save Draft'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* two column layout */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* --- Left Container for Form --- */}
            <div className="basis-1/2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* course title */}
                  <FormField
                    control={form.control}
                    name="courseTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 'The Complete Next.js Course'"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* course description */}
                  <FormField
                    control={form.control}
                    name="courseDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A short description of your course..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* course category - select option */}
                  <FormField
                    control={form.control}
                    name="courseCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* course price */}
                  <FormField
                    control={form.control}
                    name="coursePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                              ₹
                            </span>
                            <Input
                              type="number"
                              min="0"
                              placeholder="0"
                              className="pl-7"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            {/* --- Right Container for Sections --- */}
            <div className="basis-1/2">
                <SectionList />
            </div>
            
            
            
          </div>
        </form>
      </Form>

      {/* modals */}
      <ChapterModal/>
      <SectionModal/>
    </div>
  )

}

export default courseEditor









