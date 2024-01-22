import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
} from "@material-ui/core";
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
        <AppBar position="fixed"  class=" MuiPaper-root MuiAppBar-root MuiAppBar-positionFixed mui-fixed MuiPaper-elevation">
            <Toolbar id="navigation-bar">
                <Typography id="logoInNavbar" variant="h6" className={classes.title}>
                {/* <img style={height: 10px} src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"></img> */}
                WORKO.
                </Typography>
                {isAuth() ? (
                    userType() === "recruiter" ? (
                        <> 
                        <div class="middle-side-of-navbar">
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/home")}
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/addjob")}
                            >
                                Add Jobs
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/myjobs")}
                            >
                                My Jobs
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/employees")}
                            >
                                Employees
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/profile")}
                            >
                                Profile
                            </Button>
                            </div>
                            <div class="right-side-of-navbar">
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/logout")}
                            >
                                Logout
                            </Button>
                            </div>
                        </>
                    ) : (
                        <>
                        <div class="middle-side-of-navbar">
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/Welcome")}
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/home")}
                            >
                                Job
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/applications")}
                            >
                                Applications
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/profile")}
                            >
                                Profile
                            </Button>
                            </div>
                            <div class="right-side-of-navbar">
                            <Button
                                color="inherit"
                                onClick={() => handleClick("/logout")}
                            >
                                Logout
                            </Button>
                            </div>
                        </>
                    )
                ) : (
                    <>
                    <div class="right-side-of-navbar">
                    
                        <Button
                            color="inherit"
                            onClick={() => handleClick("/login")}
                            class="navbarBtn"
                        >
                            Login
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => handleClick("/signup")}
                            id="signupBtn"
                            class="navbarBtn"
                        >
                            Register
                        </Button>
                        </div>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
