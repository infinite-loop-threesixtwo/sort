import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Bubble from "./pages/bubble";
import NoPage from "./pages/nopage";
import Layout from "./pages/layout";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sort/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sort/bubble" element={<Bubble />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));