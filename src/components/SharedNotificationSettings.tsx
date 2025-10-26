import React from 'react'

function SharedNotificationSettings({
 title="Notification Settings",
 subtitle="Manage your notification settings"
}:{title?:string,subtitle?:string}) {
  return (
    <div>
      <h1 className='text-4xl font-primary font-semibold'>{title}</h1>
      <h2 className='mt-4 text-muted-foreground'>{subtitle}</h2>
    </div>
  )
}

export default SharedNotificationSettings
