import { useState } from 'react';
import './App.css'
import AllRoutes from "./Components/AllRoutes/AllRoutes";
import Navbar from "./Components/Navbar/Navbar";
import myContext from './Components/Context/Context';


function App() {
  let user = JSON.parse(localStorage.getItem('user')) || {name:'', isLoggedIn:false}
  localStorage.setItem('user', JSON.stringify(user));

  const [userStatus, setUserStatus] = useState({
    ...user
  })

  return (
    <div className="App">
      <myContext.Provider value={{userStatus, setUserStatus}}>
        <Navbar />
        <AllRoutes />
      </myContext.Provider>
      
    </div>
  );
}

export default App;
