import axios from "axios";
import chgOrderStatus from "../../api/orderApi/chgOrderStatus";

function OrderInfo({ selectedOrder, refreshOrders }) {
  console.log(selectedOrder);
  const confirmOrder = async (orderId, psid) => {
    const data = {
      subscriber_id: psid,
      order_id: orderId,
      message_text: "ဝယ်ယူမှုအောင်မြင်ပါသည်",
    };
    console.log("order", data);

    axios.post(
      "https://hook.us1.make.com/1dl8u4cfm8mzefq9zkevxsmshhqpl4yg",
      data
    );
  };

  const chgStatus = async (orderId) => {
    const data = {
      deliveryStatus: "confirmed",
    };
    const res = await chgOrderStatus({ orderId, data });
    console.log(res);
    if (res.code === 200) {
      refreshOrders();
    }
  };
  return (
    <div className="mt-10 mx-5 h-[calc(100vh-190px)] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="header">Order Info</h1>
        <div className="flex flex-col items-end">
          <p className="text-[#696969] text-[10px]">Order ID</p>
          <span className="text-[16px]">{selectedOrder.orderId}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <div>
          <p className="font-medium text-[16px]">Customer Name</p>
          <span className="text-[#696969] text-[16px]">
            {selectedOrder.snapshotData.customerName}
          </span>
        </div>
        <div>
          <p className="font-medium text-[16px]">Phone Number</p>
          <span className="text-[#696969] text-[16px]">
            {selectedOrder.snapshotData.contactNumber}
          </span>
        </div>
      </div>

      {selectedOrder.snapshotData.paymentImage && (
        <div className="mt-5">
          <p className="font-medium text-[16px]">Payment Screenshots</p>
          <img
            src={selectedOrder.snapshotData.paymentImage.cloudinaryUrl}
            alt=""
            className=""
          />
        </div>
      )}

      {selectedOrder.deliveryStatus !== "confirm" && (
        <div
          style={{ position: "sticky", bottom: 0 }}
          className="pt-2 bg-white"
        >
          <button
            className="button"
            onClick={() => {
              confirmOrder(
                selectedOrder.orderId,
                selectedOrder.snapshotData.psid
              );
              chgStatus(selectedOrder.orderId);
            }}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderInfo;
