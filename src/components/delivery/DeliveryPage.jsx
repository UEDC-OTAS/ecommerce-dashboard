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
  const [activeTab, setActiveTab] = useState("confirmed");
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    const response = await getAllOrders(activeTab, activePage);
    setOrders(response.data);
    setLoading(false);
  };

  const getReceipt = async (id) => {
    // console.log("work");
    setLoading(true);
    const response = await axios.get(`api/v1/delivery-receipt`);
    // console.log("response", response);
    if (response.data.code === 200) {
      const filteredReceipt = response.data.data.filter(
        (receipt) => receipt.orderId === id
      );
      setReceipt(filteredReceipt);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const passOrder = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
      getReceipt(orderId);
    }
  };

  // console.log("receipt", receipt);

  const passTab = (tab) => {
    if (tab === "Pending") {
      setActiveTab("confirmed");
    } else if (tab === "On-delivery") {
      setActiveTab("on-delivery");
    } else if (tab === "Delivered") {
      setActiveTab("completed");
    }
  };

  const passPage = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    getOrders();
  }, [activeTab, activePage]);
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
            refreshOrders={() => {
              setSelectedOrder(null);
              getOrders();
            }}
            loading={loading}
            passTab={passTab}
            passPage={passPage}
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
              refreshOrders={() => {
                setSelectedOrder(null);
                getOrders();
              }}
              loading={loading}
              receipt={receipt}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryPage;
