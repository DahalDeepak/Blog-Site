import "./App.css";
import Login from "./containers/Auth/login";
import Home from "./containers/Home/home";

import Header from "./component/Header/header";
import { useState } from "react";
import {
  BrowserRouter, 
  Switch,
  Route,
  Link,

  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateRoute = ({ isAuth, ...props }) => {
  return isAuth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuth, setIsAuth] = useState(false);
  // console.log(isAuth)
  return (
    <BrowserRouter>
      <div style={{ marginTop: "64px" }}>
        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

          <Route path="/" element={<PrivateRoute isAuth={isAuth} />}>
            {/* <Route path="/" element={<Header />} /> */}
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
