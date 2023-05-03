// import logo from "./logo.svg";
import axios from "axios";
import { API_URL } from "./helper";
import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Navbar from "./Components/Navbar";
import UserRegister from "./Pages/UserRegister";
import Footer from "./Components/Footer";
import AdminLogin from "./Pages/AdminLogin";
import AdminLanding from "./Pages/AdminLanding";
import { useDispatch, useSelector } from "react-redux";
import { loginActionAdmin } from "./Reducers/authAdmin";
import Login from "./Pages/Login";
import { loginActionUser } from "./Reducers/authUser";
import PageNotFound from "./Pages/PageNotFound";
import Verification from "./Pages/Verification";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import ChangePassword from "./Pages/ChangePassword";
import ProductLanding from "./Pages/ProductLanding";
import CategoryManagement from "./Pages/CategoryManagement";

function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const adminRoleId = useSelector((state) => state.authAdminReducer.roleId);
  const userRoleId = useSelector((state) => state.authUserReducer.roleId);
  const roleId = adminRoleId || userRoleId

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

  const UserKeepLogin = async () => {
    try {
      let token = localStorage.getItem('grocery_login');
      if (token) {
        let response = await axios.get(`${API_URL}/user/keeplogin`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log("response dari localstorage :", response.data);
        localStorage.setItem('grocery_login', response.data.token);
        dispatch(loginActionUser(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AdminKeepLogin()
  }, []);

  useEffect(() => {
    UserKeepLogin()
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
      {
        roleId == 1 || roleId == 2 ? 
        (<div>
          <Navbar/>
          <Routes>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/admin" element={<AdminLanding/>}/>
          <Route path="/categorymanagement" element={<CategoryManagement/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Footer/>
        </div>)
        : roleId == 3 ?
        (<div>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/register" element={<UserRegister/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/change" element={<ChangePassword/>}/>
              <Route path="/product" element={<ProductLanding/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
            <Footer/>
          </div>)
        :
        <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/register" element={<UserRegister/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/verification/:token"  element={<Verification/>}/>
            <Route path="/forgetpassword" element={<ForgotPassword/>}/>
            <Route path="/reset/:token" element={<ResetPassword/>}/>
            <Route path="/product" element={<ProductLanding/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Footer/>
        </div>
      }
    </div>
  );
}

export default App;
