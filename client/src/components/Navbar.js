import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Navbar = () => {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const renderList = () =>{
        if(!state){
            return[
                <li key={1}><Link to="/signin" className="btn">Signin</Link></li>,
                <li key={2}><Link to="/signup" className="btn">Signup</Link></li>,
                
            ]
        }
        else{
            return [
                <li key={3}><Link to="/profile" className="btn">Profile</Link></li>,
                <li key={4}><Link to="/create" className="btn">Create Post</Link></li>,
                <li key={6}><Link to="/myfollowingpost" className="btn">My Follwing Post</Link></li>,
                <li key={5}>
                    <button className="btn red"
                        onClick={()=>{
                            localStorage.clear();
                            dispatch({type:"CLEAR"})
                            navigate('/signin')
                        }}
                    >
                        Logout
                    </button>
                </li>
                
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white" style={{color:"black"}}>
            <Link to={state?"/":"/signin"} className="brand-logo left">Art Wall</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}
                
            </ul>
            </div>
        </nav>
        
    );
}

export default Navbar