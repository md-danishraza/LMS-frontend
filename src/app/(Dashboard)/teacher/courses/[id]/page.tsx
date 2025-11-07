'use client'
import { useParams } from 'next/navigation';
import React from 'react'

function page() {
    const params = useParams();
  const id = params.id;

  return <div>Course ID: {id}</div>;

}

export default page
