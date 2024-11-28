import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  // Fetch employee data by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2002/employee/emp/${id}`
        );
        setEmployee(response.data);
      } catch (err) {
        console.error("Error fetching employee data:", err);
        setError("Failed to load employee data. Please try again.");
      }
    };

    fetchEmployee();
  }, [id]);
  const handleLogout = () => {
    window.location.href = "/";
  };
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

      await axios.put(`http://localhost:2002/employee/emp/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Employee updated successfully!");
      navigate("/employee-list"); // Redirect to Employee List page
    } catch (err) {
      console.error("Error updating employee:", err);
      setError("Failed to update employee. Please try again.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
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
        ? prev.course.filter((c) => c !== course)
        : [...prev.course, course],
    }));
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      <nav>
        <Link to="/dashboard"> Home </Link>
        <Link to="/employee-create"> Employee Create </Link>
        <span>Hukum Gupta</span>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="employee-edit">
        <h1>Edit Employee</h1>
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
              type="number"
              name="mobileNo"
              value={employee.mobileNo}
              onChange={handleInputChange}
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
                value="M"
                checked={employee.gender === "Male"}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={employee.gender === "Female"}
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
                checked={employee.course.includes("MCA")}
                onChange={() => handleCourseChange("MCA")}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BCA"
                checked={employee.course.includes("BCA")}
                onChange={() => handleCourseChange("BCA")}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BSC"
                checked={employee.course.includes("BSC")}
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
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default EmployeeEdit;
