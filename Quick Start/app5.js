import { useState } from 'react';

// you’ll need components to share data and always update together.

// To make both MyButton components display the same count and update together, 
// you need to move the state from the individual buttons “upwards” 
// to the closest component containing all of them.

// In this example, it is MyApp:


/*
Now when you click either button, the count in MyApp will change, which will change both of the counts in MyButton. Here’s how you can express this in code.

First, move the state up from MyButton into MyApp:

*/
function MyButton({ count, onClick }) {
    
    return (
        <button onClick={onClick}>
            Clicked {count} times!
        </button>
    );
  }
  
  function App() {
    const [count, setCount] = useState(0);
  
    function handleClick() {
        setCount(count + 1);
    }
  
    return (
      <div>
        <h1>Counter that updates together</h1>
        <MyButton count={count} onClick={handleClick}/>
        <MyButton count={count} onClick={handleClick}/>
      </div>
    );
  }
  
  export default App;
  