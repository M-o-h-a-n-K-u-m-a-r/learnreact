import './App.css';
import ButtonCount from './ButtonCount';

function Greetings(props)
{
  return <h1>Hello {props.name}</h1>;
}

function App() 
{
  return (
    <div>
        <Greetings name="Team" />
        <ButtonCount />
    </div>
  );
}

export default App;
