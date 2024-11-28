import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeEdit from "./pages/EmpEdit";
import EmployeeList from "./pages/empList";
import EmployeeCreate from "./pages/empcreate";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/employee-edit/:id" element={<EmployeeEdit />} />
        <Route path="/employee-create" element={<EmployeeCreate />} />
      </Routes>
    </Router>
  );
};

export default App;
