import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();

    const logout = () => {
        localStorage.removeItem('authToken');
    }

    useEffect(() => {
    }, [location])

    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid row">
                    <button className="navbar-toggler col-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id='ham-burger-button' >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse col-2" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                localStorage.getItem('authToken') === 'admin' &&
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/admin/register' ? 'active' : ''}`} to="/admin/register">Register</Link>
                                </li>
                            }
                            {
                                localStorage.getItem('authToken') === 'admin' &&
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/admin/employees-list' ? 'active' : ''}`} to="/admin/employees-list">Employees</Link>
                                </li>
                            }
                            {
                                localStorage.getItem('authToken') === 'admin' &&
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/admin/managers-list' ? 'active' : ''}`} to="/admin/managers-list">Managers</Link>
                                </li>
                            }
                            {
                                localStorage.getItem('authToken') === 'admin' &&
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/admin/eods-list' ? 'active' : ''}`} to="/admin/eods-list">EODs</Link>
                                </li>
                            }
                            {
                                location.pathname !== '/' && location.pathname !== '/reset-password' && location.pathname !== '/register' && <li className="nav-item">
                                    <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
                                </li>
                            }
                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar;