import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Inventory from "../components/inventory/Inventory";
import GetAllOrder from "../components/orderManagement/GetAllOrder";
import DeliveryPage from "../components/delivery/DeliveryPage";
function Home() {
  return (
    <>
      <Navbar />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/orders" element={<GetAllOrder />} />
          <Route path="/delivery" element={<DeliveryPage />} />
        </Routes>
      </div>
    </>
  );
}

export default Home;
