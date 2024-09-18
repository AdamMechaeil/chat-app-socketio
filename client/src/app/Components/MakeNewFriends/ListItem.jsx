import { AuthContext } from '@/app/Context/AuthContext';
import { UserContext } from '@/app/Context/UserContext';
import React, { useContext } from 'react'

export const ListItem = ({ item, getSuggestions, receivedHandler }) => {
  const { AuthData } = useContext(AuthContext);
  const { sendRequest, acceptRequest } = useContext(UserContext);
  async function handleSubmitSendRequest(id) {
    try {
      const status = await sendRequest(AuthData, id);
      if (status == 200) {
        getSuggestions()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitAcceptRequest(id) {
    try {
      const status = await acceptRequest(AuthData, id);
      if (status == 200) {
        receivedHandler()
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='d-flex justify-content-between p-2 bg-transparent my-2'>
      <div>{item.profilePicture
        ?
        <img src={item.profilePicture} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
        :
        <img src='https://heatherchristenaschmidt.com/wp-content/uploads/2011/09/facebook_no_profile_pic2-jpg.gif' style={{ width: "100px", height: "100px", borderRadius: "50%" }} />}</div>
      <div className='row'>
        <div className='col-3'>
          <p>{item.username}</p>
          <p>{item.name}</p>
        </div>
      </div>
      <div>
        {
          getSuggestions ? <button className='btn btn-primary' onClick={() => {
            handleSubmitSendRequest(item._id)
          }} >+Add Friend</button> : <button className='btn btn-primary' onClick={() => {
            handleSubmitAcceptRequest(item._id)
          }} >+Add Friend</button>
        }
      </div>
    </div>
  )
}
