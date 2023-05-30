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
import { Flex } from "@chakra-ui/react";
import Sidebar from "./Components/Sidebar";
import UserManagement from "./Pages/UserManagement";
import ProductManagement from "./Pages/ProductManagement";
import Transaction from "./Pages/Transaction";
import Report from "./Pages/Report";
import ProductDetailUser from "./Pages/ProductDetail/ProductDetailUser";
import CategoryManagement from "./Pages/CategoryManagement";
import CartPage from "./Pages/CartPage/CartPage";
import DiscountManagement from "./Pages/DiscountManagement";
import CheckOutPage from "./Pages/CheckOut/CheckOutPage";
import TransactionDetail from "./Pages/TransactionDetail/TransactionDetail";
import OrderList from "./Pages/OrderList/OrderList";


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
        adminRoleId === 1 || adminRoleId === 2 ?
        (<div>
          <Navbar/>
          <Flex
            h={{base: null, sm: null, md:'100vh'}}
            flexDir={{base:'column', sm:'column', md:'row'}}
            overflow='hidden'
            maxW='100%'
          >
            <Sidebar/>
            <Routes>
              <Route path="/adminlogin" element={<AdminLogin/>}/>
              <Route path="/admin" element={<AdminLanding/>}/>
              {
                adminRoleId === 1 ? 
                <Route path="/usermanagement" element={<UserManagement/>}/>
                :
                <Route path="*" element={<PageNotFound/>}/>
              }
              {
                adminRoleId === 2 ? 
                (
                  <>
                    <Route path="/categorymanagement" element={<CategoryManagement/>} />
                    <Route path="/productmanagement" element={<ProductManagement/>}/>
                    <Route path="/discountmanagement" element={<DiscountManagement/>}/>
                    <Route path="/transaction" element={<Transaction/>}/>
                  </>
                ) 
                :
                <Route path="*" element={<PageNotFound/>}/>
              }
              <Route path="/report" element={<Report/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </Flex>
          <Footer/>
        </div>)
        : userRoleId === 3 ?
        (<div>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/register" element={<UserRegister/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/change" element={<ChangePassword/>}/>
              <Route path="/product" element={<ProductLanding/>} />
              <Route path="/detail/:id" element={<ProductDetailUser/>} />
              <Route path="/cart/me" element={<CartPage/>} />
              <Route path="/checkout" element={<CheckOutPage/>} />
              <Route path="/detail" element={<TransactionDetail />} />
              <Route path="/list" element={<OrderList />} />
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
            <Route path="/verification/:token" element={<Verification/>}/>
              <Route path="/forgetpassword" element={<ForgotPassword/>}/>
              <Route path="/reset/:token" element={<ResetPassword/>}/>
              <Route path="/product" element={<ProductLanding/>} />
              <Route path="/detail/:id" element={<ProductDetailUser/>} />
              <Route path="/cart/me" element={<CartPage/>} />
              <Route path="/checkout" element={<CheckOutPage/>} />
              <Route path="/detail" element={<TransactionDetail />} />
              <Route path="/list" element={<OrderList />} />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Footer/>
        </div>
      }
    </div>
  );
}

export default App;