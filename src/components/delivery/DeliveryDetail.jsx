import { Download, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import getAOrder from "../../api/orderApi/getAOrder";
import { useParams, useNavigate } from "react-router-dom";
import getReceiptImage from "../../api/receipt/getReceiptIamge";
import { MdArrowBack } from "react-icons/md";
import Loading from "../utli/Loading";

export default function DeliveryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const response = await getAOrder(id);

    if (response.code === 200) {
      setOrder(response.data.snapshotData);
    } else if (response.code === 403) {
      navigate("/unauthorized");
    }
  };

  const handlePrintClick = (voucherImageUrl) => {
    console.log(voucherImageUrl);

    // Create a new window
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      // Popup blocked
      console.warn("Popup blocked. Unable to open print window.");
      // Optional: provide user feedback or fallback
      return;
    }

    // Create the HTML content for the new window
    const htmlContent = `
    
    <html> <head> <title>Print Voucher</title> <style> body { margin: 0; } img { max-width: 100%; height: auto; display: block; } </style> </head> <body> <img src="${voucherImageUrl}" onload="window.print(); window.close();" /> </body> </html> `;

    setTimeout(() => {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }, 500);

    // No need to call print() here; the onload handler will print automatically
    // printWindow.print();
    // printWindow.close(); // Will be called by onload after printing
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handlePrintPDF = async () => {
    const res = await getReceiptImage(id);
    console.log(res);
    if (res.code === 201) {
      handlePrintClick(res.data.receiptImage.cdnUrl);
    }
  };

  // console.log(order);

  if (!order) {
    return <Loading />;
  }

  return (
    <div className="h-[calc(100vh-50px)] overflow-y-auto px-5">
      <div>
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <div className="flex gap-2 items-center">
            <MdArrowBack size={24} onClick={() => navigate("/delivery")} />
            <h1 className="header">Order Details</h1>
          </div>
        </div>

        <div>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-20">
              <div className="space-y-10 w-full md:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {/* Customer Name */}
                  <div>
                    <label htmlFor="stockName" className="label">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      id="stockName"
                      name="stockName"
                      readOnly
                      value={order.customerName}
                      className="input-box"
                    />
                  </div>

                  {/* Facebook Account */}
                  <div>
                    <label htmlFor="stockName" className="label">
                      Facebook Account
                    </label>
                    <input
                      type="text"
                      id="stockName"
                      name="stockName"
                      readOnly
                      value={order.facebookName}
                      className="input-box"
                    />
                  </div>
                </div>

                <div className=" grid grid-cols-1 gap-10">
                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="label">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      readOnly
                      value={order.address}
                      className="input-box"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {/* phone number */}
                  <div>
                    <label htmlFor="contactNumber" className="label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      readOnly
                      value={order.contactNumber}
                      className="input-box"
                    />
                  </div>

                  {/* payment type */}
                  <div>
                    <label htmlFor="Payment Type" className="label">
                      Payment Type
                    </label>
                    <input
                      type="text"
                      id="Payment Type"
                      name="Payment Type"
                      readOnly
                      value={order.paymentType}
                      className="input-box"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {/* delivery type */}
                  <div>
                    <label htmlFor="deliveryType" className="label">
                      Delivery Type
                    </label>
                    <input
                      type="text"
                      id="deliveryType"
                      name="deliveryType"
                      readOnly
                      value={order.delivery.deliveryType}
                      className="input-box"
                    />
                  </div>

                  {/* delivery service */}
                  {order.delivery.deliveryType === "delivery-service" ? (
                    <div>
                      <label htmlFor="Delivery Service" className="label">
                        Delivery Service
                      </label>
                      <input
                        type="text"
                        id="Delivery Service"
                        name="Delivery Service"
                        readOnly
                        value={order.delivery.deliveryServiceName}
                        className="input-box"
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="Delivery Service" className="label">
                        Car Gate Name
                      </label>
                      <input
                        type="text"
                        id="Delivery Service"
                        name="Delivery Service"
                        readOnly
                        value={order?.delivery?.gateName}
                        className="input-box"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {order.delivery.deliveryType === "gate-drop-off" && (
                    <div>
                      <label htmlFor="Delivery Service" className="label">
                        Car Gate Info
                      </label>
                      <textarea
                        id="Delivery Service"
                        name="Delivery Service"
                        readOnly
                        value={order?.delivery?.gateInfo}
                        className="input-box"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Image Upload */}
              {order.paymentType === "cash-down" && (
                <div className="w-full md:w-1/3">
                  <label className="label">Payment ScreenShot</label>

                  {/* Form Image Previews */}

                  <div className="mt-4 w-full">
                    <div className="rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={order.paymentImage.url || "/placeholder.svg"}
                        alt="paymentImage"
                        className="w-full max-h-[600px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Order Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-10">
            <div className="flex justify-between items-center mb-8 pb-4">
              <div className="flex items-center gap-4">
                <h2 className="header">Order Receipt</h2>
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

              {/* Print Button */}
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                onClick={() => {
                  handlePrintPDF();
                }}
              >
                <Printer className="w-4 h-4" />
                <span className="myanmar-text">Print</span>
              </button>
            </div>

            <div className="w-full h-auto mx-auto font-sans relative">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 pb-4 mb-6 border-b border-gray-200">
                <div className="label">Items</div>
                <div className="label text-center">Quantity</div>
                <div className="label text-right">Price</div>
              </div>

              {/* Item Row */}
              {order?.orderInfo?.map((item) => (
                <div
                  className="grid grid-cols-3 gap-4 mb-8"
                  key={item.saleCode}
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

              <div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
