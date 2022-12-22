import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate(null);

    const [user, setUser] = useState({
        "username": "",
        "password": "",
        "name": "",
        "mobile": 0,
        "email": "",
        "gender": "",
        "dob": "",
        "designation": "",
        "reportingManager": ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = document.getElementById('error');
        const body = user;
        const mobile = body.mobile;

        if (mobile >= 10000000000 || mobile <= 6000000000) {
            error.innerHTML = 'Invalid mobile number';
            return;
        }

        const response = await fetch('http://127.0.0.1:5000/api/admin/registration', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(body)
        })

        const json = await response.json();

        if (json.success) {

            const confirmation = window.prompt("User registered. Do you wish to continue?Yes/No");
            if (confirmation.toUpperCase() === "YES") {

                setUser({
                    "username": "",
                    "password": "",
                    "name": "",
                    "mobile": 0,
                    "email": "",
                    "gender": "",
                    "dob": "",
                    "designation": "",
                    "reportingManager": ""
                });

                return;

            }

            navigate('/admin/dashboard');

        }
        else alert(json.message);

        setUser({
            "username": "",
            "password": "",
            "name": "",
            "mobile": 0,
            "email": "",
            "gender": "",
            "dob": "",
            "designation": "",
            "reportingManager": ""
        });
    }


    const onChange = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value });

    }


    return (
        <div>
            <div className="container text-center my-4">
                <div className="card mx-auto" id='register-card'>
                    <p className="card-header">User Registration</p>
                    <div className="card-body">
                        <form className="form py-1 px-1" id="register-form" onSubmit={handleSubmit}>
                            <div className="row py-2">
                                <div className="col form-group">
                                    <label htmlFor="username">Username</label>
                                    <input className="form-control" type="text" id="username" name="username" value={user.username} onChange={onChange} required />
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="password">Password</label>
                                    <input className="form-control" maxLength="100" type="password" id="password" name="password" value={user.password} onChange={onChange} required />
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="name">Name</label>
                                    <input className="form-control" maxLength="30" type="text" id="name" name="name" style={{ textTransform: 'uppercase' }} value={user.name} onChange={onChange} required />
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col form-group"><label htmlFor="gender">Gender</label>
                                    <select className="form-control" type="text" id="gender" name="gender" value={user.gender} onChange={onChange} required >
                                        <option> -- select an option -- </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input className="form-control" type="number" id="mobile" name="mobile" value={user.mobile} onChange={onChange} required />
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control" maxLength="100" type="email" id="email" name="email" value={user.email} onChange={onChange} required />
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col form-group">
                                    <label htmlFor="dob">DOB</label>
                                    <input className="form-control" type="date" id="dob" name="dob" value={user.dob} onChange={onChange} required />
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="designation">Designation</label>
                                    <select className="form-control" type="text" id="designation" name="designation" value={user.designation} onChange={onChange} required >
                                        <option> -- select an option -- </option>
                                        <option value="employee">Employee</option>
                                        <option value="reporting manager">Reporting Manager</option>
                                    </select>
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="reportingManager">Reporting Manager Username</label>
                                    <input className="form-control" type="text" id="reportingManager" name="reportingManager" value={user.reportingManager} onChange={onChange} />
                                </div>
                            </div>

                            <div className="col">
                                <button className="btn btn-success btn-sm my-1" type="submit">Submit</button>
                            </div>
                            <span id="error" style={{ color: 'red' }}></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;