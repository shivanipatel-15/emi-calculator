import "./App.css";
// import Counter from "./components/Counter";
// import CrudOp from "./components/CrudOp";
// import Todo from "./TodoComponent/Todo";
import Login from "./EMIComponent/Login";
// import EMICalc from "./EMIComponent/EMICalc";
import EMICalcFrom from "./EMIComponent/EMICalcForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/emi-calculator" element={<EMICalcFrom />} />
      </Routes>
    </div>
  );
}

export default App;
