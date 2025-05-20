import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Component/Home/Home";


function Page() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Page;
