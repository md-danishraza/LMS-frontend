'use client'
import Loader from '@/components/Loader';
import { useGetCoursesQuery } from '@/state/api';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion";
import CourseCardSearch from '@/components/CourseCardSearch';
import SelectedCourse from './SelectedCourse';
function SearchPage() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id");
    const {data:courses,isLoading,isError} = useGetCoursesQuery({});
    const [selectedCourse,setSelectedCourse] = useState<Course|null>(null);
    const router = useRouter();

    // selecting first course if its not available in search query params
    useEffect(()=>{
        if(courses){
            if(id){
                const course = courses.find((c)=>c.courseId==id)
                setSelectedCourse(course || courses[0])
            }else{
                setSelectedCourse(courses[0])

            }
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    },[courses,id])

    // update the current selected course state
    function handleCourseSelect(course: Course): void {
        setSelectedCourse(course)
        router.push(`/search?id=${course.courseId}`,{scroll:false});
    }

    // handling enroll course click
    const handleEnroll= (courseId:string)=>{
        router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`)
    }

  if (isLoading) return <Loader/>
  if(isError || !courses) return <div className='text-center text-red-500'>Failed to Fetch Course!</div>
  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:.5}}
    className=' flex flex-col bg-background text-foreground h-full mx-auto w-4/5'
    >
        <h1 className='font-bold  font-primary text-3xl mt-8 '>List of available courses</h1>
        <h2 className='text-gray-500 mb-3 border-b-1 border-primary'>{courses.length} courses available</h2>

        <div className=' w-full flex flex-col-reverse md:flex-row pb-8 pt-2 gap-8'>

            {/* course grid */}
            <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 ,delay:.2}}
            className='basis-3/5 grid grid-cols-1 xl:grid-cols-2 gap-6 auto-rows-fr'
            >
                {
                    courses.map((course)=>{

                        return (
                            <CourseCardSearch key={course.courseId} course={course} onClick={()=>handleCourseSelect(course)}
                            // selected or not
                            isSelected={selectedCourse?.courseId === course.courseId}
                            />
                        )
                    })
                }
            </motion.div>

            {/* selected course card */}
            <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 ,delay:0.5}}
            className='basis-2/5 min-w-[300px] h-fit border-2 border-primary bg-secondary overflow-hidden rounded-lg'
            >
                {
                    selectedCourse && (
                        <SelectedCourse
                    course={selectedCourse}
                    handleEnrollNow={handleEnroll}
                        />
                    )
                }


            </motion.div>

        </div>
      
    </motion.div>
  )
}

export default SearchPage
