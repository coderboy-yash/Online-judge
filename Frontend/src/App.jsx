import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home></Home>}></Route>
        {/* <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route> */}

      </Routes>

    </BrowserRouter>
  )
}