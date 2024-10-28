import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  localStorage.clear();
  
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); // State to track if input field is touched

  const handleEmailInput = (e) => {
    e.preventDefault();
    setEmailValue(e.target.value);
    setTouched(true); // Set touched to true when input value changes
  };

  const handlePassworInput = (e) => {
    e.preventDefault();
    setPasswordValue(e.target.value);
    setTouched(true); // Set touched to true when input value changes
  };

  useEffect(() => {
    const isValidEmail = emailValue.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    const isValidPhone = passwordValue.match(/^\d{10}$/);
    const isValidInput = isValidEmail || isValidPhone;

    setEmailValue(emailValue);
    setPasswordValue(passwordValue);
    setIsValid(isValidInput);
  }, [emailValue, passwordValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/login/send-otp", {
        user: emailValue,
      })
      .then((res) => {
        if (res?.status === 200 || res?.status === 201) {
          let data = res?.data;

          if (data?.userType === "phone") {
            alert("your otp is :" + data.otp);
          }
          navigate("/verify-otp");

          localStorage.setItem("user", data?.user);
        } else {
          alert("please refresh page");
        }
      })

      .catch((err) => {
        alert("please refresh the page ");
      });
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
          <form className="col-12 col-md-6 py-4 px-3">
            <h4 className="login-title text-center mb-4">
              Good to see you again !
            </h4>
            <div className="form-floating mb-4">
              <input
                type="email"
                className={`form-control ${
                  !isValid && touched ? "is-invalid" : ""
                }`}
                name="user"
                id="emailInput"
                placeholder="Enter email or phone number"
                value={emailValue}
                onChange={handleEmailInput}
                onBlur={() => setTouched(true)} // Set touched to true on blur event
              />
              <label>Email address or phone number</label>
              <p style={{ color: "red" }}>
                {!isValid && touched && (
                  <p style={{ color: "red" }}>
                    Enter valid email or phone number
                  </p>
                )}
              </p>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className={`form-control ${
                  !isValid && touched ? "is-invalid" : ""
                }`}
                name="user"
                id="passwordInput"
                placeholder="Enter password"
                value={passwordValue}
                onChange={handlePassworInput}
                onBlur={() => setTouched(true)} // Set touched to true on blur event
              />
              <label>Password</label>
              <p style={{ color: "red" }}>
                {!isValid && touched && (
                  <p style={{ color: "red" }}>Enter password</p>
                )}
              </p>
            </div>

            <div className="text=center">
              {" "}
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block py-3 rounded-3 w-100"
                onClick={handleSubmit}
                disabled={emailValue === "" || !isValid}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
