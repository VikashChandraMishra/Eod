import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Profile = () => {

    const [user, setUser] = useState({ "name": "", "reportingManager": "" });
    const navigate = useNavigate(null);

    useEffect(() => {

        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {
            const response = await fetch('http://65.2.181.99:5000/api/employee/fetch-profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })

            const json = await response.json();

            if (json.success) {

                setUser({ "name": json.user.name, "reportingManager": json.user.reportingManager });

            }
            else alert("Cannot fetch user data at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])



    return (
        <div className="container py-4">
            <h5><strong>Employee Name: {user.name}</strong></h5>
            <h5><strong>Reporting Manager: {user.reportingManager}</strong></h5>
        </div>
    )
}

export default Profile;