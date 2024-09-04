"use client"
import { createContext, useReducer } from "react";
import { API } from "../../utils/Util";
const initialState = {
  userId: "",
  token: "",
};



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
    <UserContext.Provider value={{ AuthData: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
