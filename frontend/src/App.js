import Navbar from "./components/Common/Navbar";
import Home from "./components/Common/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import SubmitEOD from "./components/Common/SubmitEOD";
import Register from "./components/Admin/Register";
import AdminDashboard from "./components/Admin/AdminDashboard"
import ListEODs from "./components/Admin/ListEODs";
import EODPanel from "./components/Manager/EODPanel";
import Account from "./components/Employee/Account";
import Employees from "./components/Common/Employees";
import './styles/phone.css'
import './styles/list.css'
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import logo from "./images/logo.png"
import ManagerDashboard from "./components/Manager/ManagerDashboard";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="text-center my-3" >
          <img src={logo} alt="cannot display logo" width="200px" height="70px" />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user/account" element={<Account />} />
          <Route exact path="/user/submitEOD" element={<SubmitEOD />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/employees-list" element={<Employees />} />
          <Route exact path="/admin/register" element={<Register />} />
          <Route exact path="/admin/eods-list" element={<ListEODs />} />
          <Route exact path="/manager/eod-panel" element={<EODPanel />} />
          <Route exact path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route exact path="/employee/dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;