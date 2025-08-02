import { useEffect, useState } from "react";
import getAllOrders from "../../api/orderApi/getAllOrders";
import OrderTable from "./OrderTable";
import OrderInfo from "./OrderInfo";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import { FaCalendarAlt } from "react-icons/fa";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function GetAllOrder() {
  const today = new Date();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(today);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [activePage, setActivePage] = useState(1);

  const msToAdd = (4 * 60 + 22) * 60 * 1000; // 15,720,000 ms

  const formattedDate = format("2025-08-02T09:55:51.986Z", "yyyy-MM-dd");
  // console.log("formattedDate", formattedDate);

  // console.log("activeTab", activeTab);

  const getOrders = async () => {
    setLoading(true);
    const response = await getAllOrders(activeTab, activePage);
    console.log("response", response);
    if (response.code === 200) {
      setLoading(false);
      const filteredOrders = response.data.filter((item) => {
        const orderDate = new Date(item.snapshotData.updatedAt);
        const orderDateWithMs = new Date(orderDate.getTime() + msToAdd);
        const formattedOrderDate = format(orderDateWithMs, "yyyy-MM-dd");
        return formattedOrderDate === format(date, "yyyy-MM-dd");
      });
      setOrders(filteredOrders);
    }
  };

  // console.log("orders", orders);

  const passOrder = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
    }
  };

  const passTab = (tab) => {
    if (tab === "Pending Orders") {
      setActiveTab("pending");
    } else if (tab === "Confirm Orders") {
      setActiveTab("confirmed");
    } else if (tab === "Cancel Orders") {
      setActiveTab("cancelled");
    }
  };

  const passPage = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    getOrders();
  }, [activeTab, date]);

  return (
    <div className="px-4">
      <div className="flex items-center justify-between ">
        <h1 className="header">Orders</h1>

        <div className="flex items-center gap-10">
          <button
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              // console.log(showDatePicker);
            }}
            className="button button-color text-color border border-primary transition-all duration-300 "
          >
            <FaCalendarAlt className="text-color" />
            {format(date, "MMMM d,yyyy")}
          </button>
        </div>
      </div>

      {/* Date Range Picker */}
      {showDatePicker && (
        <div className="mb-4 bg-white rounded-lg shadow-md absolute right-0 z-10">
          <Calendar
            date={today}
            onChange={(date) => {
              setDate(date);
              setShowDatePicker(false);
            }}
          />
        </div>
      )}

      <div className="flex">
        <div
          className={`transition-all duration-300 ${
            selectedOrder ? "w-2/3" : "w-full"
          }`}
        >
          <OrderTable
            orders={orders}
            passOrder={passOrder}
            activeOrder={selectedOrder}
            passTab={passTab}
            loading={loading}
            passPage={passPage}
            refreshOrders={() => {
              getOrders();
              setSelectedOrder(null);
            }}
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
              handleClose={() => setSelectedOrder(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GetAllOrder;
