import { useEffect, useState } from "react";
import { generatePDF } from "./PdfGenerator";
import { Printer, Download, Eye, Trash2 } from "lucide-react";
import getAOrder from "../../api/orderApi/getAOrder";
import { useNavigate } from "react-router-dom";
import chgOrderStatus from "../../api/orderApi/chgOrderStatus";
import deleteOrder from "../../api/orderApi/DeleteOrder";

const OrderTable = ({ orders, passOrder, activeOrder, refreshOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending Orders");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const tabs = ["Pending Orders", "Confirm Orders", "Cancel Orders"];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleView = (id) => {
    navigate(`/order/${id}`);
    // console.log("Edit product:", id);
  };

  const filterOrders = () => {
    if (activeTab === "All") {
      return orders;
    } else if (activeTab === "Pending Orders") {
      return orders.filter((order) => order.deliveryStatus === "pending");
    } else if (activeTab === "Confirm Orders") {
      return orders.filter((order) => order.deliveryStatus === "confirmed");
    } else if (activeTab === "Cancel Orders") {
      return orders.filter((order) => order.deliveryStatus === "cancelled");
    }
  };

  const chgStatus = async (orderId, status) => {
    const data = {
      deliveryStatus: status,
    };
    const res = await chgOrderStatus({ orderId, data });
    // console.log("res", res);
    if (res.code === 200) {
      refreshOrders();
    }
  };

  const handleDelete = async (orderId) => {
    const res = await deleteOrder(orderId);

    if (res.code === 200) {
      refreshOrders();
    }
  };

  // console.log("filteredOrders", filteredOrders);

  useEffect(() => {
    const filteredOrders = filterOrders();
    setFilteredOrders(filteredOrders);
  }, [activeTab, orders]);

  return (
    <div className="w-full mx-auto pt-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab
                ? "  text-primary border-b-2 border-primary"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-y-auto h-[calc(100vh-300px)]">
        <table className="w-full table-auto">
          <thead
            className="bg-gray-50 border-b border-gray-200"
            style={{ position: "sticky", top: 0 }}
          >
            <tr>
              <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider">
                No
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                Address
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order, index) => (
              <tr
                key={order._id}
                className={`${
                  activeOrder === order._id ? "bg-primary/10" : ""
                }`}
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order?.customerName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order?.contactNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <p
                    className={`text-ellipsis overflow-hidden whitespace-nowrap ${
                      activeOrder ? "max-w-[100px]" : "w-full"
                    }`}
                  >
                    {order?.address}
                  </p>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span>{order.paymentType}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span>{order.totalAmount.toLocaleString()} MMK</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {!activeOrder && order.deliveryStatus === "pending" && (
                      <button
                        onClick={() => passOrder(order._id)}
                        className="bg-primary hover:bg-primary/80 text-white p-3 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#e3e3e3"
                        >
                          <path d="m691-150 139-138-42-42-97 95-39-39-42 43 81 81ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z" />
                        </svg>
                      </button>
                    )}
                    {order.deliveryStatus === "confirmed" && (
                      <button
                        onClick={() => chgStatus(order._id, "on-delivery")}
                        className="bg-primary hover:bg-primary/80 text-white p-3 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#e3e3e3"
                        >
                          <path d="M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z" />
                        </svg>
                      </button>
                    )}
                    {order.deliveryStatus === "cancelled" && (
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
                        title=""
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleView(order._id)}
                      className="border border-gray-200 hover:bg-gray-200 text-delete p-3 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">View</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            {startIndex + 1} - {Math.min(endIndex, orders.length)} of{" "}
            {orders.length} Orders
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNum =
                  currentPage <= 3 ? index + 1 : currentPage - 2 + index;
                if (pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm border rounded ${
                      currentPage === pageNum
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
