import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

function CourseCardSearch({course,isSelected,onClick}:SearchCourseCardProps) {
  return (
    <div onClick={onClick}
    className={`bg-secondary group overflow-hidden rounded-lg shadow hover:shadow-primary  transition duration-200 flex flex-col cursor-pointer border-2 self-start  
        ${isSelected ? 'border-primary' : 'border-transparent'}`}
    >
      <div className=' relative pt-[56.25%]'>
        <Image
        src={course.image || "/placeholder.png"}
        alt={course.title}
        // take parent dimensions
        fill
         // painting area by responsive image
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        className=' object-cover transition-transform'
        priority
        />
      </div>
      <div className='p-4 flex flex-col justify-between flex-grow'>
        <div>
            <h2 className='font-semibold line-clamp-1'>{course.title}</h2>
            <p className=' text-sm mt-1 line-clamp-2'>{course.description}</p>
        </div>
        <div className='mt-2'>
            <p className='text-gray-500 text-sm'>{course.teacherName}</p>
            <div className=' flex justify-between items-center mt-1'>
                <span className='text-primary dark:text-foreground  font-semibold text'>
                    {formatPrice(course.price)}
                </span>
                <span className='text-gray-500 text-sm'>
                    {course.enrollments?.length} enrolled
                </span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCardSearch
