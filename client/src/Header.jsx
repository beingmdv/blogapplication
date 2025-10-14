import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./Usercontext";
const API = "http://127.0.0.1:4000";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {


    fetch(`http://127.0.0.1:4000/profile`, 
      { credentials: "include" })
      .then(res => {


        if (!res.ok) throw new Error("not authenticated");
        return res.json();
      })
      .then(info => setUserInfo(info))
      .catch(() => setUserInfo(null));
  }, [setUserInfo]);

  const logout = async () => {
    try {
      await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (e) {


      console.error(e);
    } finally {


      setUserInfo(null);
    }
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">My blog</Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">createnewpost</Link>
            <a href="" onClick={ev => { ev.preventDefault(); logout(); }}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
