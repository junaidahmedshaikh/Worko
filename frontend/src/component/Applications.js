import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  // IconButton,
  // InputAdornment,
  makeStyles,
  Paper,
  // TextField,
  Typography,
  Modal,
  // Slider,
  // FormControlLabel,
  // FormGroup,
  // MenuItem,
  // Checkbox,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px auto",
    boxSizing: "border-box",
    width: "80%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  console.log("🚀 ~ ApplicationTile ~ application:", application);
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(application.job.rating);

  const appliedOn = new Date(application.dateOfApplication);
  const joinedOn = new Date(application.dateOfJoining);

  const fetchRating = () => {
    axios
      .get(`${apiList.rating}?id=${application.job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRating(response.data.rating);
        console.log(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, jobId: application.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        fetchRating();
        setOpen(false);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        fetchRating();
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid class=" px-5 py-5 w-3/4" className={classes.jobTileOuter}>
      {/* <Grid class="job-card-container" className="flex flex-col">
        <Grid direction="column">
          <Grid item>
            <h2 className="flex text-2xl font-semibold text-gray-800 ">
              {application.job.title}
            </h2>
            <span className="flex text-sm font-semibold text-gray-700 ">
              {" "}
              {"Company Name"}{" "}
            </span>
          </Grid>

          <hr className="my-4" />

          <Grid
            // class="cardSubTitle"
            className="flex text-sm font-semibold text-gray-600 gap-4"
          >
            <span item>Posted By: {application.recruiter.name}</span>
            <span item>Role : {application.job.jobType}</span>
            <span item>
              Salary : &#8377; {application.job.salary} per month
            </span>
          </Grid>

          <Grid
            // class="cardSubTitle"
            className="flex text-sm font-semibold text-gray-600 gap-4"
          >
            <span>
              Duration :{" "}
              {application.job.duration !== 0
                ? `${application.job.duration} month`
                : `Flexible`}{" "}
            </span>
            <span> Applied On: {appliedOn.toLocaleDateString()}</span>
          </Grid>
          <Grid item>
            {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>

          {application.status === "accepted" ||
          application.status === "finished" ? (
            <Grid item>Joined On: {joinedOn.toLocaleDateString()}</Grid>
          ) : null}
        </Grid>
        <Grid item container direction="column" class="w-full" xs={3}>
          <Grid item class="flex my-4 py-2 w-auto">
            <span className="bg-blue-600 text-white font-semibold rounded-md py-3 px-4">
              Status: {application.status.toUpperCase()}
            </span>
          </Grid>

         
        </Grid>
      </Grid> */}
      <div
        style={{
          boxShadow: "0 3px 10px rgb(0,0,0,0.2)",
        }}
        className="max-w-lg w-full  text-white rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex flex-col space-y-4">
          {/* Job Title and Company */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-600">
              {" "}
              {application.job.title}
            </h2>
            <p className="text-lg font-medium text-gray-600">
              {" "}
              {application.job.companyName || "Company Name"}
            </p>
          </div>

          {/* Posted By and Role */}
          <div className="flex justify-between text-sm text-gray-600">
            <p>Posted By: {application.recruiter.name}</p>
            <p>Role: {application.job.jobType}</p>
          </div>

          {/* Salary and Duration */}
          <div className="flex justify-between text-sm text-gray-600">
            <p>Salary: ₹ {application.job.salary} per month</p>
            <p>
              Duration:{" "}
              {application.job.duration !== 0
                ? `${application.job.duration} month`
                : `Flexible`}{" "}
            </p>
          </div>

          {/* Applied On and Joined On */}
          <div className="flex justify-between text-sm text-gray-600">
            <p>Applied On: {appliedOn.toLocaleDateString()}</p>
            <p>Joined On: 2/2/2025</p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </div>

          {/* Status */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">Status: </span>
            <span className="bg-green-500 px-4 py-2 text-sm font-semibold rounded-lg">
              {application.status.toUpperCase()}
            </span>
          </div>
          <>
            {application.status === "accepted" ||
            application.status === "finished" ? (
              <span item>
                <Button
                  style={{ background: "#3b82f6", color: "white" }}
                  className=" px-4 py-2 text-sm font-semibold rounded-lg"
                  onClick={() => {
                    fetchRating();
                    setOpen(true);
                  }}
                >
                  Rate Job
                </Button>
              </span>
            ) : null}
          </>
        </div>
      </div>

      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Rating
            name="simple-controlled"
            style={{ marginBottom: "30px" }}
            value={rating === -1 ? null : rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Button
            variant="contained"
            class="primaryButton"
            style={{ padding: "10px 50px" }}
            onClick={() => changeRating()}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Grid>
  );
};

const Applications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      style={{ minHeight: "90vh" }}
    >
      <div className="flex flex-col w-full  my-10 align-start items-start">
        <h2 className="text-4xl font-semibold text-gray-800">Applications </h2>
        <span className="text-gray-600">
          Track all the jobs you've applied for in one place.
        </span>
      </div>
      <Grid
        // justify="center"
        className="flex flex-wrap rounded-2xl w-full bg-white  p-4 "
      >
        {applications.length > 0 ? (
          applications.map((obj) => (
            <>
              <ApplicationTile application={obj} />
            </>
          ))
        ) : (
          <>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No Applications Found
            </Typography>
            <div></div>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Applications;
