
import { Route, Routes, BrowserRouter } from "react-router-dom"
import './App.css';
import NavBar from './Component/NavBar';
import Home from './Component/Home';
import AddProduct from './Component/AddProduct';
import ViewProduct from './Component/ViewProduct';
import Category from "./Component/Category";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/viewproduct' element={<ViewProduct />} />
          <Route path="/addcategory" element={<Category />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
