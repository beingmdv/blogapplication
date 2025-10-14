import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserContext } from   "./Usercontext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/profile', { credentials: 'include' })

    .then(response => {
    
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        
      })
    })
  }, []);
  const logout = async () => {
    await fetch('http://127.0.0.1:4000/logout', {
      method: 'POST', 
      credentials: 'include',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;


  return(
    <header>
      <Link to="/" className='logo'>My blog</Link>
      <nav>
        {username && ( 
          <>
            <Link to="/create">createnewpost</Link>
            <a onClick={logout} href="">Logout</a>
          </>
        )}
        {!username && ( 
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
