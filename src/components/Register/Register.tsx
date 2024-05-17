import React, { useState } from "react";
import InputField from "./InputField";
import { ToastContainer, toast } from "react-toastify";
import { postData } from "../../services/api";
import { User } from "../../services/endpoint";
import { setItemInStorage } from "../../utils/storageUtils";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button/Button";
import "./Register.scss";
import { useNavigate } from "react-router-dom";


const RegistrationPage: React.FC = () => {
  const [name, setName] = useState("");
  // const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  // const [mobileError, setMobileError] = useState("");
  const [gender, setGender] = useState("");



  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };


  const naviagte = useNavigate();

  const handleLogin = () => {
    naviagte("/login");
  };

  const handleValidation = () => {
    if (!name || !email || !password || !confirmPassword || !mobile) {
      // naviagte('/');
      toast("Please fill all the mandatory fields.");
      return false;

    }

    const isEmailValid = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email);
    if (!isEmailValid) {
      toast("Please enter a valid email address.");
      return false;
    }

    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      password
    );
    if (!isPasswordValid) {
      toast("Please enter a valid password.");
      return false;
    }

    if (password !== confirmPassword) {
      toast("Passwords do not match.");
      return false;
    }

    const isMobileValid = /^[0-9]{10}$/.test(mobile);
    if (!isMobileValid) {
      toast("Please enter a valid mobile number.");
      return false;
    }
    return true;

  }
  const handleSignUp = () => {

    const data = {
      name: name,
      email: email,
      gender: gender,
      password: password,
      mobileNumber: mobile,

    };
    console.log(data);
    if (handleValidation()) {
      console.log(data);
      postData(User.signup, data)
        .then((response: any) => {
          console.log(response.data);
          // setItemInStorage("token", JSON.stringify(response.data.access_token));

          console.log("wretyuiop");
        })
        .catch((error: any) => {
          console.error(error);

          // setOpenSnackbar(true); // Open the snackbar
          // setSnackbarSeverity("error");

        });
    } else return alert("unsuccessful");


  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h1 className="register">Register</h1>
        <h3 className="personal-info">Personal Information</h3>

        <InputField
          label="Name"
          type="text"
          name="name"
          placeHolder="Enter Your Name"
          value={name}
          onChange={handleNameChange}
          mandatory={true}
        />

       
        <h4 >Gender</h4>
        <input type="radio" id="Male" name="gender" value="Male" onChange={handleGenderChange} />
        <label htmlFor="Male">Male</label><br />
        <input type="radio" id="Female" name="gender" value="Female" onChange={handleGenderChange}/>
        <label htmlFor="Female">Female</label><br />
        <input type="radio" id="Other" name="gender" value="Other" onChange={handleGenderChange}/>
        <label htmlFor="Other" >Other</label>

        <InputField
          label="Email"
          type="email"
          name="email"
          placeHolder="Enter Your Email"
          value={email}
          onChange={handleEmailChange}
          mandatory={true}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          placeHolder="Enter Your Password"
          value={password}
          onChange={handlePasswordChange}
          mandatory={true}
        // error={passwordError}
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeHolder="Confirm Your Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          mandatory={true}
        />

        <InputField
          label="Mobile No."
          type="text"
          name="mobile"
          placeHolder="Enter Your Mobile Number"
          value={mobile}
          onChange={handleMobileChange}
          mandatory={true}
        />


        {/* <h3 className="address-info">Address Information</h3>
 
        <InputField
          label="Street Address"
          type="text"
          name="street"
          placeHolder="Enter Your Street Address"
          value={street}
          onChange={handleStreetChange}
          mandatory={false}
          // error={error}
        />
 
        <InputField
          label="City"
          type="text"
          name="city"
          placeHolder="Enter Your City"
          value={city}
          onChange={handleCityChange}
          mandatory={false}
          // error={error}
        />
 
        <InputField
          label="Zip Code"
          type="text"
          name="zipCode"
          placeHolder="Enter Your Zip Code"
          value={zipCode}
          onChange={handleZipCodeChange}
          mandatory={false}
        />
  */}
        {/* <label className="input-label">State</label>
        <div className="select">
          <select
            name="state"
            value={selectedState}
            onChange={handleStateChange}
            placeholder="Enter Your State"
            required
          >
            <option value="">Select State</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
          </select>
        </div>
  */}
        {/* <label className="input-label">Country</label>
        <div className="select">
          <select
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Enter Your State"
            required
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
          </select>
        </div> */}
        <div className="btn-container">
          <Button
            className="register-btn"
            label="Register"
            onClick={handleSignUp}
          />
        </div>
        <div className="p">
          <p>Already have an account?</p>
          <p className="loginClick" onClick={handleLogin}>
            Login Here!
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegistrationPage;