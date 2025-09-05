import { useState, useEffect } from "react";
import Modal from "../utli/Modal";

const EditCustomerModel = ({ isOpen, onClose, onSubmit, product, orderId }) => {
  // console.log("product", product)c;
  // console.log("product", product);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    onClose();
  };

  if (!product) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title={product.name}>
      <div className="space-y-6 w-[500px]">
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={product.name}
                className="input-box"
              />
            </div>
            <div>
              <label htmlFor="address" className="label">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={product.address}
                className="input-box"
              />
            </div>
            <div>
              <label htmlFor="contactNumber" className="label">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                value={product.contactNumber}
                className="input-box"
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditCustomerModel;
