import { ChevronRight, Download, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import getAOrder from "../../api/orderApi/getAOrder";
import { useParams, useNavigate } from "react-router-dom";
import { generatePDF } from "./PdfGenerator";
import UpdateModel from "./UpdateModel";
import chgOrderStatus from "../../api/orderApi/chgOrderStatus";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(order);
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);
  const [printData, setPrintData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const getOrder = async () => {
    const response = await getAOrder(id);
    console.log("response", response);
    if (response.code === 200) {
      setOrder(response.data.snapshotData);
      setPrintData(response.data);
    }
  };

  const chgStatus = async (status) => {
    const orderId = id;
    const data = {
      deliveryStatus: status,
    };
    await chgOrderStatus({ orderId, data });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handlePrintPDF = async (order) => {
    setIsGenerating(order.orderId);
    try {
      await generatePDF(order);
    } catch (error) {
      // console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(null);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-100px)]">
      {order && (
        <div className="w-full mx-auto">
          {/* Breadcrumb */}
          <div className="flex justify-between items-center px-4 py-2">
            <div className="flex items-center text-gray-600 mb-6 ">
              <span
                className="header cursor-pointer"
                onClick={() => navigate("/orders")}
              >
                Orders
              </span>
              <ChevronRight className="w-6 h-6 mx-2" />
              <span className="header">Order Details</span>
            </div>
            {order.deliveryStatus !== "cancelled" && (
              <button
                className="flex items-center gap-2 mr-4 border border-gray-200 px-4 py-3    rounded-lg text-primary hover:bg-gray-100 text-[16px]"
                onClick={() => {
                  chgStatus("cancelled");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#E95900"
                >
                  <path d="m760-183-85 84-56-56 84-85-84-85 56-56 85 84 85-84 56 56-84 85 84 85-56 56-85-84ZM240-80q-50 0-85-35t-35-85v-120h120v-560h600v415q-19-7-39-10.5t-41-3.5v-321H320v480h214q-7 19-10.5 39t-3.5 41H200v40q0 17 11.5 28.5T240-160h294q8 23 20 43t28 37H240Zm120-520v-80h360v80H360Zm0 120v-80h360v80H360Zm174 320H200h334Z" />
                </svg>
                Order Cancel
              </button>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 p-4 overflow-y-auto h-[calc(100vh-160px)]">
            {/* Customer Section */}
            <div className="space-y-10">
              <div className="bg-white rounded-lg shadow-sm border  py-10 px-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-8 border-b pb-4">
                  Customer
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Customer Name</span>
                    <span className="text-sm text-gray-500">Phone Number</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {order.customerName}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {order.contactNumber}
                    </span>
                  </div>

                  <div className="pt-4">
                    <div className="text-sm text-gray-500 mb-1">
                      Facebook Account Name
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {order.facebookName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="bg-white rounded-lg shadow-sm border py-10 px-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-8 border-b pb-4">
                  Delivery
                </h2>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-500">
                        Delivery Type
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {order.deliveryType}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-500">
                        Delivery Service
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {order.deliveryServiceName}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Address</div>
                    <div className="text-sm text-gray-900">{order.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-8 border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Payment Type</div>
                  <div className="text-sm font-medium text-gray-900">
                    {order.paymentType}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-5">
                    Payment Screenshot
                  </div>
                  <div className=" max-w-xs mx-auto">
                    <img
                      src={order.paymentImage.url}
                      alt="Payment Screenshot"
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-lg font-semibold text-gray-900">Order</h2>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    order.deliveryStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.deliveryStatus === "Pending"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.deliveryStatus}
                </span>
              </div>

              <div className="w-full h-[500px] mx-auto font-sans relative">
                {/* Header */}
                <div className="grid grid-cols-3 gap-4 pb-4 mb-6 border-b border-gray-200">
                  <div className="text-gray-600 text-sm font-medium">Items</div>
                  <div className="text-gray-600 text-sm font-medium text-center">
                    Quantity
                  </div>
                  <div className="text-gray-600 text-sm font-medium text-right">
                    Price
                  </div>
                </div>

                {/* Item Row */}
                {order?.orderInfo?.map((item) => (
                  <div
                    className="grid grid-cols-3 gap-4 mb-8"
                    key={item.saleCode}
                    onClick={() => {
                      setIsOpen(true);
                      setProduct(item);
                    }}
                  >
                    <div className="text-gray-900 text-sm font-medium">
                      {item.name}
                    </div>
                    <div className="text-gray-900 text-sm text-center">
                      {item.quantity}
                    </div>
                    <div className="text-gray-900 text-sm text-right">
                      {(item.price * item.quantity).toLocaleString()} MMK
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                  }}
                >
                  {/* Total Section */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div className="text-gray-900 text-lg font-semibold">
                        Total
                      </div>
                      <div className="text-gray-900 text-lg font-semibold">
                        {order.totalAmount.toLocaleString()} MMK
                      </div>
                    </div>
                  </div>

                  {/* Print Button */}
                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrintPDF(printData);
                    }}
                    disabled={isGenerating}
                    size="sm"
                  >
                    {isGenerating ? (
                      <>
                        <Download className="w-4 h-4" />
                        <span className="myanmar-text">Waiting...</span>
                      </>
                    ) : (
                      <>
                        <Printer className="w-4 h-4" />
                        <span className="myanmar-text">Print</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <UpdateModel
        isOpen={isOpen}
        onClose={handleClose}
        product={product}
        orderId={id}
        onSubmit={getOrder}
      />
    </div>
  );
}
