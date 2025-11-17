import React from 'react'

type propTypes = {title:string,subtitle:string,rightElement?:React.ReactNode}

function HeaderProfile({title,subtitle,rightElement}:propTypes) {
  return (
    <div className='mt-4 mb-7 gap-4 flex-col md:flex-row flex justify-between items-center;'>
        <div>
            <h1 className='text-4xl font-primary font-bold text-foreground'>{title}</h1>
            <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>
        </div>
        {rightElement && <div>{rightElement}</div>}
    </div>
  )
}

export default HeaderProfile
