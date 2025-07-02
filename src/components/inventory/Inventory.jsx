import SearchBar from "../utli/SearchBar";
import ProductTable from "./productTable";

function Inventory() {
  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between ">
        <h1 className="header">Inventory</h1>
        <div className="flex items-center gap-10">
          <div className="w-[400px]">
            <SearchBar placeholder="Search Product with name or Product Code" />
          </div>
          <button className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="M640-640h120-120Zm-440 0h338-18 14-334Zm16-80h528l-34-40H250l-34 40Zm184 270 80-40 80 40v-190H400v190Zm182 330H200q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v196q-19-7-39-11t-41-4v-122H640v153q-35 20-61 49.5T538-371l-58-29-160 80v-320H200v440h334q8 23 20 43t28 37Zm138 0v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
            </svg>
            <span>Add Stock</span>
          </button>
        </div>
      </div>
      <ProductTable />
    </div>
  );
}

export default Inventory;
