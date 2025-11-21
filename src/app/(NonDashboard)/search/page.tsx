'use client'
import Loader from '@/components/Loader';
import { useGetCoursesQuery } from '@/state/api';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import {motion} from "framer-motion";
import CourseCardSearch from '@/components/CourseCardSearch';
import SelectedCourse from './SelectedCourse';
import { useUser } from '@clerk/nextjs';
import Toolbar from '@/components/Toolbar';
import HeaderProfile from '@/components/HeaderProfile';
function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams()
    // search inputs from params (clicked from landing page)
    const id = searchParams.get("id");
    const category = searchParams.get('category');

    const {data:courses,isLoading,isError} = useGetCoursesQuery({});
    const [selectedCourse,setSelectedCourse] = useState<Course|null>(null);

    // filter states
    const [searchTerm, setSearchTerm] = useState("");
    // Initialize with "all" if no category param exists
    const [selectedCategory, setSelectedCategory] = useState("all");


    // This ensures if the URL changes (e.g. from Landing Page), the filter updates
    useEffect(() => {
        if (category) {
        // decodeURIComponent handles '%20' (space) and '%26' (&) automatically
        setSelectedCategory(category);
        } else {
        setSelectedCategory("all");
        }
    }, [category]);
    
      // caching filteredCourses to prevent it from re-execution bw re-render
      const filteredCourses = useMemo(() => {
        if (!courses) return [];
    
        return courses.filter((course) => {
          const matchesSearch = course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          
          const matchesCategory =
            selectedCategory === "all" || course.category === selectedCategory;
    
          return matchesSearch && matchesCategory;
        });
      }, [courses, searchTerm, selectedCategory]);


      // 4. Handle Course Selection (from URL or Default)
        useEffect(() => {
            if (filteredCourses && filteredCourses.length > 0) {
            if (id) {
                const course = filteredCourses.find((c) => c.courseId === id);
                setSelectedCourse(course || filteredCourses[0]);
            } else {
                // If no ID in URL, select the first one from the FILTERED list
                setSelectedCourse(filteredCourses[0]);
            }
            } else {
                // Handle empty results
                setSelectedCourse(null);
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }, [filteredCourses, id]);


    // 5. Update URL when a course is clicked
    function handleCourseSelect(course: Course): void {
        setSelectedCourse(course);
        // Keep the category in the URL so refreshing keeps the filter
        const categoryQuery = selectedCategory !== 'all' ? `&category=${encodeURIComponent(selectedCategory)}` : '';
        router.push(`/search?id=${course.courseId}${categoryQuery}`, {
        scroll: false,
        });
    }

    const {isSignedIn} = useUser()

    // handling enroll course click
    const handleEnroll= (courseId:string)=>{
        if(isSignedIn){
            router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`)
        }else{
            router.push(`/checkout?step=1&id=${courseId}&showSignUp=true`)
        }
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
        {/* <h1 className='font-bold  font-primary text-3xl mt-8 '>List of available courses</h1>
        <h2 className='text-gray-500 mb-3 border-b-1 border-primary'>{courses.length} courses available</h2> */}
        <HeaderProfile  
        title='List of available courses' 
        subtitle={`${courses.length} courses available`} rightElement={
            <Toolbar
                onSearch={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                selectedCategory={selectedCategory}
            />}/>
            

        <div className=' w-full flex flex-col-reverse md:flex-row pb-8 pt-2 gap-8  mt-3 border-t-1 border-primary'>
            {
                !filteredCourses.length ? <h1 className='text-2xl text-destructive  w-full'>
                    No Course Found
                </h1> :
                <>
                {/* course grid */}
            <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 ,delay:.2}}
            className='basis-3/5 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr'
            >
                {
                    filteredCourses.map((course)=>{

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
            className='basis-2/5 min-w-[250px] h-fit border-2 border-primary bg-secondary overflow-hidden rounded-lg'
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
                </>

                
            }
        </div>
      
    </motion.div>
  )
}

export default SearchPage
