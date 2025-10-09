import "./styles/theme.css";
import "./styles/global.css";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router";
import { CartProvider } from "./context/CartContext";
import { Cart } from "./components/etapa2/Cart";
import { ProductList } from "./components/etapa2/ProductList";
import { Login } from "./components/etapa2/Login";
import { Signup } from "./components/etapa2/Signup";
import { Estoque } from "./components/etapa2/Estoque";
import { ToastContainer } from 'react-toastify';
import { User } from "./components/etapa2/user";

export default function App() {
  return (

    <>
    <ToastContainer />
    <CartProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/stock" element={<Estoque/>} />
        <Route path="/user" element={<User/>} />
      </Routes>
    </CartProvider>
    </>
  );
  }
  
