import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import  styles  from "./user.module.css";


export function User() {
    const { session } = useContext(CartContext);

    return (
        <div className={styles.container}>
        { session ? <h1>Welcome, {session.user.email}!</h1> : <h1>Please log in.</h1> }
        { session ? <button onClick={() => handleSignOut()}>Sign Out</button> : <h2></h2> }
        { session ? <div>
            <p>User ID: {session.user.id}</p>
            <p>Email: {session.user.email}</p>
            <p>Created At: {new Date(session.user.created_at).toLocaleDateString()}</p>
        </div> : <h2></h2> }
        </div>
    );
}