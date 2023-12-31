import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/UserAuth/SignIn";
import SignUp from "./Components/UserAuth/SignUp";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  const [checkAuth, setCheckAuth] = useState<boolean>(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/userAuth"
            element={
              checkAuth ? (
                <SignUp setCheckAuth={setCheckAuth} />
              ) : (
                <SignIn setCheckAuth={setCheckAuth} />
              )
            }
          />
          <Route path="/userId/home" element={<HomePage setCheckAuth={setCheckAuth} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
