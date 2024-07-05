import { Routes, Route } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddPeople from "./pages/AddPeople";
import SinglePerson from "./pages/SinglePerson";
function App() {
  return (
    <div className="h-full w-full">
      <MyNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/addpeople" element={<AddPeople />} />
        <Route path="/single/:id" element={<SinglePerson />} />
      </Routes>
    </div>
  );
}

export default App;
