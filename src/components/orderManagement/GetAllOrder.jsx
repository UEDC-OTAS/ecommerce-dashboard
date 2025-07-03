import { useEffect, useState } from "react";
import getAllOrders from "../../api/orderApi/getAllOrders";
import SearchBar from "../utli/SearchBar";
import OrderTable from "./OrderTable";

function GetAllOrder() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await getAllOrders();
    console.log(response);
    setOrders(response.data);
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

      <div className="w-2/3">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
}

export default GetAllOrder;
