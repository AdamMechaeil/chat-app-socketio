"use client";
import { createContext, useReducer } from "react";
import { API } from "../../utils/Util";

let initialState = {
  onlineStatus: "online",
};

async function getUsers(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });

    const response = await API.get("/user/getAllUsers");
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

async function receivedRequests(authData) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response = await API.get("/user/receivedRequests");
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

async function acceptRequest(authData, senderId) {
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response=await API.put(`/user/acceptFollowRequest/${senderId}`);
    return response?.status
  } catch (error) {
    console.log(error);
  }
}

async function sendRequest(authData,receiverId){
  try {
    API.interceptors.request.use((req) => {
      req.headers.authorization = `bearer ${authData.token}`;
      return req;
    });
    const response=await API.put(`/user/sendRequest/${receiverId}`);
    return response?.status
  } catch (error) {
    console.log(error);
  }
}

function reducer(state, action) {
  try {
    switch (action.type) {
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider
      value={{
        AuthData: state,
        dispatch,
        getUsers,
        receivedRequests,
        acceptRequest,
        sendRequest
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
