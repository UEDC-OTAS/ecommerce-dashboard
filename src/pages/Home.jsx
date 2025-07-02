import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Inventory from "../components/inventory/Inventory";

function Home() {
  return (
    <>
      <Navbar />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Inventory />} />
        </Routes>
      </div>
    </>
  );
}

export default Home;
