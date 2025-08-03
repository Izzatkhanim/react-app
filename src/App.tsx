import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Universities from "./Universities";
import Schools from "./Schools";
import HighSchools from "./HighSchools";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="universities" element={<Universities />} />
          <Route path="schools" element={<Schools />} />
          <Route path="highschools" element={<HighSchools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
