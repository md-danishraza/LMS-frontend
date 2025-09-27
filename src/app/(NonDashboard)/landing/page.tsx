'use client'
import React from 'react'
import {motion} from "framer-motion"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useCarousel } from '@/hooks/useCarousel'
import { BookOpenCheck } from 'lucide-react';

function Landing() {
    const {currentImage} = useCarousel({totalImages:3});
    const tags = [
        'React',
        'Node.js',
        'TypeScript',
        'UI/UX Design',
        'GraphQL',
        'Tailwind CSS',
        'Next.js',
        'Redux Toolkit',
        'API Integration',
        'Product Architecture'
      ]
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
        <div className='basis-1/2 px-16 mx-auto'>
            <h1 className='text-4xl font-bold mb-4'>Courses</h1>
            <p className='text-lg text-gray-400 mb-8'>
                This is the list of courses that you can enroll in.
                <br />
                Courses when you need them and want them.
            </p>
            {/* CTA */}
            <div className='w-fit'>
                <Link href={`/search`} >
                    <Button variant={'default'} className='cursor-pointer text-white hover:bg px-4 py-2 rounded-md'>
                        <BookOpenCheck/>
                    Search for Courses
                    </Button>
                </Link>
            </div>
        </div>
        {/* image section */}
        <div className='basis-1/2 h-full relative overflow-hidden rounded-r-lg'>
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
<p className="text-muted-foreground mb-8 italic leading-relaxed max-w-2xl">
  Whether you're just starting out or leveling up your expertise, explore curated courses across industries — designed to guide your learning journey and unlock your full potential.
</p>

        {/* tags */}
        <div className='flex flex-wrap gap-4 mb-8'>
        {
            tags.map((tag,i)=>(
                <span key={i} className='px-3 py-1 bg-secondary hover:text-primary  rounded-full text-sm'>{tag}</span>
            ))
        }
        </div>
        {/* courses */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

        </div>
    </motion.div>
    </motion.div>
  )
}

export default Landing





