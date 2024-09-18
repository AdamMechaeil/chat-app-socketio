import React, { useContext, useEffect, useState } from 'react'
import { Lists } from './Lists'
import { AuthContext } from '@/app/Context/AuthContext';
import { UserContext } from '@/app/Context/UserContext';

export const Recommendation = () => {
  const [suggestions, setSuggestions] = useState([])

  const { AuthData } = useContext(AuthContext);
  const { getUsers } = useContext(UserContext);

  useEffect(() => {
    getSuggestions()
  }, [])

  async function getSuggestions() {
    try {
      const users = await getUsers(AuthData);
      setSuggestions(users.users)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ maxHeight: "50vh", overflowY: "scroll" }}>
      <div className='text-center'>
        <h2>Recommendation</h2>
      </div>
      <Lists getSuggestions={getSuggestions} items={suggestions} />
    </div>
  )
}
