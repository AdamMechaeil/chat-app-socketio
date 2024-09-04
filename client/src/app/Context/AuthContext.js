"use client"
import { createContext, useReducer } from "react";
import { axios } from "../../utils/Util";
const initialState = {
  userId: "",
  token: "",
};

async function signin(body) {
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/signin",
      body
    );
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
}

async function signup(body) {
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/signup",
      body
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

function reducer(state, action) {
  try {
    switch (action.type) {
      case "SIGN_UP":
        const signupState={...action.payload};
        localStorage.setItem("authData5000Weekdays",JSON.stringify(signupState))
        return signupState;
        case "SIGN_IN":
        const signinState={...action.payload};
        localStorage.setItem("authData5000Weekdays",JSON.stringify(signinState))
        return signinState;
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ AuthData: state, dispatch, signin, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
