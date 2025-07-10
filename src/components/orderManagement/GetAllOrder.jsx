import { useEffect, useState } from "react";
import getAllOrders from "../../api/orderApi/getAllOrders";
import SearchBar from "../utli/SearchBar";
import OrderTable from "./OrderTable";
import OrderInfo from "./OrderInfo";

function GetAllOrder() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrders = async () => {
    const response = await getAllOrders();
    // console.log(response);
    const filteredOrders = response.data.filter(
      (order) => order.deliveryStatus === "pending"
    );
    setOrders(filteredOrders.reverse());
  };

  const passOrder = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="px-4">
      <div className="flex items-center justify-between ">
        <h1 className="header">Orders</h1>
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
          <OrderTable
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
            <OrderInfo
              selectedOrder={selectedOrder}
              refreshOrders={() => {
                getOrders();
                setSelectedOrder(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GetAllOrder;
