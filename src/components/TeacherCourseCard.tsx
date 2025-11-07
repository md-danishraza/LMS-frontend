import React from 'react'

type prop = {
    course:Course
    onEdit:(course: Course) => void
    onDelete:(course: Course) => Promise<void>
    // owner boolean 
    isOwner:Boolean
}
function TeacherCourseCard({course,onEdit,onDelete,isOwner}:prop) {
  return (
    <div>
      <h1>{course.title}</h1>
    </div>
  )
}

export default TeacherCourseCard
