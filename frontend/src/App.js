// App.js
import React from "react";
import "./App.css";
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import PromptArea from "./Components/PromptArea";
import PromptTitleInput from "./Components/PromptTitleInput";
import SignUp from "./Components/SignUp";
import { ThemeProvider } from './Components/ThemeContext';

function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path=":user" element={<MainContainer />} >
                        <Route path="welcome" element={<Welcome/>}></Route>
                        <Route path="chat" element={<PromptTitleInput/>}></Route>
                        <Route path="chat/:titleId" element={<PromptArea />}></Route>
                    </Route>
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
