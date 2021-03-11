import React from 'react';
import { useParams ,useLocation, useHistory} from 'react-router-dom';

const User=()=>
{
  const {fname,lname}=useParams();
  const location =useLocation();
  const history=useHistory();
  return(
      <>
      <h1>user {fname}{lname}</h1>
      <p> my location is{location.pathname}</p>
      {/* {location.pathname=="/user/chandani/khanesha"? <button onClick={()=>alert("wow you are find me")}>click me</button>:null}
      */}
      {<button onClick={()=>history.push("/")}>homepage</button>}
      {/* //push used to go specific page and goback use for go to previous page */}
      </>
  );
}

export default User;