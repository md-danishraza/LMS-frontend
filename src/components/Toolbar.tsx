import React, { Dispatch, SetStateAction } from 'react'
type prop = {
    onSearch:Dispatch<SetStateAction<string>>,
    onCategoryChange:Dispatch<SetStateAction<string>>
}
function Toolbar({onSearch,onCategoryChange}:prop) {
  return (
    <div>
      Toolbar
    </div>
  )
}

export default Toolbar
