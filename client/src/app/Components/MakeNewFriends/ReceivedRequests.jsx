import React from 'react'
import { Lists } from './Lists'

export const ReceivedRequests = () => {
    return (
        <div className='mb-5' style={{ maxHeight: "45vh", overflowY: "scroll" }}>
            <div className='text-center'>
                <h2>ReceivedRequests</h2>
            </div>
            <Lists />
        </div>
    )
}
