import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitEOD = () => {

    const navigate = useNavigate(null);

    const [eod, setEod] = useState({ "date": "", "task": "" })

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmation = window.prompt("Are you sure you want to submit?Yes/No");

        if (!(confirmation.toUpperCase() === "YES")) return;

        const { date, task } = eod;
        const response = await fetch('http://43.205.206.201:5000/api/employee/submit-eod', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },

            body: JSON.stringify({ date, task })
        })

        const json = await response.json();

        if (json.success) {
            navigate('/');
        } else
            alert("Invalid Entry!");

        setEod({ "date": "", "task": "" });
    }

    const onChange = (e) => {
        setEod({ ...eod, [e.target.name]: e.target.value });
    }


    return (
        <div className="container">
            <div className='card my-4'>
                <p className="card-header text-center">Submit EOD</p>
                <div className="card-body text-center">
                    <form className="form py-1 px-1" id="login-form" onSubmit={handleSubmit}>
                        <div className="row py-2 d-flex justify-content-between">
                            <div className='col-2 form-group'>
                                <label htmlFor="date" className="form-label">
                                    <strong>Date</strong>
                                </label>
                                <input type="date" className="form-control" id='date' name='date' value={eod.date} onChange={onChange} required />
                            </div>

                            <div className='col-7 form-group'>
                                <label htmlFor="task" className="form-label">
                                    <strong>Task</strong>
                                </label>
                                <input type="text" className="form-control" id='task' name='task' value={eod.task} onChange={onChange} required />
                            </div>
                            <div className='col-2 form-group'>
                                <button type="submit" className="btn btn-success" style={{marginTop: "30px", width: "150px"}} >Submit</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default SubmitEOD;