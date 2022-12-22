import { Link } from 'react-router-dom';
import '../../styles/sidebar.css'

const Sidebar = () => {
    return (
        <div id="sidebar">
            <div style={{height: '50px'}}></div>
            <h3 className="text-center py-4">Admin Menu</h3>
            <div className="my-4">
                <Link to="/admin/register">
                    <div className="py-2 px-2 my-2 option">Register Users</div>
                </Link>
                <Link to="/admin/employees-list">
                    <div className="py-2 px-2 my-2 option">List Employees</div>
                </Link>
                <Link to="/admin/managers-list">
                    <div className="py-2 px-2 my-2 option">List Reporting Managers</div>
                </Link>
                <Link to="/admin/eods-list">
                    <div className="py-2 px-2 my-2 option">List EODs</div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;