import logo from "./logo.svg";
import "./App.scss";

import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";



function App() {
  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
