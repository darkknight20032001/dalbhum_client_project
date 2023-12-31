import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Components/UserAuth/SignIn";
import SignUp from "./Components/UserAuth/SignUp";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  const [checkAuth, setCheckAuth] = useState<boolean>(false);
  const [myUserId, setMyUserId] = useState<string>(``);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    function stateInit() {
      if (userId !== null) {
        setMyUserId(JSON.stringify(userId));
      }
    }
    stateInit();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              myUserId !== `` ? (
                <Navigate to="/userId/home" replace />
              ) : (
                <Navigate to="/userAuth" replace />
              )
            }
          />

          <Route
            path="/userAuth"
            element={
              checkAuth ? (
                <SignUp setCheckAuth={setCheckAuth} />
              ) : (
                <SignIn
                  setCheckAuth={setCheckAuth}
                  myUserId={myUserId}
                  setMyUserId={setMyUserId}
                />
              )
            }
          />

          <Route
            path={"/userId/home"}
            element={<HomePage setCheckAuth={setCheckAuth} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
