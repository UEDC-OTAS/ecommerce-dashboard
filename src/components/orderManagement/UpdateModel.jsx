import { useState, useEffect } from "react";
import Modal from "../utli/Modal";
import updateQuantity from "../../api/inventoryApi/UpdateQuantity";
import updateOrderQuantity from "../../api/orderApi/updateOrderQuantity";

const UpdateModel = ({ isOpen, onClose, onSubmit, product, orderId }) => {
  console.log("product", product);
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    setQuantity(product?.quantity || 0);
  }, [product]);

  const handleSubmit = async () => {
    console.log("quantity", quantity);
    const data = {
      newQuantity: quantity,
    };
    const res = await updateOrderQuantity({
      orderId: orderId,
      data: data,
      id: product.saleCode,
    });

    if (res.code === 200) {
      onSubmit();
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!product) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title={product.name}>
      <div className="space-y-6 w-[500px]">
        <div className="">
          {/* Title for the stock quantity */}
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
            Current Stock Quantity
          </h2>

          {/* Quantity control section */}
          <div className="flex items-center justify-center space-x-4">
            {/* Minus button */}
            <button
              onClick={handleDecrement}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
              aria-label="Decrement quantity"
            >
              {/* Minus icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Quantity input field */}
            <div>
              <p>{quantity}</p>
            </div>

            {/* Plus button */}
            <button
              onClick={handleIncrement}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
              aria-label="Increment quantity"
            >
              {/* Plus icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors"
          >
            Confirm Quantity
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateModel;
