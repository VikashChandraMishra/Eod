import { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table"



const EmployeeTable = ({ columns }) => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const response = await fetch('http://65.2.181.99:5000/api/common/fetch-employees', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })

            const json = await response.json();

            if (json.success) {

                setEmployees(json.employees);

            } else alert("Cannot fetch employees' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    const data = useMemo(() =>
        employees,
        [employees]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data
        },
        useSortBy
    )



    return (
        <div className="my-4 mx-4">
            <div className="my-2 row">
                <div className="col-2 form-group">
                    <label htmlFor="begin" className="form-label">Begin Date:</label>
                    <input type="date" className="form-control" id="begin" name="begin" />
                </div>
                <div className="col-2 form-group">
                    <label htmlFor="end" className="form-label">End Date:</label>
                    <input type="date" className="form-control" id="end" name="end" />
                </div>
            </div>
            <table {...getTableProps()} id="list">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeTable;