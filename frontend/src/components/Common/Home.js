import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const navigate = useNavigate(null);
    const [user, setUser] = useState({ "username": "", "password": "" })



    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = user;

        const response = await fetch('http://65.2.181.99:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })

        const json = await response.json();

        if (json.success) {

            localStorage.setItem('authToken', json.authToken);

            if (json.message === "admin verified") {

                localStorage.setItem('user', 'admin');
                navigate('/admin/dashboard');

            } else if (json.message === "employee verified") {

                localStorage.setItem('user', 'employee');
                navigate('/user/account');

            } else if (json.message === "reporting manager verified") {

                localStorage.setItem('user', 'manager');
                navigate('/manager/dashboard');
            
            }

        } else alert("Invalid credentials!");

        setUser({ "username": "", "password": "" });
    }



    return (
        <div className="container d-flex justify-content-center">
            <div className='card col-4 my-4'>
                <p className="card-header text-center">Login</p>
                <div className="card-body text-center">
                    <form className="form py-1 px-1" id="login-form" onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="username" className="form-label">
                                <strong>Username</strong>
                            </label>
                            <input type="text" className="form-control" id='username' name='username' value={user.username} onChange={onChange} required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="password" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input type="password" className="form-control" id='password' name='password' value={user.password} onChange={onChange} required />
                        </div>

                        <div className='form-group'>
                            <button type="submit" className="btn btn-success btn-sm my-3" >Submit</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Home;