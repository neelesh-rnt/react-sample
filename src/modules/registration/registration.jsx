import "./registration.css";
import CustomCard from "../../components/card/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {

  const navigate = useNavigate();
  localStorage.clear();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  // Basic validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (!formData.terms) newErrors.terms = "You must accept the terms";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log("Form Submitted", formData);
      // Submit form logic here
    }
  };

  return (
    <>
      <div className="row g-0 vh-100 justify-content-center align-items-center">
        <div className="col-10 row g-0 align-items-center bordered">
          <div className="d-none d-md-block col-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt=""
              className="img-fluid"
              style={{ maxHeight: "1000px", maxWidth: "100%" }}
            />
          </div>
          <CustomCard
            cardBody={
              <form onSubmit={handleSubmit} noValidate>
                {/* Name Input */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Gender Select */}
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    name="gender"
                    className={`form-select ${
                      errors.gender ? "is-invalid" : ""
                    }`}
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">{errors.gender}</div>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    name="terms"
                    className={`form-check-input ${
                      errors.terms ? "is-invalid" : ""
                    }`}
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Accept Terms and Conditions
                  </label>
                  {errors.terms && (
                    <div className="invalid-feedback">{errors.terms}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary float-right">
                  Submit
                </button>
              </form>
            }
          />
        </div>
      </div>
    </>
  );
}

export default Registration;
