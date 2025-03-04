import {
  Typography,
  Button,
  makeStyles,
  Container,
  Box,
  MenuItem,
} from "@material-ui/core";
import { FiLogOut } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  return (
    <header
      // position="fixed"
      // class=" MuiPaper-root MuiAppBar-root MuiAppBar-positionFixed mui-fixed MuiPaper-elevation"
      // className="bg-slate-600"
      className="fixed inset-x-0 bg-white  z-30 mx-auto py-4  border border-gray-100   shadow  md:rounded-3xl  "
      style={{ top: "20px", width: "80%" }}
    >
      <Container maxWidth="lg">
        <div class="flex items-center justify-between ">
          <Typography
            // component="p"
            // variant="subtitle2"
            align="center"
            // sx={{ color: "text.secondary" }}
          >
            {/* <img style={height: 10px} src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"></img> */}
            <span className="text-bold text-xl font-bold text-blue-500">
              {" "}
              WORKO.
            </span>
          </Typography>
          {isAuth() ? (
            userType() === "recruiter" ? (
              <>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    px: 0,
                  }}
                  class="middle-side-of-navbar "
                >
                  <div
                    sx={{
                      display: { xs: "none", md: "flex", color: "#3b82f6 " },
                    }}
                    className="flex  items-center cursor-pointer font-semibold gap-4 py-2 px-3 text-whiterounded-lg md:bg-transparent md:text-blue-500 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  >
                    <span onClick={() => handleClick("/")}>Home</span>
                    <span
                      color="inherit"
                      onClick={() => handleClick("/addjob")}
                    >
                      Add Jobs
                    </span>
                    <span
                      color="inherit"
                      onClick={() => handleClick("/myjobs")}
                    >
                      My Jobs
                    </span>
                    <span
                      color="inherit"
                      onClick={() => handleClick("/employees")}
                    >
                      Employees
                    </span>
                    <span
                      color="inherit"
                      onClick={() => handleClick("/profile")}
                    >
                      Profile
                    </span>
                  </div>
                </Box>
                <div class="right-side-of-navbar">
                  <span
                    color="inherit"
                    className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded-full focus:outline-none"
                    onClick={() => handleClick("/logout")}
                  >
                    <FiLogOut />
                  </span>
                </div>
              </>
            ) : (
              <>
                <div
                  // class="middle-side-of-navbar"
                  className="flex gap-4 py-2 px-3 font-semibold cursor-pointer  text-blue-500 rounded-lg md:bg-transparent md:text-blue-500 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                >
                  <span
                    color="inherit"
                    outline="none"
                    onClick={() => handleClick("/")}
                  >
                    Home
                  </span>
                  <span color="inherit" onClick={() => handleClick("/home")}>
                    Job
                  </span>
                  <span
                    color="inherit"
                    onClick={() => handleClick("/applications")}
                  >
                    Applications
                  </span>
                  <span color="inherit" onClick={() => handleClick("/courses")}>
                    Courses
                  </span>
                  <span color="inherit" onClick={() => handleClick("/profile")}>
                    Profile
                  </span>
                </div>
                <div class="right-side-of-navbar">
                  <span
                    color="inherit"
                    className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded-full focus:outline-none"
                    onClick={() => handleClick("/logout")}
                  >
                    <FiLogOut />
                  </span>
                </div>
              </>
            )
          ) : (
            <>
              <div className="flex gap-4">
                <Button
                  // color="inherit"
                  class="rounded-full bg-white px-3 py-2 border border-gray-500 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-100 sm:inline-flex"
                  onClick={() => handleClick("/signup")}
                  // id="signupBtn"
                  // class="navbarBtn"
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  class="rounded-full bg-blue-500 px-4 py-2 border border-blue-500 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-100 hover:text-blue-500 sm:inline-flex"
                  onClick={() => handleClick("/login")}
                  // class="navbarBtn"
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
