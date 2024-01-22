import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  List,
  ListItem,
} from "@material-ui/core";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
  
}));

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
    companyName: "",
    emailID: "",

  });

  const [phone, setPhone] = useState("");

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfileDetails(response.data);
        setPhone(response.data.contactNumber);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const handleUpdate = () => {
    let updatedDetails = {
      ...profileDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...profileDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...profileDetails,
        contactNumber: "",
      };
    }

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  // For Testing Purpose
   const companyName = "companyName";
   const startDate = "11/11/2022";
   const endDate = "30/12/2023";
   const jobTitle = "Frontend Developer";
   const department = "Designer Department";
   let firstName = profileDetails.name;
   let lastName = "Shaikh";
   let emailAddress = "junaid@gmail.com";
   let phoneNo = 9859438294;
   let profileLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png";
  return (
    
    <>
      <Grid
        container
        className="mainGridContainer"
      >
       
        <Grid  style={{ width: "100%", padding: "10px 100px" }}>
          <Paper className="w-full ">
            <Grid className="flex flex-cols bg-slate-400 py-10 dssss">
              
              <div className="w-20 flex justify-items-center mr-5">
                <img className="w-12/12 h-6/12 rounded-full" src={profileLink}>
                </img>
              </div>
              <div className="flex flex-col" >
                <h1 className="cardTitle">{profileDetails.name}</h1>
                <h3 className="cardSubTitle">{companyName}</h3>
              </div>
            </Grid>
             <Grid className="w-full bg-white py-5 px-10 rounded-lg">

              <Grid className="personalSection"> 
                <Typography> Personal Information </Typography>
                <div className="flex my-5 ">  
                <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList">Full Name</Typography> <Typography className="profileSectionUserDetail">{profileDetails.name}</Typography></Grid> 
                {/* <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList"></Typography> <Typography className="profileSectionUserDetail">{lastName}</Typography></Grid>  */}
                <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList">Email Address</Typography> <Typography className="profileSectionUserDetail">{profileDetails.emailID}</Typography></Grid> 
                <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList">Phone</Typography> <Typography className="profileSectionUserDetail">{profileDetails.contactNumber}</Typography></Grid> 
                </div>
              </Grid>
              <Grid className="personalSection"> 
                <Typography> Employment Details </Typography>
                <div className="flex my-5">  
                <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList">Job Title</Typography> <Typography className="profileSectionUserDetail">{jobTitle}</Typography></Grid> 
                <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList">Department</Typography> <Typography className="profileSectionUserDetail">{department}</Typography></Grid> 
                <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList">Start Date</Typography> <Typography className="profileSectionUserDetail">{startDate}</Typography></Grid> 
                <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList">End Date</Typography> <Typography className="profileSectionUserDetail">{endDate}</Typography></Grid> 
                <Grid xs className="flex flex-col mr-10"> <Typography className="profileSectionHeaderList">Employment Status</Typography> <Typography className="profileSectionUserDetail"><span className="profileSectionUserDetail bg-green-200 p-1 text-green-600 rounded-lg">Active</span></Typography></Grid> 
                </div>
              </Grid>
             </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
