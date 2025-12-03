import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function Cart() {
  const { uniqueProducts, addToCart, removeFromCart, removeProductFromCart } = useContext(CartContext);

  // Calcula o total do carrinho
  const total = uniqueProducts
    .reduce((acc, product) => acc + product.price * product.qty, 0)
    .toFixed(2);

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Shopping Cart</h2>

      {uniqueProducts.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {uniqueProducts.map((product) => (
              <li key={product.id}>
                <div className={styles.cartItem}>
                  <img src={product.thumbnail} alt={product.title} />
                  <h3>{product.title}</h3>

                  {/* Botão diminuir */}
                  <button onClick={() => removeFromCart(product)}>-</button>

                  {/* Quantidade */}
                  <p>{product.qty}</p>

                  {/* Botão adicionar */}
                  <button onClick={() => addToCart(product)}>+</button>

                  {/* Subtotal do item */}
                  <p>${(product.price * product.qty).toFixed(2)}</p>

                  {/* Remover item completamente */}
                  <button onClick={() => removeProductFromCart(product)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          {/* Resumo do carrinho */}
          <div className={styles.checkout}>
            <h1>Resumo:</h1>
            <ul>
              {uniqueProducts.map((product) => (
                <li key={product.id} style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                  <strong>{product.title}</strong> — {product.qty}x — $
                  {(product.price * product.qty).toFixed(2)}
                </li>
              ))}
            </ul>

            <h3>Total: ${total}</h3>
            <button>Continuar</button>
          </div>
        </>
      )}
    </div>
  );
}