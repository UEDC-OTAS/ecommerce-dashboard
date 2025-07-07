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
    console.log(response);
    setOrders(response.data.reverse());
  };

  const passOrder = (orderId) => {
    const order = orders.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
    console.log("order", order);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="">
      <div className="flex items-center justify-between ">
        <h1 className="header">Orders</h1>
        <div className="flex items-center gap-10">
          <div className="w-[400px]">
            <SearchBar placeholder="Search Order with name or Product Code" />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-2/3">
          <OrderTable
            orders={orders}
            passOrder={passOrder}
            // handlePrintPDF={handlePrintPDF}
          />
        </div>

        <div className="w-1/3">
          {selectedOrder && (
            <OrderInfo
              selectedOrder={selectedOrder}
              refreshOrders={getOrders}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GetAllOrder;
