import axios from "axios";
import chgOrderStatus from "../../api/orderApi/chgOrderStatus";
import { useEffect, useState } from "react";
import getAOrder from "../../api/orderApi/getAOrder";
import { Cross } from "lucide-react";
import { ImCancelCircle } from "react-icons/im";
import getReceiptImage from "../../api/receipt/getReceiptIamge";

function OrderInfo({ selectedOrder, refreshOrders, handleClose }) {
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const response = await getAOrder(selectedOrder);
    setOrder(response.data);
  };

  useEffect(() => {
    getOrder();
  }, [selectedOrder]);

  const confirmOrder = async (orderId, contactId) => {
    const res = await getReceiptImage(orderId);
    // console.log(res.data.receiptImage.cdnUrl);
    if (res.code === 201) {
      const data = {
        subscriber_id: contactId,
        data: {
          version: "v2",
          content: {
            messages: [
              {
                type: "image",
                // url: res.data.receiptImage.cdnUrl,
                url: "https://otas.sgp1.cdn.digitaloceanspaces.com/uedc/receipt-images/2dc2e269-4270-4b30-b4b7-f25ee0a550ed-1753190155616.png",
              },
              {
                type: "text",
                text: `ဝယ်ယူမှု အောင်မြင်ပါတယ်ရှင့် ဘောင်ချာလေးတင်ထားပြီးပါပြီရှင့် Delivery လေးနဲ့ ၂ ရက်အတွင်း ပစ္စည်းလေးတွေ အပ်ပေးလိုက်ပါမယ်ရှင့် ၃ ရက်အတွင်း ပစ္စည်းလေးတွေရောက်ပါမယ်ရှင့် ကျေးဇူးပြုပြီး Delivery ပစ္စည်လေးလာပိုပေးပြီး ၂၄ နာရီအတွင်းပစ္စည်း error ကင်းမကင်းပစ္စည်းစုံ မစုံ လေးပြန်ပြောပေးပါရှင့်24နာရီကျော်ပီးမှဖြစ်ပေါ်လာတဲ့ကိစ္စများကို Deli ဘက်လေးကတာဝန်ယူမှုလေးမရှိလိုပါရှင့် ဝယ်ယူအားပေးမှုအတွက် အထူးကျေးဇူးတင်ပါတယ်ရှင့်🙆‍♀️🩷အဆင်ပြေတယ်ဆိုရင်တော့ "ok" လိုပြန်ပိုထားပေးပါရှင့်။ မှာယူအားပေးလို ကျေးဇူးအများကြီးတင်ပါတယ်ရှင့်🙆🧡`,
              },
            ],
          },
        },
        message_tag: "POST_PURCHASE_UPDATE",
      };

      axios.post("https://api.manychat.com/fb/sending/sendContent", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 104552281496385:20586026d1d0670ca058d14d006d66a8",
        },
      });
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
  return (
    <div className="mt-10 mx-5 h-[calc(100vh-190px)] overflow-y-auto border border-gray-200 rounded-lg px-5 shadow-md pt-5">
      <div className="flex items-center justify-between">
        <h1 className="header">Order Info</h1>
        <div className="flex flex-col items-end">
          <ImCancelCircle size={24} onClick={handleClose} />
        </div>
      </div>

      {order && (
        <div>
          <div className="flex justify-between items-center mt-5">
            <div>
              <p className="text-[#696969] text-[12px]">Customer Name</p>
              <span className="font-medium text-[16px]">
                {order.snapshotData.customerName}
              </span>
            </div>
            <div>
              <p className="text-[#696969] text-[12px]">Phone Number</p>
              <span className="font-medium text-[16px]">
                {order.snapshotData.contactNumber}
              </span>
            </div>
          </div>

          {order.snapshotData.paymentImage && (
            <div className="mt-5">
              <p className="font-medium text-[16px] mb-5">
                Payment Screenshots
              </p>
              <img
                src={order.snapshotData.paymentImage.url}
                alt=""
                className=""
              />
            </div>
          )}

          {order.deliveryStatus !== "confirm" && (
            <div
              style={{
                position: "sticky",
                bottom: 0,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
              className="py-5 bg-white"
            >
              <button
                className="flex-1 border border-gray-200 p-2 rounded-lg text-primary hover:bg-gray-100 text-[16px]"
                onClick={() => {
                  chgStatus(order.orderId, "cancelled");
                }}
              >
                Order Cancel
              </button>
              <button
                className="flex-1 bg-primary p-2 rounded-lg text-white hover:bg-primary/80 text-[16px]"
                onClick={() => {
                  confirmOrder(order.orderId, order.snapshotData.contactId);
                  // chgStatus(order.orderId, "confirmed");
                }}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderInfo;
