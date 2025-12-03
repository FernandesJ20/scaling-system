import styles from './LuckyNumber.module.css';
import { useState } from 'react';

export function LuckyNumber() {
    const [luckyNumber, setLuckyNumber] = useState(0); 
    var [array, setArray] = useState(["0, "]);
    function handleClick() {
        var result = Math.floor(Math.random() * 40) + 1;
        setLuckyNumber(result);
        if (array.includes((result + ", "))) {
            alert("esse número já foi sorteado, tente novamente!");
        } else {
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
        </div>
}