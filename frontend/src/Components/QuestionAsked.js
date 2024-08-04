import React from 'react';
import "./styles.css";

export default function QuestionAsked({ message }) {
    return (
        <div className="questionAsked">
            <div className="messageBox">
                <p>{message}</p>
            </div>
        </div>
    );
}
