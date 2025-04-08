import './App.css';
import ButtonCount from './ButtonCount';
import ButtonRedirect from './ButtonRedirect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';

function Greetings(props)
{
  return <h1>Hello {props.name}</h1>;
}

function App() 
{
  return (
    <div>
        <BrowserRouter>
          <Greetings name="Team" />
          <ButtonCount />
          <ButtonRedirect />

          <Routes>
            <Route path="/WelcomePage" element={<WelcomePage />} />
          </Routes>
        </BrowserRouter>
       
    </div>
  );
}

export default App;
