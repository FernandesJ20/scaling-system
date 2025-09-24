import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { validateUser } = useContext(CartContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (validateUser(email, password)) {
            setError("");
            navigate("/");
        } else {
            setError("E-mail ou senha inválidos!");
        }
    }

    return (
        <div className={styles.LoginContainer}>
            <h1>Pagina de Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <label htmlFor="email">E-Mail:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    className={styles.input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className={styles.input}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form>
            <Link to="/signup" className={styles.signup}>Não tem uma conta?</Link>
        </div>
    );
}