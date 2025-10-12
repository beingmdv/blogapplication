import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        setUsername(null);
        return;
      }
      response.json().then(userInfo => {
        setUsername(userInfo.username);
        
      })
    })
  }, []);
  const logout = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST', 
      credentials: 'include',
    });
    setUsername(null);
  }

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
