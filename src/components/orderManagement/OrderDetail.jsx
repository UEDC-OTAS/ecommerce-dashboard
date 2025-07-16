import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import getAOrder from "../../api/orderApi/getAOrder";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const response = await getAOrder(id);
    console.log("response", response);
    if (response.code === 200) {
      //   console.log("order", response.data.snapshotData);
      setOrder(response.data.snapshotData);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4  h-screen">
      {order && (
        <div className="w-full mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-gray-600 mb-6">
            <span className="header">Orders</span>
            <ChevronRight className="w-6 h-6 mx-2" />
            <span className="header">Order Details</span>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 p-4 overflow-y-auto h-[calc(100vh-200px)]">
            {/* Customer Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                    <span className="text-sm text-gray-900">
                      {order.contactNumber}
                    </span>
                  </div>

                  <div className="pt-4 border-t">
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
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Confirmed
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Payment Type</div>
                  <div className="text-sm font-medium text-gray-900">
                    {order.paymentType}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">
                    Payment Screenshot
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={order.paymentImage.url}
                      alt="Payment Screenshot"
                      className="w-full h-auto max-w-xs mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-5 text-sm text-gray-500">
                  <span className="col-span-3">Items</span>
                  <span className="col-span-1 text-center">Qty</span>
                  <span className="col-span-1 text-end">Amount</span>
                </div>

                {order.orderInfo.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div className="grid grid-cols-5 text-sm text-gray-500">
                      <span className="col-span-3">{item.productName}</span>
                      <span className="col-span-1 text-center">
                        {item.quantity}
                      </span>
                      <span className="col-span-1 text-end">
                        {item.productPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
