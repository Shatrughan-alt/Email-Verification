// import './App.css';
import {
  BrowserRouter,
  Routes, Route,
  Navigate
} from "react-router-dom"
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import EmailVerify from "./Components/EmailVerify";

function App() {
  const user=localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          {user&&<Route path="/" exact element ={<Home/>}/>}
          <Route path='/signup' exact element={<Register />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/' exact element={<Navigate replace to="/login"/>} />
          <Route path='/users/:id/verify/:token' exact element={<EmailVerify />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;