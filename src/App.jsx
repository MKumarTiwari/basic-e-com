import './App.css'
import SignUpForm from './components/signup/SignUpForm'
import LoginForm from './components/signin/LoginForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createContext } from 'react';
import useBooks from './hooks/useBooks';
import CartProduct from './components/pages/CartProduct';
import Cart from './components/store/Cart';
import Products from './components/store/Products';

export const BooksContext = createContext();

function App() {
  const { state, addToCart, increase, decrease, removeFromCart,placeOrder,toggleSelect } = useBooks();

  return (
    <>
      <BooksContext.Provider value={{ state, addToCart, increase, decrease, removeFromCart,placeOrder,toggleSelect }}>
        <div>
          <Router>
            <Routes>
              <Route Component={LoginForm} path='/' exact></Route>
              <Route Component={SignUpForm} path='/SignUpForm' exact></Route>
              <Route Component={Cart} path='/Cart' exact></Route>
              <Route Component={Products} path='/Products' exact></Route>
            </Routes>
          </Router>
        </div>
      </BooksContext.Provider>
    </>
  )
}

export default App
