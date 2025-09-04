import { useState } from "react";
import Modal from "../utli/Modal";
import updatePassword from "../../api/accountApi/updatePassword";
import updateDepartment from "../../api/accountApi/updateDeperment";
const UpdateModel = ({ isOpen, onClose, isPasswordOpen, onSubmit, user }) => {
  // console.log(user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  // console.log(department);

  const handleClose = () => {
    onClose();
  };

  const updateInfo = async () => {
    // console.log("updateDepartment");
    const data = {
      role: department,
    };
    const response = await updateDepartment({ id: user?._id, data });
    if (response.code === 200) {
      handleClose();
      onSubmit();
    }
  };

  const passwordSubmit = async () => {
    // onSubmit();
    // console.log("passwordSubmit");
    const data = {
      newPassword: password,
      confirmPassword,
    };
    const response = await updatePassword({ id: user?._id, data });
    if (response.code === 200) {
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={"Edit Staff Password"}
    >
      {isPasswordOpen ? (
        <div className="space-y-6 w-[500px]">
          <div>
            <label htmlFor="name" className="label">
              New Password
            </label>
            <input
              type="text"
              id="name"
              className="input-box"
              placeholder="Enter New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="name" className="label">
              Confirm Password
            </label>
            <input
              type="text"
              id="name"
              className="input-box"
              placeholder="Enter Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end mt-5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={passwordSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors"
            >
              Confirm Edit
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 w-[500px]">
          <div>
            <label htmlFor="name" className="label">
              Staff Name
            </label>
            <input
              type="text"
              id="name"
              className="input-box"
              readOnly
              value={user?.username || ""}
            />
          </div>

          <div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department
              </label>
              <select
                id="role"
                name="role"
                value={department || user?.role}
                onChange={(e) => setDepartment(e.target.value)}
                className={`
              w-full px-3 py-2 border rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300
              transition-colors
             
            `}
              >
                <option value="">Select Department</option>
                <option value="admin">Admin</option>
                <option value="inventory">Inventory</option>
                <option value="finance">Finance</option>
                <option value="delivery">Delivery</option>
                <option value="customer-support">Customer Support</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end mt-5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => updateInfo()}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors"
            >
              Confirm Edit
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UpdateModel;
