import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const SubmitEOD = () => {

    const navigate = useNavigate(null);
    const [task, setTask] = useState("");

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmation = window.prompt("Are you sure you want to submit, you will not be able to edit it later? Yes/No");

        if (!(confirmation.toUpperCase() === "YES")) return;
        const response = await fetch('http://65.2.181.99:5000/api/common/submit-eod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: JSON.stringify({ task })
        })

        const json = await response.json();

        if (json.success) {

            navigate('/user/account');

        } else if (!json.success) {

            alert(json.message);
            navigate('/user/account');


        } else {

            alert("Invalid Entry!");
        
        }

        setTask("");

    }

    const onChange = (e) => {
        setTask(e.target.value);
    }


    return (
        <div className="container">
            <div className='card my-4'>
                <p className="card-header text-center">Submit EOD</p>
                <div className="card-body text-center">
                    <form className="form py-1 px-1" id="login-form" onSubmit={handleSubmit}>
                        <div className="row py-2 d-flex justify-content-between" id='eod-submit-form-row'>
                            <div className='col-9 form-group'>
                                <label htmlFor="task" className="form-label">
                                    <strong>Task</strong>
                                </label>
                                <input type="text" className="form-control" id='eod-task-input' name='task' value={task} onChange={onChange} required />
                            </div>
                            <div className='col-2 form-group'>
                                <button type="submit" className="btn btn-success" id="eod-submit-btn" style={{ marginTop: '30px', width: '150px' }} >Submit</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default SubmitEOD;