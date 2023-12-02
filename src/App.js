import { useState } from 'react';
import './App.css'
import AllRoutes from "./Components/AllRoutes/AllRoutes";
import Navbar from "./Components/Navbar/Navbar";
import myContext from './Components/Context/Context';
import Backdrop from './Components/Backdrop/Backdrop';
import SideNav from './Components/SideNav/SideNav';


function App() {
  let user = JSON.parse(localStorage.getItem('user')) || {name:'', isLoggedIn:false}
  localStorage.setItem('user', JSON.stringify(user));

  const [userStatus, setUserStatus] = useState({
    ...user
  })
  const [isSidebarNavOpen, setIsSidebarNavOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [latestSearch, setLatestSearch] = useState('');

  return (
    <div className="App">
      <myContext.Provider value={{userStatus, setUserStatus, page, setPage, totalPage, setTotalPage, 
        latestSearch, setLatestSearch}}>
        <Navbar setIsSidebarNavOpen={setIsSidebarNavOpen}/>
        <SideNav isSidebarNavOpen={isSidebarNavOpen} setIsSidebarNavOpen={setIsSidebarNavOpen}/>
        {
          isSidebarNavOpen && <Backdrop setIsSidebarNavOpen={setIsSidebarNavOpen}/>
        }
        <AllRoutes />
      </myContext.Provider>
      
    </div>
  );
}

export default App;
