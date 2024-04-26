import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import ShoppingCart from "./Pages/ShoppingCart";

import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App font-poppins">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
