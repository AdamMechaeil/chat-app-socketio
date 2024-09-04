import React from 'react'
import { ReceivedRequests } from './ReceivedRequests'
import { Recommendation } from './Recommendation'

export const Main = () => {
  return (
    <div style={{ backgroundColor: "#d5d5fe" }}>
      <div className='container p-5'>
        <ReceivedRequests />
        <Recommendation />
      </div>
    </div>
  )
}
