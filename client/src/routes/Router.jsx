import { Route, Routes } from "react-router-dom";
import Cart from "../pages/Cart";
import Navbar from "../pages/Navbar";
import Products from "../pages/Products";

function AllRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
