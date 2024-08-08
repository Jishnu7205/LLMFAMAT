// PromptArea.js
import React, { useState, useEffect, useContext } from 'react';
import { IconButton } from "@mui/material";
import "./styles.css";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import AnswerReceived from "./AnswerReceived";
import QuestionAsked from "./QuestionAsked";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { ThemeContext } from './ThemeContext';

export default function PromptArea() {
    const { lightTheme } = useContext(ThemeContext);
    const item = "CArbon";
    const { user, titleId } = useParams();
    const [conversation, setConversation] = useState([]); // Changed to hold conversation objects
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [title, setTitle] = useState('');

    // Fetch all conversations on component mount
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/AMS/${user}/chat/${titleId}`);
                const initialConversation = response.data.conversation || [];
                setTitle(response.data.title);
                setConversation(initialConversation);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversations();
    }, [user, titleId]); // Dependencies to re-fetch if user or titleId changes

    const handleSend = async () => {
        if (currentQuestion.trim() !== '') {
            const newQuestion = currentQuestion;
            setCurrentQuestion('');

            try {
                // Send the question to the server
                const response = await axios.post(`http://localhost:8080/AMS/${user}/chat/${titleId}`, {
                    question: newQuestion,
                    answer: '', // Send an empty answer as it will be populated by the server
                });

                // Assuming response.data contains the updated conversation
                const updatedConversation = response.data.conversation || [];

                // Update the state with the updated conversation
                setConversation(updatedConversation);
            } catch (error) {
                console.error('Error sending question:', error);
            }
        }
    };

    const navigate = useNavigate();
    return (
        <div className={`promptarea-container`}>
            <div className={`promptarea-title ${lightTheme ? '' : 'dark'}`}>
                <p className={`history-icon`}>{title[0]}</p>
                <div className={`title-text ${lightTheme ? '' : 'dark'}`}>
                    {title}
                </div>
                <IconButton onClick={() => { navigate("../welcome") }}>
                    <CloseIcon />
                </IconButton>
            </div>

            <div className={`promptarea-questions ${lightTheme ? '' : 'dark'}`}>
                {conversation.map((item, index) => (
                    <div key={index}>
                        <QuestionAsked message={item.question} />
                        <AnswerReceived message={item.answer} />
                    </div>
                ))}
            </div>

            <div className={`promptarea-input ${lightTheme ? '' : 'dark'}`}>
                <input
                    placeholder="Enter your question here . . . "
                    className={`promptarea-questionarea ${lightTheme ? '' : 'dark'}`}
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                />
                <IconButton onClick={handleSend}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
}
