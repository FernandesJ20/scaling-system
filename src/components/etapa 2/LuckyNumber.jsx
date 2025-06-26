import styles from './LuckyNumber.module.css';
import { useState } from 'react';

export function LuckyNumber() {
    const [luckyNumber, setLuckyNumber] = useState(0); 
    var [array, setArray] = useState(["0, "]);
    var [msg, setMsg] = useState("");
    function handleClick() {
        var result = Math.floor(Math.random() * 40) + 1;
        setLuckyNumber(result);
        if (array.includes((result + ", "))) {
            setMsg("Este número já foi sorteado!");
        } else {
            setMsg("");
            setArray(0 + ", ");
            array.push(result+ ", ");
            setArray(array);
        }
        
    }
    
    return <div className ={styles.container}>

            {luckyNumber === 0 ? (<h1>Lucky Number 🎲</h1>) : (<h1> Lucky Number: = {luckyNumber}</h1>)}
            
            <button className={styles.button} onClick={handleClick}>
                I'm Feeling Lucky Today!
            </button>
            <h1>{array}</h1>
            <h1>{msg}</h1>
        </div>
}