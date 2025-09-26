import { useState, useEffect } from "react";
import Modal from "../utli/Modal";
import updateQuantity from "../../api/inventoryApi/UpdateQuantity";
import bulkPriceChg from "../../api/inventoryApi/BulkPriceChg";

const BulkPriceModel = ({ isOpen, onClose, cancel, stockIds }) => {
  // console.log("stockIds", stockIds);
  const [percentageChange, setPercentageChange] = useState("");
  const [isIncreasing, setIsIncreasing] = useState(true);

  const handlePercentageChange = (e) => {
    const value = e.target.value;
    // Allow empty string for clearing the input
    if (value === "") {
      setPercentageChange("");
      return;
    }

    // Convert to number and validate
    const numValue = Number.parseFloat(value);
    if (!isNaN(numValue) && numValue <= 100) {
      setPercentageChange(value);
    }
    // If value is over 100 or invalid, don't update state (prevents typing)
  };

  // Apply bulk price change
  const applyPriceChange = async () => {
    const percentage = Number.parseFloat(percentageChange);

    if (isNaN(percentage) || percentage <= 0) {
      alert("Please enter a valid percentage greater than 0");
      return;
    }

    // console.log("percentage", percentage);
    const data = {
      ids: stockIds,
      percentage: isIncreasing ? percentage : -percentage,
    };

    const res = await bulkPriceChg(data);
    // console.log(res);

    if (res.success) {
      onClose();
      setPercentageChange("");
      setIsIncreasing(true);
    }

    // Clear selections and reset form
  };

  const handleClose = () => {
    cancel();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Bulk Price" size="lg">
      <div className="space-y-10 lg:w-[600px]">
        <div className=" flex flex-col md:flex-row gap-10 items-center">
          {/* Percentage Input */}
          <div>
            <label className="w-[200px] block text-sm font-medium text-gray-700 mb-2">
              Percentage Change
            </label>
            <input
              type="number"
              value={percentageChange}
              onChange={handlePercentageChange}
              placeholder="Enter percentage"
              min="0"
              max="100"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Increase/Decrease Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action
            </label>
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <button
                onClick={() => setIsIncreasing(true)}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  isIncreasing
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Increase
              </button>
              <button
                onClick={() => setIsIncreasing(false)}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  !isIncreasing
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Decrease
              </button>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex justify-end">
          <button
            onClick={applyPriceChange}
            // disabled={selectedCount === 0 || !percentageChange}
            className="button bg-primary text-white"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BulkPriceModel;
