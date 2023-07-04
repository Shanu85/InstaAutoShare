import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ManageAccounts from "./components/ManageAccounts";
import PostContent from "./components/PostContent";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/manage' element={<ManageAccounts/>}/>
        <Route path='/postcontent' element={<PostContent/>}/>
      </Routes>
    </BrowserRouter>
    
  );  
}

export default App;
