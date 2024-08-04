import React from 'react';
import "./styles.css";
import logo from '../images/logoWithBg.png';

export default function AnswerReceived({ message }) {
    return (
        <div className="answerReceived">
            <p><img src={logo} alt="Logo" /></p>
            <div className="answerReceived-container">
                <p className="answerReceived-message">{message}</p>
            </div>
        </div>
    );
}
