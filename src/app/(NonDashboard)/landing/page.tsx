'use client'
import React from 'react'
import {motion} from "framer-motion"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useCarousel } from '@/hooks/useCarousel'
import { BookOpenCheck } from 'lucide-react';
import { useGetCoursesQuery } from '@/state/api'
import CourseCardSearch from '@/components/CourseCardSearch'
// app router
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

function Landing() {
  const {currentImage} = useCarousel({totalImages:3});
  const {data:courses,isLoading,error} = useGetCoursesQuery({});
  
  const router = useRouter();
  const handleCourseClick = (courseId:string)=>{
      router.push(`/search?id=${courseId}`,{
          scroll:false
      })
  }
  
  const tags = [
    'Development',
    'Design',
    'Business',
    'Marketing',
    'Music',
    'IT & Software',
    'Artificial Intelligence',
    'Data Science',
    'Computer Science'
  ]
    

  if (isLoading) return <LoadingSkeleton />;
  return (
    <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:.5}}
        className='w-3/4'
    >
        {/* hero section */}
      <motion.div
        initial={{y:20,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:.5}}
        className='flex justify-between items-center mt-12 h-[500px] rounded-lg bg-secondary'
    >
        {/* content section */}
        <div className="flex basis-full flex-col justify-center px-4 py-16 sm:px-16 md:basis-1/2">
          <h1 className="text-5xl font-primary font-bold tracking-tighter sm:text-6xl">
            Unlock Your Potential
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground md:text-xl">
            Explore our vast library of on-demand courses and connect with industry
            experts for exclusive <span className='italic '>1-on-1</span> mentorship. Your path to mastery starts here.
          </p>

          {/* --- CTA --- */}
          <div className="mt-10 flex w-fit gap-4">
            <Link href={`/search`}>
              <Button size="lg">
                <BookOpenCheck className="mr-2 h-5 w-5" />
                Explore Courses
              </Button>
            </Link>
            {/* You could add a secondary button here */}
            {/* <Button size="lg" variant="outline">Learn More</Button> */}
          </div>
        </div>
        {/* image section */}
        <div className='hidden sm:block basis-1/2 h-full relative overflow-hidden rounded-r-lg'>
        {
            ["/hero1.jpg","/hero2.jpg","/hero3.jpg"].map((src,i)=>(
                <Image
                    key={src}
                    src={src}
                    alt={`hero bannder index ${i}`}
                    // take parent dimension
                    fill
                    priority={i===currentImage}
                    // painting area by responsive image
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    // showing only current image
                    className={
                        `
                        object-cover transition-opacity duration-500
                        opacity-0
                        ${i===currentImage && 'opacity-100'}
                        `
                    }
                />
            ))
        }

        </div>
    </motion.div>

    {/* tags and courses */}
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="mx-auto py-12 mt-10"
      >
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">
        Featured Courses
        </h2>
        <p className="text-muted-foreground font-secondary mb-8 italic leading-relaxed max-w-2xl">
        Whether you're just starting out or leveling up your expertise, explore curated courses across industries — designed to guide your learning journey and unlock your full potential.
        </p>

        {/* tags */}
        <div className='flex flex-wrap gap-4 mb-8'>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-secondary hover:text-primary rounded-full text-sm cursor-pointer"
              onClick={() => {
                // FIX: Use encodeURIComponent to handle spaces and special chars like '&'
                router.push(`/search?category=${encodeURIComponent(tag)}`, {
                  scroll: false,
                });
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* courses */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
                courses &&
                courses.slice(0,4).map((course,i)=>{
                    return (
                        <motion.div
                        key={course.courseId}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        // list transition .2s * i
                        transition={{ duration: 0.5 ,delay:i*.2}}
                        viewport={{ amount: 0.3, once: true }}
                        className='mx-auto mt-10'
                        >
                    

                            <CourseCardSearch course={course} onClick={()=>handleCourseClick(course.courseId)}/>
                            

                        </motion.div>
                    )
                })
            }
        </div>
    </motion.div>
    </motion.div>
  )
}

export default Landing





const LoadingSkeleton = () => {
    return (
      <div className="w-3/4">
        <div className="flex justify-between items-center mt-12 h-[500px] rounded-lg bg-customgreys-secondarybg">
          <div className="basis-1/2 px-16 mx-auto">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-96 mb-2" />
            <Skeleton className="h-4 w-72 mb-8" />
            <Skeleton className="w-40 h-10" />
          </div>
          <Skeleton className="basis-1/2 h-full rounded-r-lg" />
        </div>
  
        <div className="mx-auto py-12 mt-10">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mb-8" />
  
          <div className="flex flex-wrap gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Skeleton key={index} className="w-24 h-6 rounded-full" />
            ))}
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <Skeleton key={index} className="h-[300px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  };