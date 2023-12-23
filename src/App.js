import "./App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
