import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import "./styles.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import HistoryItem from "./HistoryItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
    const [userData, setUserData] = useState(null);
    const [lightTheme, setLightTheme] = useState(true);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    // Effect to check user authentication
    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                setUserData(parsedData.data); // Set only the data property
                console.log("userdat", parsedData.data);
            } catch (error) {
                console.error("Error parsing user data:", error);
                navigate("/");
            }
        } else {
            console.log("User not Authenticated");
            navigate("/");
        }
    }, [navigate]);


    // Function to fetch user history
    const fetchUserHistory = async () => {
        if (!userData) return; // Prevent fetching if userData is not available
        try {
            const response = await axios.get('http://localhost:8080/AMS/history', { 
                params: { userId: userData._id } 
            });
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching user history:', error);
        }
    };

    // Fetch user history when userData changes
    useEffect(() => {
        fetchUserHistory();
    }, [userData]); // Fetch history when userData is available

    return (
        <div className="sidebar-container">
            <div className={"sb-header" + (lightTheme ? "" : " dark")}>
                <div>
                    <IconButton onClick={() => navigate("./profile")}>
                        <AccountCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
                    </IconButton>
                </div>

                <div>
                    <IconButton onClick={() => navigate("./chat")}>
                        New Prompt&nbsp;&nbsp;
                        <AddCircleIcon />
                    </IconButton>

                    <IconButton onClick={() => setLightTheme((prev) => !prev)}>
                        {lightTheme ? <NightlightIcon /> : <LightModeIcon />}
                    </IconButton>
                </div>
            </div>

            <div className="sb-search">
                <IconButton>
                    <SearchIcon />
                </IconButton>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input placeholder="Search" className="sb-searchbox" />
            </div>

            <div className="sb-history">
                {history.map((item) => (
                    <HistoryItem historyItem={item} key={item.title} />
                ))}
            </div>
        </div>
    );
}
