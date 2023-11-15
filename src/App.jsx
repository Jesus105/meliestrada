import { React } from 'react';
import { Header } from "./components/header/Header";
import { ProductsList } from "./components/products/Products";
import './index.css'
import 'boxicons';
import { DataProvider } from "./context/DataProvider";
import {Cart} from './components/cart/Cart'
import { MakeOrder } from './components/order/MakeOrder';
import { CheckOrder } from './components/order/CheckOrder';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Cart />
        <Header/>
        <ProductsList/>
        <MakeOrder/>
        <CheckOrder/>
      </div>
    </DataProvider>
  );
}

export default App;
