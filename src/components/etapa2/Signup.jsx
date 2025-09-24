import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const { registerUser, registeredEmails } = useContext(CartContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (registeredEmails.includes(email)) {
            setSuccess("E-mail já cadastrado!");
            return;
        }
        registerUser(email, password);
        setSuccess("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/login"), 1500);
    }

    return (
        <div className={styles.SignupContainer}>
            <h1>Cadastro</h1>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
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
                <button type="submit">Cadastrar</button>
                {success && <p style={{color: success.includes("sucesso") ? "green" : "red"}}>{success}</p>}
            </form>
            <Link to="/login" className={styles.login}>Já tem uma conta?</Link>
        </div>
    );
}