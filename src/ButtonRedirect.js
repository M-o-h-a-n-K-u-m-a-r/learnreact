import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function ButtonRedirect()
{
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/WelcomePage');
    };
    
    return (
        <button className='btnGoTo' onClick={handleClick}>
            Go to the page
        </button>
    );
}

export default ButtonRedirect;