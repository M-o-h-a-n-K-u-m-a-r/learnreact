import { useNavigate } from 'react-router-dom';

function WelcomePage()
{
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <div className="welcome-page">
            <h1>Welcome to the App!</h1>
            {/*<p>This is a simple welcome page.</p>
            <p>Click the button below to get started!</p> */}
            <img src="/Pause GIF shared image.gif" alt="local gif" />
            <br /><br />
            {/* <button onClick={() => alert('Welcome!')}>
                Get Started
            </button> */}
            <button className='btnBack' onClick={(handleClick)}>
                Back
            </button>
        </div>
    );
}

export default WelcomePage;