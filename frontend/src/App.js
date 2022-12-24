import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import SubmitEOD from "./components/SubmitEOD";
import Register from "./components/Admin/Register";
import ListManagers from "./components/Admin/ListManagers";
import ListEODs from "./components/Admin/ListEODs";
import ManagerDashboard from "./components/ManagerDashboard";
import Account from "./components/Account";
import Employees from "./components/Admin/Employees";
import './styles/phone.css'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/employee/account" element={<Account />} />
          <Route exact path="/employee/submitEOD" element={<SubmitEOD />} />
          <Route exact path="/admin/employees-list" element={<Employees />} />
          <Route exact path="/admin/register" element={<Register />} />
          <Route exact path="/admin/managers-list" element={<ListManagers />} />
          <Route exact path="/admin/eods-list" element={<ListEODs />} />
          <Route exact path="/manager/dashboard" element={<ManagerDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;