import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
function Loader() {
  return (
    <Badge>
        <Spinner />
        Syncing
      </Badge>
  )
}

export default Loader
