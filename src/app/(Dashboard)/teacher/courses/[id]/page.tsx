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
import { createCourseFormData,uploadAllVideos } from '@/lib/utils';
import {  setSections } from '@/state';
import { useGetCourseQuery } from '@/state/api';
import { useGetUploadVideoUrlMutation, useUpdateCourseMutation } from '@/state/apis/courseApi';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ImageIcon, Loader2, Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import ChapterModal from './ChapterModal';
import SectionModal from './SectionModal';
import SectionList from './SectionList';
import { toast } from 'sonner';
import NextImage from 'next/image'; 


function courseEditor() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter()
  // fetching current course
  const {data:course,isLoading,refetch} = useGetCourseQuery(id);
  // update course mutation
  const [updateCourse,{ isLoading: isUpdating }] = useUpdateCourseMutation();
  // videos updation hook
  const [getUploadVideoUrl] = useGetUploadVideoUrlMutation();

   // State to track video upload progress specifically ---
   const [isUploading, setIsUploading] = useState(false);

  // storing state in redux for sections 
  const dispatch = useAppDispatch()
  const {sections} = useAppSelector((state)=>state.global.courseEditor);
  // image preview state
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // useform+shadcnForm with zod validation
  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseTitle: "",
      courseDescription: "",
      courseCategory: "",
      coursePrice: "0",
      courseStatus: false,
      courseImage: undefined
    },
  });

  // update the course editor state and form
  useEffect(() => {
    if (course) {
      form.reset({
        courseTitle: course.title,
        courseDescription: course.description,
        courseCategory: course.category,
        coursePrice:course.price?.toString() ?? '',
        courseStatus: course.status === "Published",
      });
      // Set the preview for the existing image
      if (course.image) {
        setImagePreview(course.image);
      }
      // updating the state
      dispatch(setSections(course.sections || []));
    }
  }, [course, form,dispatch]); 

  const onSubmit = async (data: CourseFormData) => {
    // Start local loading state for uploads
    setIsUploading(true);

    try {
      // 1. Upload all videos first and get back sections with URLs
      // We pass the *original* sections from Redux (which have File objects)
      const updatedSections = await uploadAllVideos(
        sections,
        id,
        // signed url,video url hook
        getUploadVideoUrl
      );

      // 2. Create the FormData with the new video URLs and the form data
      const formData = createCourseFormData(data, updatedSections);

      // 3. Call the course update mutation
      await updateCourse({
        courseId: id,
        formData: formData,
      }).unwrap();

      // refetching after update
      refetch();
    } catch (error) {
      console.error('Failed to update course:', error);
    } finally {
      // Stop local loading state
      setIsUploading(false);
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
  
    // Combined loading state for the button
    const isSubmitLoading = isUploading || isUpdating;

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
                 <Button 
                    type="submit" 
                    disabled={isSubmitLoading} 
                    className="cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitLoading && (
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
                 {/* --- COURSE IMAGE FIELD --- */}
                 <FormField
                      control={form.control}
                      name="courseImage"
                      render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                          <FormLabel>Course Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              className="cursor-pointer"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onChange(file);
                                  setImagePreview(URL.createObjectURL(file));
                                }
                              }}
                              {...rest}
                            />
                          </FormControl>
                          <FormMessage />
                          {imagePreview && (
                            <div className="relative mt-4 w-full aspect-video rounded-md border overflow-hidden">
                              <NextImage
                                src={imagePreview}
                                alt="Course image preview"
                                fill
                                className="object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7"
                                onClick={() => {
                                  onChange(undefined);
                                  setImagePreview(null);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          {!imagePreview && (
                            <div className="mt-4 flex items-center justify-center w-full aspect-video rounded-md border border-dashed">
                              <div className="text-center text-muted-foreground">
                                <ImageIcon className="h-10 w-10 mx-auto" />
                                <p>No image selected</p>
                              </div>
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
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









