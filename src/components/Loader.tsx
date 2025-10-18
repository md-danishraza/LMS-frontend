import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
function Loader() {
  return (
    <Badge className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
        <Spinner />
        Syncing
      </Badge>
  )
}

export default Loader
