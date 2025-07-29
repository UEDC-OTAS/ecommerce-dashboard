import { MdOutlinePersonAddAlt } from "react-icons/md";
import AccountTable from "./AccountTable";
import getAllUsers from "../../api/accountApi/getAlluser";
import { useEffect, useState } from "react";
import AddStaffModal from "./AddStaffModal";

function Accounts() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    console.log(res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between ">
        <h1 className="header">Staff</h1>
        <div className="flex items-center gap-10">
          {/* <div className="w-[400px]">
            <SearchBar placeholder="Search Product with name or Product Code" />
          </div> */}
          <button
            className="button w-[150px]"
            onClick={() => setIsModalOpen(true)}
          >
            <MdOutlinePersonAddAlt size={20} />
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      <AccountTable users={users} />

      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {
          setIsModalOpen(false);
          fetchUsers();
        }}
      />
    </div>
  );
}

export default Accounts;
