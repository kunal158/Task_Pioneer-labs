import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Task2 from "./components/Task2";
import Task3 from "./components/Task3";
import Task4 from "./components/Task4";
import Home from "./components/Home";


function App() {
  const [sidebar, setSidebar] = useState(true);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className={`app ${sidebar ? "sidebar-open" : "sidebar-closed"}`}>
      <Router>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className={`content ${sidebar ? "shifted" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task2" element={<Task2 />} />
            <Route path="/task3" element={<Task3 />} />
            <Route path="/task4" element={<Task4 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
