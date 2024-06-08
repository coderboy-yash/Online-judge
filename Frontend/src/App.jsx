import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import { UserProvider } from "./userContext";

export default function App() {
  
  // console.log(username);
  return (
    
<UserProvider>



    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/problem" element={<Problem></Problem>}></Route>
        {/* <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route> */}

      </Routes>

    </BrowserRouter>
    <div className="bg-amber-800 p-2 text-white mt-10 text-xs  w-full justify-center flex">Made with love from yash ❤</div>
    </UserProvider>
 
  )
}