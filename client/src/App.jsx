import './App.css';
import Header from './Header';
import Post from './Post';
import Layout from './Layout';
import { Routes, Route, Link } from "react-router-dom";
import Indexpage from './pages/IndexPage';
import Loginpage from './pages/Loginpage';
import Register from './pages/Register';
import { UserContextProvider } from './Usercontext';
import CreatePost from './pages/CreatePost';

function App() {
  return (
          <UserContextProvider>
      <Routes>
        <Route path='/' element = {<Layout/>}>
          <Route index element ={<Indexpage/>}/> 
          <Route path={'/login'} element= {<Loginpage/>} />
          <Route path={'/register'} element= {<Register/>} />
          <Route path={'/Create'} element= {<CreatePost/>} />
        </Route>      
      </Routes>
      </UserContextProvider >


    
  );
}

export default App;
