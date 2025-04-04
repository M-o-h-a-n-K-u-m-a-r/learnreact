import { useState } from 'react';

function ButtonCount()
{
  const [count, setCount] = useState(0);

  return (
    <div>
        <h3>You clicked the button {count} times</h3>
        <div class = "row">
            <div class = "col-6">
            <button class='buttonClk' onClick={() => setCount(count + 1)}>
                Click me
            </button>
            </div>
            <div class = "col-6">
                <button class='buttonReset' onClick={() => setCount(0)}>
                    Reset
                </button>
            </div>
        </div>
    </div>
  );
}

export default ButtonCount;