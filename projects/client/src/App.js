// import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Navbar from "./Components/Navbar";
import UserRegister from "./Pages/UserRegister";
import Footer from "./Components/Footer";
import AdminLogin from "./Pages/AdminLogin";
import AdminLanding from "./Pages/AdminLanding";
import { useDispatch } from "react-redux";
import { API_URL } from "./helper";
import { loginActionAdmin } from "./Reducers/authAdmin";



function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const AdminKeepLogin = async () => {
    try {
      let token = localStorage.getItem('grocery_login');
      if (token) {
        let response = await axios.get(`${API_URL}/admin/keeplogin`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.setItem('grocery_login', response.data.token);
        dispatch(loginActionAdmin(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AdminKeepLogin()
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/register" element={<UserRegister/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/admin" element={<AdminLanding/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
