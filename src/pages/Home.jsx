import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Inventory from "../components/inventory/Inventory";
import GetAllOrder from "../components/orderManagement/GetAllOrder";
import DeliveryPage from "../components/delivery/DeliveryPage";
import CustomerSupport from "../components/support/CustomerSupport";
import OrderDetail from "../components/orderManagement/OrderDetail";
function Home() {
  return (
    <>
      <Navbar />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/orders" element={<GetAllOrder />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/support" element={<CustomerSupport />} />
        </Routes>
      </div>
    </>
  );
}

export default Home;
