import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EmployeeCreate.css";

const EmployeeCreate = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: [],
    imgUpload: null,
  });
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("mobileNo", employee.mobileNo);
      formData.append("designation", employee.designation);
      formData.append("gender", employee.gender);
      formData.append("course", JSON.stringify(employee.course));
      if (employee.imgUpload) formData.append("imgUpload", employee.imgUpload);

      await axios.post(`http://localhost:2002/employee/emp`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Employee created successfully!");
      navigate("/employee-list"); // Redirect to Employee List page
    } catch (err) {
      console.error("Error creating employee:", err);
      setError("Failed to create employee. Please try again.");
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputNoChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, mobileNo: parseInt(value, 10) }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setEmployee((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle course checkbox changes
  const handleCourseChange = (course) => {
    setEmployee((prev) => ({
      ...prev,
      course: prev.course.includes(course)
        ? prev.course.filter((c) => c !== course) // Remove if already selected
        : [...prev.course, course], // Add if not selected
    }));
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      <nav>
        <Link to="/dashboard"> Home </Link>
        <Link to="/employee-list"> Employee List </Link>
        {/*<Link to="/employee-create"> Employee Create </Link>*/}
        <span>Hukum Gupta</span>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="employee-edit">
        <h1>Create Employee</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Mobile:</label>
            <input
              type="text"
              name="mobileNo"
              value={employee.mobileNo}
              onChange={handleInputNoChange}
              required
            />
          </div>
          <div>
            <label>Designation:</label>
            <select
              name="designation"
              value={employee.designation}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
          <div>
            <label>Course:</label>
            <label>
              <input
                type="checkbox"
                value="MCA"
                onChange={() => handleCourseChange("MCA")}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BCA"
                onChange={() => handleCourseChange("BCA")}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BSC"
                onChange={() => handleCourseChange("BSC")}
              />
              BSC
            </label>
          </div>
          <div>
            <label>Image Upload:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept=".jpg,.png"
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default EmployeeCreate;
