import React, { useContext } from 'react';
import "./styles.css";
import { ThemeContext } from './ThemeContext';

export default function QuestionAsked({ message }) {
    const { lightTheme } = useContext(ThemeContext);

    return (
        <div className={`questionAsked ${lightTheme ? '' : 'dark'}`}>
            <div className={`messageBox ${lightTheme ? '' : 'dark msgBox'}`}>
                <p>{message}</p>
            </div>
        </div>
    );
}
