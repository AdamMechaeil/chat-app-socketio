import React from 'react'
import { Lists } from './Lists'

export const Recommendation = () => {
  return (
    <div style={{maxHeight:"45vh",overflowY:"scroll"}}>
          <div className='text-center'>
        <h2>Recommendation</h2>
        </div>
        <Lists/>
        </div>
  )
}
