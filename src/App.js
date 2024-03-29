import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import UserProfile from "./Pages/UserProfile";
import ShoppingCart from "./Pages/ShoppingCart";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user-profile" element={<UserProfile />} />
          <Route exact path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
