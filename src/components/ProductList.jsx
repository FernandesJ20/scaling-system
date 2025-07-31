import styles from "./ProductList.module.css";
import { Product } from "./Product.jsx";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function ProductList() {
  const { products, loading, error } = useContext(CartContext);
  

  return (
    <div className={styles.container}>
       <div className= {styles.main}>
       {products.map((product) => (
      <Product key={product.id} product={product}/>
        
        ))}
        </div>
         {loading && (
        <div>
          <CircularProgress
            // size="sm"
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{
              color: "#001111",
            }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error.message}</p>}
    </div>
  );
}