import "./styles.css";
import "./Sidebar.js"
import Sidebar from "./Sidebar.js";
import PromptArea from "./PromptArea.js";
import Welcome from "./Welcome.js";
import PromptTitleInput from "./PromptTitleInput.js";
import React from "react";
import { Outlet } from "react-router-dom";

export default function MainContainer() {
    return(
        <div className="main-container">
            <Sidebar/> 
            <Outlet/> {/* corresponding component is placed(Welcome, promptarea) in the place of outlet*/}
        </div>
    );
}