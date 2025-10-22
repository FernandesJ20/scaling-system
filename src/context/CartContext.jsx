import { createContext, useState, useEffect } from "react";
import { supabase } from '../utils/supabase';

export const CartContext = createContext({
  products: [],
  cart: [],
  loading: false,
  error: null,
  addToCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  removeFromCart: () => {},
  uniqueProducts: [],
  addProduct: () => {}, 
  removeProduct: () => {},
  registeredEmails: null,
  addEmail: () => {},
  registeredPasswords: null,
  addPassword: () => {},
  registerUser: () => {}, 
  validateUser: () => {},
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
});

export function CartProvider({ children }) {
  var category = "mens-shirts";
  var limit = 12;
  var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;
  const [products, setProducts] = useState([]);
  var [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [registeredPasswords, setRegisteredPasswords] = useState([]);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from('product_2v').select();
      if (error) {
        setError(`Fetching products failed! ${error}`);
      } else {
        setProducts(data);
      };
      setLoading(false);
    }
    fetchProductsSupabase();

    // async function fetchProducts() {
    //   try {
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();

    //     setProducts(data.products);
    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  }, []);
  const [cart, setCart] = useState([]);

  const registerUser = (email, password) => {
    setRegisteredEmails(prev => [...prev, email]);
    setRegisteredPasswords(prev => [...prev, password]);
  };

  const validateUser = (email, password) => {
    const idx = registeredEmails.indexOf(email);
    return idx !== -1 && registeredPasswords[idx] === password;
  };
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const updateQty = (product, qty) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, qty } : item
      );
    });
  };
   const removeFromCart = (product) => {
    setCart((prevCart) => {
    const index = prevCart.findIndex((item) => item.id === product.id);
    if (index === -1) return prevCart;
    const newCart = [...prevCart];
    newCart.splice(index, 1);
    return newCart;
  });
};
const productMap = {};
  cart.forEach((product) => {
    if (productMap[product.id]) {
      productMap[product.id].qty += 1;
    } else {
      productMap[product.id] = { ...product, qty: 1 };
    }
  });

  const uniqueProducts = Object.values(productMap);

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  async function handleSignUp(email, password, username) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try { 
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            admin: false,
          },
          emailRedirectTo: `{window.location.origin}/signin`,
        }
      });
      if (error) throw error;

      if (data?.user) {
        setSessionMessage("Registration successful! Check your email for confirmation.");
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignIn(email, password) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        setSessionMessage("Sign in Successful!");
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignOut() {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
      setSessionMessage("Sign out successful!");
      window.location.href = "/";
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    } 
  }
  const context = {
    products: products,
    cart: cart,
    loading: loading,
    error: error,
    addToCart: addToCart,
    updateQty: updateQty,
    clearCart: clearCart,
    removeFromCart: removeFromCart,
    uniqueProducts: uniqueProducts,
    addProduct,
    removeProduct,
    registerUser,
    validateUser,
    registeredEmails: "",
    registeredPasswords: "",
    handleSignUp: handleSignUp,
    handleSignIn: handleSignIn,
    handleSignOut: handleSignOut,
    session: session,
    sessionLoading: sessionLoading,
    sessionMessage: sessionMessage,
    sessionError: sessionError,
  };

  return (
    <CartContext.Provider value={context}>
        {children}
    </CartContext.Provider>
  );
}