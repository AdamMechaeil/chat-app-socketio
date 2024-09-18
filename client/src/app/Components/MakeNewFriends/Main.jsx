import React, { useState } from 'react'
import { ReceivedRequests } from './ReceivedRequests'
import { Recommendation } from './Recommendation'

export const Main = () => {
  return (
    <div style={{ backgroundColor: "#d5d5fe",height:"100vh" }}>
      <div className='container p-5'>
        <ReceivedRequests />
        <Recommendation />
      </div>
    </div>
  )
}
