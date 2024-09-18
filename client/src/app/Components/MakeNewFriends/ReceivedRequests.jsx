import React, { useContext, useEffect, useState } from 'react'
import { Lists } from './Lists'
import { AuthContext } from '@/app/Context/AuthContext';
import { UserContext } from '@/app/Context/UserContext';

export const ReceivedRequests = () => {
    const [receivedRequeststate, setReceivedRequests] = useState([])
    const { AuthData } = useContext(AuthContext);
    const { receivedRequests } = useContext(UserContext);

    useEffect(()=>{
        receivedHandler()
    },[])

    async function receivedHandler(){
        try {
            const data=await receivedRequests(AuthData);
            setReceivedRequests(data?.received)
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className='mb-5' style={{ maxHeight: "45vh", overflowY: "scroll" }}>
            <div className='text-center'>
                <h2>ReceivedRequests</h2>
            </div>
            <Lists receivedHandler={receivedHandler} items={receivedRequeststate} />
        </div>
    )
}
