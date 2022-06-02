import React, { useState } from "react";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import { MainContext } from "./context/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharactersPage from "./components/CharactersPage/CharactersPage";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authentication } from "./firebase.config";
import SecondHeader from "./components/SecondHeader/SecondHeader";
import { Button } from "@mui/material";

const App = () => {
  const [character, setCharacter] = useState({});
  const [user, setUser] = useState({});
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const { user } = await signInWithPopup(authentication, provider);
    setUser(user);
  };
  if (user) {
    return (
      <MainContext.Provider value={{ character, setCharacter }}>
        <BrowserRouter>
          <div className="wrapper">
            <div className="Header">
              <Header user={user} setUser={setUser} />
            </div>
            <div className="wrapp">
              <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route
                  path="/Character/:title"
                  element={<CharactersPage />}
                ></Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </MainContext.Provider>
    );
  }
  return (
    <div>
      <div className="Header">
        <SecondHeader />
      </div>
      <div className="authButton">
        <Button
          variant="contained"
          onClick={signInWithFacebook}
          style={{ fontSize: "27px" }}
        >
          Sign in with FB
        </Button>
      </div>
    </div>
  );
};

export default App;
