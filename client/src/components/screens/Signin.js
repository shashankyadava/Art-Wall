import React,{useState,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css"

const Signin = () => {
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const postData = () =>{
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      M.toast({html:"Invalid Email", classes:"red"})
      return;
    }
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html:data.error, classes:"red"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"Successfully Logged In", classes:"green"})
        navigate('/')
      }

    })
    .catch(err=>{
      console.log(err);
    })

  }

  return (
    <div>
      <div className="mycard">
        <div className="card auth-card">
          <h2>Art Wall</h2>
          <input 
            type="text" 
            placeholder="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)} 
          />
          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postData()}
          >
            Login
          </button>
          <Link to="/signup">
            <h6>Don't have an account?</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
