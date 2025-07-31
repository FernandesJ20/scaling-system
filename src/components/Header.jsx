
import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";


export function Header() {
  const { cart } = useContext(CartContext);
  return (
    <header className={styles.header1}>
      <Link to="/" className={styles.title}>julia</Link>
      <div className={styles.cart}>
        <Link to="/cart"><ShoppingBasket /></Link>
        { cart.length === 0 ? <h5></h5> : <p>{cart.length}</p>}
      </div>
    </header>
  );
}