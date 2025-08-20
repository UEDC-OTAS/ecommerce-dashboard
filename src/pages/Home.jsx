import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Inventory from "../components/inventory/Inventory";
import AddProduct from "../components/inventory/AddProduct";
import GetAllProduct from "../components/inventory/GetAllProduct";

function Home() {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 ml-0 lg:ml-16 p-4">
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/add-stock" element={<AddProduct />} />
            <Route path="/all-products/:id" element={<GetAllProduct />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Home;
