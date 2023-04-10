import logo from "./logo.svg";
import axios from "axios";
import { API_URL } from "./helper";
import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Navbar from "./Components/Navbar";
import ProductLanding from "./Pages/ProductLanding";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {message}
      </header> */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/product" element={<ProductLanding/>}/>
      </Routes>
    </div>
  );
}

export default App;
