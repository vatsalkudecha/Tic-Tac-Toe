import { useState } from 'react';

// useState: the current state (count), and the function that lets you update it (setCount). 
// You can give them any names, but the convention is to write [something, setSomething].

function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <>
            <h1>Counters that update separately</h1>
            <button onclick={handleClick}>
                Clicked {count} times!
            </button>
        </>
    );
}