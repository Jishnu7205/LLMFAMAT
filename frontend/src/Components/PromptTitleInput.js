import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function PromptTitleInput() {
    const {user} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState();

    const handleInputChange = (event) => {
        setTitle(event.target.value);
    }

    const handleButtonClick = async () => {
        try{
            const response = await axios.post(`http://localhost:8080/AMS/${user}/chat`, {title});
            
            if(response.status === 201){
                navigate(`./${response.data.promptId}`); // Adjust the route if necessary
            }
            else{
                console.error('Failed to send the request.');
            }
        }
        catch(err){
            console.error('Error:', err);
        }

    }

  return (
    <div className='prompt-title-input-container'>

        <div className='prompt-title-input-box'>
            <div className='prompt-title-input-box-header'>
                <p>Enter the title</p>
            </div>

            <div className='prompt-title-input-box-inputs'>
                <TextField id="standard-basic"  value={title} variant="standard" onChange={handleInputChange}/>
            </div>

            <div className='prompt-title-input-box-ok'>
                <Button onClick={handleButtonClick} variant="outlined">OK</Button>
            </div>
        </div>
    </div>
    
  )
}

export default PromptTitleInput;