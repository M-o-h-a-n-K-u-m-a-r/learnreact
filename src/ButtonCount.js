import { useState } from 'react';

function ButtonCount()
{
  const [count, setCount] = useState(0);

  return (
    <div>
        <h3>You clicked the button {count} times</h3>
        <div className = "row">
            <div className = "col-6">
            <button className = 'buttonClk' onClick={() => setCount(count + 1)}>
                Click me
            </button>
            </div>
            <div className = "col-6">
                <button className ='buttonReset' onClick={() => setCount(0)}>
                    Reset
                </button>
            </div>
        </div>
    </div>
  );
}

export default ButtonCount;