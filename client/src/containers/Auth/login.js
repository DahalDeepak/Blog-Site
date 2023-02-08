import React, { useState, useContext } from "react";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { API } from "../../API/api";
import { DataContext } from "../../context/dataProvider";
import { useNavigate } from "react-router-dom";
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  background-color: rgb(226, 237, 209);
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.2);
`;
const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const SubmitButton = styled(Button)`
  text-transform: none;
  background: #11ff11;
  color: #fff;
  font-size: large;
  font-weight: 700;
  height: 48px;
  border-radius: 4px;
`;

const SwitchButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  font-size: large;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const loginInitialValues = {
  email: "",
  password: "",
};
const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};
const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");
  const { setAccount } = useContext(DataContext);

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const signupUser = async () => {
    let response = API.userSignup(signup);
    if (response.isSucess) {
      setSignup(signupInitialValues);
      toggleAccount("login");
      setError("");
    } else {
      // console.log(response.msg)
      setError("something went wrong");
    }
  };
  const loginUser = async () => {
    let response = await API.userLogin(login);
    // console.log(response)

    if (response.isSuccess) {
      // console.log("add")
      setError("");
      sessionStorage.setItem(
        "acessToken",
        `Bearer ${response.data.acessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        email: response.data.email,
      });
      console.log("sucess");
      setIsAuth(true);
      navigate("/");
    } else {
      setIsAuth(false);
      console.log(response.message);
      setError("sth went wrong while login");
    }
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="logo" />
        {error}
        {account === "login" ? (
          <Wrapper>
            <TextField
              value={login.email}
              variant="standard"
              onChange={(e) => onValueChange(e)}
              name="email"
              label="Enter Email"
            />

            <TextField
              value={login.password}
              variant="standard"
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />
            <SubmitButton variant="contained" onClick={() => loginUser()}>
              Login
            </SubmitButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SwitchButton onClick={() => toggleSignup()}>
              Create an account
            </SwitchButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter your name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="email"
              label="Enter Email"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <SubmitButton variant="contained" onClick={() => signupUser()}>
              Sign Up
            </SubmitButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SwitchButton onClick={() => toggleSignup()}>
              Already have an account
            </SwitchButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
