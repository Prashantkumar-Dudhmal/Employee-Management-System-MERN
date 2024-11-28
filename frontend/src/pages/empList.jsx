import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./emplist.css";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  // Fetch employee data from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:2002/employee/emplist");
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data); // Initially set filtered employees to all employees
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle search filter
  useEffect(() => {
    const filtered = employees.filter((employee) =>
      Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  // Handle sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredEmployees].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredEmployees(sorted);
  };
  const handleLogout = () => {
    window.location.href = "/";
  };
  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:2002/employee/empdel/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id)
        );
        alert("Employee deleted successfully.");
      } else {
        alert("Error deleting employee.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <>
      <nav>
        <Link to="/dashboard"> Home </Link>
        {/*<Link to="/employee-list"> Employee List </Link>*/}
        <Link to="/employee-create"> Employee Create </Link>
        <span>Hukum Gupta</span>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="employee-list">
        <h1>Employee List</h1>
        {/* Search Filter */}
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Employee Table */}
        <table border="1">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID</th>
              <th>Image</th>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("email")}>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th onClick={() => handleSort("createdAt")}>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  <img
                    src={employee.imgUpload}
                    alt="Employee"
                    width="50"
                    height="50"
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{new Date(employee.createdAt).toLocaleString()}</td>
                <td className="action-buttons">
                  <button
                    onClick={() =>
                      (window.location.href = `/employee-edit/${employee._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
