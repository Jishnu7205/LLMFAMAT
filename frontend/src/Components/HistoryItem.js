import { useNavigate } from "react-router-dom";
import "./styles.css"
import React from "react";

export default function HistoryItem({historyItem}) {
    const navigate = useNavigate();
    return(
        <div className="history-container" onClick={() => {navigate(`./chat/${historyItem._id}`)}}>
            <p className="history-icon">{historyItem.title[0]}</p>
            <p className="history-title">{historyItem.title}</p>
        </div>
    );

}