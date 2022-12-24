import { useState } from 'react';

const Register = () => {

    const [user, setUser] = useState({
        "username": "",
        "password": "",
        "name": "",
        "mobile": 0,
        "email": "",
        "gender": "",
        "empID": 0,
        "designation": "",
        "reportingManager": 0
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

        const response = await fetch('http://65.2.38.47:5000/api/admin/registration', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(body)
        })

        const json = await response.json();

        if (json.success) {

            alert("User successfully registered.");

        }
        else alert(json.message);

        setUser({
            "username": "",
            "password": "",
            "name": "",
            "mobile": 0,
            "email": "",
            "gender": "",
            "empID": 0,
            "designation": "",
            "reportingManager": 0
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
                                    <label htmlFor="empID">Employee ID</label>
                                    <input className="form-control" type="number" id="empID" name="empID" value={user.empID} onChange={onChange} required />
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
                                    <label htmlFor="reportingManager">Reporting Manager ID (if employee is selected)</label>
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