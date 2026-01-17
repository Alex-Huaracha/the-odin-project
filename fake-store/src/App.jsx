import './App.css';
import { Outlet } from 'react-router';
import { Navbar } from './components';
import { CartProvider } from './context/Cart.provider';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </CartProvider>
  );
}

export default App;
