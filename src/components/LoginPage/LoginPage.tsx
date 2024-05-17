import React, { useState, useEffect, useContext } from "react";

import Button from "../Button/Button";

import InputField from "../InputFields/InputFields";

import "./LoginPage.scss";

import AuthProvider, { AuthContext } from "../AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../services/api";
import { Org, User } from "../../services/endpoint";
import { setItemInStorage } from "../../utils/storageUtils";
// import { useNavigate } from "react-router-dom";

type User = {
  name: string;

  email: string;

  password: string;
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const { logIn, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const prevPath= useLocation().state?.from;

console.log(prevPath);

  useEffect(() => {
    // fetch("http://localhost:8000/users")
    //   .then((response) => response.json())

    //   .then((data) => setUsers(data))

    //   .catch((error) => console.error("Error fetching users:", error));


    // const fetchProfile = async () => {
    //   try {
    //     const response = await api.get('/profile');
    //     setUser(response.data);
    //   } catch (error) {
    //     // Handle error or redirect to login
    //   }
    // };

    // 



  }, []);

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleValidation = () => {

    setError(""); // Clear previous error messages
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address.");

      return false;
    }
    else if (!isPasswordValid) {
      setError(
        "Please enter a valid password."
        // " Password must have at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );

      return false;
    }
    else return true;
  }
  const handleLogin = () => {
    if (handleValidation()) {

      if(prevPath==='/orgLogin'){
        console.log(prevPath);
        postData(Org.login, { email: email, password: password })
        .then((response: any) => {
          console.log(response.data);
          setItemInStorage("token", JSON.stringify(response.data));
          setItemInStorage("refreshToken", JSON.stringify(response.data.refreshToken));
          logIn();
          console.log("wretyuiop");
          
          navigate('/');
        })
        .catch((error: any) => {
          console.error(error);
          // setOpenSnackbar(true); // Open the snackbar
          // setSnackbarSeverity("error");

        });
      }
      else{
        postData(User.login, { email: email, password: password })
        .then((response: any) => {
          console.log(response.data);
          setItemInStorage("token", JSON.stringify(response.data));
          setItemInStorage("refreshToken", JSON.stringify(response.data.refreshToken));
          logIn();
          console.log("wretyuiop");
          navigate('/');
        })
        .catch((error: any) => {
          console.error(error);
          alert(error.response.data);
          // setOpenSnackbar(true); // Open the snackbar
          // setSnackbarSeverity("error");

        });
      }
      
    } else return alert("unsuccessful");

  };

  const handleRegistrationClick = () => {
    navigate('/register');
  }

  return (
      <div className="login">
        <div className="container">
          <h2>Login Here!</h2>
          <div className="fields">

            {error && <p style={{ color: "red" }}>{error}</p>}
            <InputField
              label="User Email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={handlePasswordChange}
            />


          </div>
          <Button className="login-button" label="Login" onClick={handleLogin} />
          <div className="para">
            <p>Don't have an account?</p><p className="tag" onClick={handleRegistrationClick}>Register Here!</p><br></br>
            <p className="tag" onClick={() => { navigate("/") }}>-Back</p>
          </div>
        </div>
      </div>

  );
};

export default LoginPage;
