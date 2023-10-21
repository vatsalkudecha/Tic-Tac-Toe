import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



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
