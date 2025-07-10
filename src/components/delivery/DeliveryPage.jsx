import { useEffect, useState } from "react";
import getAllOrders from "../../api/orderApi/getAllOrders";
import SearchBar from "../utli/SearchBar";
import DeliveryTable from "./DeliveryTable";
import DeliReciept from "./DeliReciept";
import axios from "./../../axios";

function DeliveryPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const getOrders = async () => {
    const response = await getAllOrders();
    // console.log(response);
    const filteredOrders = response.data.filter(
      (order) => order.deliveryStatus === "confirmed"
    );
    setOrders(filteredOrders.reverse());
  };

  const passOrder = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
      getReceipt(orderId);
    }
  };

  const getReceipt = async (id) => {
    const response = await axios.get(`api/v1/delivery-receipt`);
    // if (response.code === 200) {
    const filteredReceipt = response.data.data.filter(
      (receipt) => receipt.orderId === id
    );
    setReceipt(filteredReceipt);
    console.log("receipt", filteredReceipt);
    // }
  };

  useEffect(() => {
    getReceipt();
  }, []);

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="px-4">
      <div className="flex items-center justify-between ">
        <h1 className="header">Delivery</h1>
        <div className="flex items-center gap-10">
          <div className="w-[400px]">
            <SearchBar placeholder="Search Order with name or Product Code" />
          </div>
        </div>
      </div>

      <div className="flex">
        <div
          className={`transition-all duration-300 ${
            selectedOrder ? "w-2/3" : "w-full"
          }`}
        >
          <DeliveryTable
            orders={orders}
            passOrder={passOrder}
            // handlePrintPDF={handlePrintPDF}
          />
        </div>

        <div
          className={`transition-all duration-300 ${
            selectedOrder ? "w-1/3" : "w-0"
          }`}
        >
          {selectedOrder && (
            <DeliReciept
              selectedOrder={selectedOrder}
              refreshOrders={() => setSelectedOrder(null)}
              receipt={receipt}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryPage;
