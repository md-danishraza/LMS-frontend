import AccordianSections from '@/components/AccordianSections'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import React from 'react'
type SelectedCourseProp = {
    course:Course,
    handleEnrollNow:(courseId:string)=>void
}

function SelectedCourse({course,handleEnrollNow}:SelectedCourseProp) {
  return (
    <div className=' overflow-hidden p-9'>
        {/* title */}
      <div>
        <h3 className='text-white-50 font-primary font-semibold text-3xl'>{course.title}</h3>
        <p className='text-gray-400 text-sm pt-3'>
            By {course.teacherName} | {" "}
            <span className='font-bold text-gray-500 dark:text-white'>
                {course?.enrollments?.length} enrolled
            </span>
        </p>
      </div>

      {/* content */}
      <div className='mt-5'>
        <p className='text-gray-500 mb-2'>{course.description}</p>

        <div className='mt-5'>
            <h4 className='text-white-50/90 font-semibold mb-2'>Course contents</h4>
            <AccordianSections sections={course.sections}/>
        </div>
      </div>

      {/* footer */}
      <div className='flex justify-between items-center mt-5'>
        <span className='text-primary dark:text-foreground  font-semibold text-shadow'>
            {formatPrice(course.price)}
        </span>
        <Button
            variant="default"
            className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.03] active:scale-[0.97] hover:shadow-md"
            onClick={() => handleEnrollNow(course.courseId)}
            >
            Enroll Now
        </Button>


      </div>
    </div>
  )
}

export default SelectedCourse
