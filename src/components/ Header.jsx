
import styles from "./Header.module.css";
import { ShoppingBasket, CircleUserRound, Package } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


export function Header() {
  const { cart } = useContext(CartContext);
  return (
    <header className={styles.header1}>
      <Link to="/" className={styles.title}>JF Store</Link>
      <div className={styles.cart}>
        <Link to="/cart"><ShoppingBasket /></Link>
        { cart.length === 0 ? <h5></h5> : <p>{cart.length}</p>}
        {useContext(CartContext).session != null ? <Link to="/user"><CircleUserRound /></Link> : <Link to="/login"><CircleUserRound /></Link>}
        <Link to="/stock"><Package /></Link>
      </div>
    </header>
  );
}