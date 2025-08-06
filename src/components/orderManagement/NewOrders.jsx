import { useEffect, useState } from "react";
import getAllOrders from "../../api/orderApi/getAllOrders";
import OrderInfo from "./OrderInfo";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import { FaCalendarAlt } from "react-icons/fa";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import io from "socket.io-client";
import SearchBar from "../utli/SearchBar";
import searchOrder from "../../api/orderApi/SearchOrder";
import { toast } from "sonner";
import NewOrderTable from "./NewOrderTable";

const socket = io.connect(import.meta.env.VITE_APP_API, {
  transports: ["websocket"],
  secure: true,
});

function NewOrders() {
  const today = new Date();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [notificationPermission, setNotificationPermission] = useState(
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "denied"
  );

  const msToAdd = (4 * 60 + 22) * 60 * 1000; // 15,720,000 ms

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      return permission;
    }
    return "denied";
  };

  // Play notification sound
  const playNotificationSound = () => {
    try {
      // Create audio context for notification sound
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      // Create a simple beep sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // console.log("Could not play notification sound:", error);
    }
  };

  // Show browser notification
  const showNotification = (ticket, name) => {
    if (typeof window !== "undefined" && notificationPermission === "granted") {
      const notification = new Notification(
        name ? name : "New Support Ticket",
        {
          body: `From: ${ticket.customerName}`,
          tag: "support-ticket",
        }
      );

      notification.onclick = () => {
        window.focus();
        notification.close();
        setFilter("unseen");
      };

      // Auto close after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  };

  const getOrders = async () => {
    setLoading(true);
    const response = await getAllOrders(activeTab, activePage);

    if (response.code === 200) {
      setLoading(false);
      setTotalCount(response.totalCount);
      setOrders(response.data);
    }
  };

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

  const searchFunction = async (name) => {
    const response = await searchOrder(name);
    const orderArray = response.data.map((item) => {
      return {
        _id: item._id,
        snapshotData: { ...item },
      };
    });
    setOrders(orderArray);
  };

  useEffect(() => {
    requestNotificationPermission();
    getOrders();
  }, [activeTab]);

  useEffect(() => {
    // Connection established
    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socket.on("orderFinalized", (data) => {
      toast.success("New Order Arrived");
      playNotificationSound();
      const formattedOrderDate = format(
        data.snapshotData.createdAt,
        "yyyy-MM-dd"
      );
      if (
        formattedOrderDate ===
        format(sessionStorage.getItem("choseDate"), "yyyy-MM-dd")
      ) {
        if (activeTab === "pending") {
          // if (activePage === 1) {
          setOrders((prev) => {
            const index = prev.findIndex((order) => order._id === data._id);
            if (index !== -1) {
              // Replace existing order
              const updatedOrders = [...prev];
              updatedOrders[index] = data;
              return updatedOrders;
            } else {
              // Add new order
              return [data, ...prev];
            }
          });
          // }
        } else {
          showNotification(data.snapshotData, "New Order Arrived");
          toast.success("New Order Arrived");
        }
      } else {
        showNotification(data.snapshotData, "New Order Arrived");
        toast.success("New Order Arrived");
      }
    });

    socket.on("orderStatusUpdated", (data) => {
      if (activeTab === "pending") {
        const handleRemove = (value) => {
          setOrders((prev) => prev.filter((item) => item._id !== value));
        };
        handleRemove(data.orderId);
      }
    });

    // Cleanup
    return () => {
      socket.off("orderFinalized");
      socket.off("orderStatusUpdated");
    };
  }, []);

  return (
    <div className="px-4">
      <div className="flex items-center justify-between ">
        <h1 className="header">New Orders</h1>

        <div className="flex items-center gap-10">
          <div className="w-[400px]">
            <SearchBar
              onSearch={(name) => (!name ? getOrders() : null)}
              placeholder="Search Product with name or Product Code"
              onClick={searchFunction}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        <div
          className={`transition-all duration-300 ${
            selectedOrder ? "w-2/3" : "w-full"
          }`}
        >
          <NewOrderTable
            orders={orders}
            passOrder={passOrder}
            activeOrder={selectedOrder}
            passTab={passTab}
            loading={loading}
            passPage={passPage}
            totalCount={totalCount}
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

export default NewOrders;
