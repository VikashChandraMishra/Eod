import React, { useState } from "react"
import { useSortBy, useTable } from "react-table"



const List = ({ columns, data }) => {

    const [toFilterBy, setToFilterBy] = useState("month");

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

    const toggleFilter = (e) => {
        setToFilterBy(e.target.value);
    }


    return (
        <div className="py-4 px-4">
            <div className="my-2 row">
                <div className="col-3 form-group">
                    <label htmlFor="radio" className="form-label">Filter By:</label>
                    <input type="radio" className="mx-2" id="date" name="radio" onChange={toggleFilter} value="date" />Date
                    <input type="radio" className="mx-2" id="month" name="radio" onChange={toggleFilter} value="month" />Month
                </div>
                {
                    toFilterBy === "date" &&
                    <div className="col-2 form-group">
                        <label htmlFor="begin" className="form-label">Begin Date:</label>
                        <input type="date" className="form-control" id="begin" name="begin" />
                    </div>
                }
                {
                    toFilterBy === "date" &&
                    <div className="col-2 form-group">
                        <label htmlFor="end" className="form-label">End Date:</label>
                        <input type="date" className="form-control" id="end" name="end" />
                    </div>
                }
                {
                    toFilterBy === "month" &&
                    <div className="col-2 form-group">
                        <label htmlFor="month" className="form-label">Month:</label>
                        <select type="text" className="form-control" id="month" name="month" >
                            <option> -- select an option -- </option>
                            <option value="current month">This Month</option>
                            <option value="last month">Last Month</option>
                        </select>
                    </div>
                }
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

export default List;