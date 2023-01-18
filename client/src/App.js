import React,{ useEffect, createContext, useReducer, useContext } from "react";
import NavBar from './components/Navbar.js'
import { BrowserRouter,Route,Routes,useNavigate } from "react-router-dom";
import './App.css';
import Home from "./components/screens/Home.js";
import Signin from "./components/screens/Signin.js";
import Profile from "./components/screens/Profile.js";
import Signup from "./components/screens/Signup.js";
import CreatePost from "./components/screens/CreatePost.js"
import UserProfile from "./components/screens/UserProfile.js"
import SubscribesUserPosts from "./components/screens/SubscribesUserPosts.js"
import { reducer,initialState } from "./reducers/userReducer.js";

export const UserContext = createContext()

const Routing = () =>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    	const user = JSON.parse(localStorage.getItem("user"))
      if(user){
        dispatch({type:"USER",payload:user})
      }
      else navigate('/signin')
  },[])
  return(
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/create" element={<CreatePost />} />
        <Route exact path="profile/:userid" element={<UserProfile />} />
        <Route exact path="/myfollowingpost" element={<SubscribesUserPosts />} />
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
