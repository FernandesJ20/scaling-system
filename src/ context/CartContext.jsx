import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext({
  products: [],
  cart: [],
  loading: false,
  error: null,
  addToCart: () => {},
  removeFromCart: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
  uniqueProducts: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateProduct: () => {},
  removeProductFromDB: () => {},
});

export function CartProvider({ children }) {
  const { session } = useContext(SessionContext);

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let mounted = true;

  useEffect(() => {
    async function fetchProductsSupabase() {
      try {
        const { data, error: fetchError } = await supabase.from("product_2v").select("*");
        if (!mounted) return;
        if (fetchError) {
          setError(fetchError.message || JSON.stringify(fetchError));
          setProducts([]);
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        if (mounted) setError(String(err));
        if (mounted) setProducts([]);
      }
    }

    async function fetchCartSupabase() {
      if (!session?.user?.id) {
        if (mounted) setCart([]);
        setLoading(false);
        return;
      }
      try {
        const { data, error: cartError } = await supabase
          .from("cart")
          .select("*")
          .eq("customer_id", session.user.id)
          .order("added_at", { ascending: false });

        if (!mounted) return;

        if (cartError) {
          setError(cartError.message || JSON.stringify(cartError));
          setCart([]);
        } else {
          setCart(data || []);
        }
      } catch (err) {
        if (mounted) setError(String(err));
        if (mounted) setCart([]);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    fetchProductsSupabase();
    fetchCartSupabase();

    return () => {
      mounted = false;
    };
  }, [session]);

  // Adiciona 1 unidade ao carrinho
  const addToCart = async (product) => {
    const productId = product.id;
    const existing = cart.find((item) => (item.product_id ?? item.id) === productId);

    if (existing) {
      // aumenta quantidade localmente
      setCart((prev) =>
        prev.map((item) =>
          (item.product_id ?? item.id) === productId
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    if (!session?.user?.id) return setError("Entre em sua conta para modificar o carrinho");

    try {
      const { data: existingDB } = await supabase
        .from("cart")
        .select("*")
        .eq("customer_id", session.user.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (existingDB) {
        await supabase
          .from("cart")
          .update({ quantity: existingDB.quantity + 1, added_at: new Date().toISOString() })
          .eq("customer_id", session.user.id)
          .eq("product_id", productId);
      } else {
        await supabase.from("cart").insert({
          customer_id: session.user.id,
          product_id: productId,
          quantity: 1,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          description: product.description,
          added_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("addToCart exception:", err);
      setError(String(err));
    }
  };

  // Diminui 1 unidade ou remove do carrinho
  const removeFromCart = async (product) => {
    const productId = product.product_id ?? product.id;
    const match = cart.find((item) => (item.product_id ?? item.id) === productId);
    if (!match) return;

    const currentQty = match.quantity ?? 1;

    if (currentQty > 1) {
      setCart((prev) =>
        prev.map((item) =>
          (item.product_id ?? item.id) === productId ? { ...item, quantity: currentQty - 1 } : item
        )
      );

      if (session?.user?.id) {
        await supabase
          .from("cart")
          .update({ quantity: currentQty - 1, added_at: new Date().toISOString() })
          .eq("customer_id", session.user.id)
          .eq("product_id", productId);
      }
    } else {
      // remove completamente
      setCart((prev) => prev.filter((item) => (item.product_id ?? item.id) !== productId));

      if (session?.user?.id) {
        await supabase
          .from("cart")
          .delete()
          .eq("customer_id", session.user.id)
          .eq("product_id", productId);
      }
    }
  };

  // Remove completamente do carrinho
  const removeProductFromCart = async (product) => {
    const productId = product.product_id ?? product.id;
    setCart((prev) => prev.filter((item) => (item.product_id ?? item.id) !== productId));

    if (!session?.user?.id) return;
    try {
      await supabase.from("cart").delete().eq("customer_id", session.user.id).eq("product_id", productId);
    } catch (err) {
      console.error("removeProductFromCart exception:", err);
      setError(String(err));
    }
  };

  // Limpa um produto do carrinho
  const clearCart = async (product) => {
    const productId = product.id;
    setCart((prev) => prev.filter((item) => item.id !== productId));
    if (!session?.user?.id) return;
    try {
      await supabase.from("cart").delete().eq("customer_id", session.user.id).eq("product_id", productId);
    } catch (err) {
      console.error("clearCart exception:", err);
      setError(String(err));
    }
  };

  // Cria lista única com quantidade
  const productMap = {};
  cart.forEach((product) => {
    const idKey = product.product_id ?? product.id;
    if (productMap[idKey]) {
      productMap[idKey].qty += product.quantity ?? 1;
    } else {
      productMap[idKey] = { ...product, qty: product.quantity ?? 1, id: idKey };
    }
  });
  const uniqueProducts = Object.values(productMap);

  // Produtos
  const addProduct = (product) => setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
  const removeProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const updateProduct = async (updated) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
    try {
      await supabase.from("product_2v").update({ ...updated, updated_at: new Date().toISOString() }).eq("id", updated.id);
    } catch (err) {
      console.error("updateProduct exception:", err);
      setError(String(err));
    }
  };

  const removeProductFromDB = async (id) => {
    try {
      const { error } = await supabase.from("product_2v").delete().eq("id", id);
      if (!error) removeProduct(id);
    } catch (err) {
      console.error("Erro ao remover produto do DB:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        removeProductFromCart,
        clearCart,
        uniqueProducts,
        addProduct,
        removeProduct,
        updateProduct,
        removeProductFromDB,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}