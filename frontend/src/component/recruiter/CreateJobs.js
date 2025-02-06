import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import axios from "axios";
import ChipInput from "material-ui-chip-input";

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";
import { BorderAll } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "&:hover": {
        borderColor: "green", // Change border color on hover
      },
    },
    "& .MuiInputLabel-root": {
      "&:hover": {
        color: "red", // Change label color on hover
      },
    },
  },
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
  label: {
    color: "#374151",
    fontWeight: 600,
    marginTop: "0.5rem" /* 8px */,
    marginBottom: "0.5rem" /* 8px */,
    fontSize: "1rem" /* 16px */,
    lineHeight: "1.5rem" /* 24px */,
  },
  inputBox: {
    outline: "none",
    borderRadius: "20px",
    // "&:input:hover": {
    //   background: "green",
    // },
    // "&:focus": {
    //   background: "red",
    // },
    // boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
  },
}));

const CreateJobs = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
    roll: "",
    address: "",
    companyName: "",
    jobDescription: {
      description: "",
      requirements: [],
      technicalKnowledge: "",
    },
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    console.log(jobDetails);
    axios
      .post(apiList.jobs, jobDetails, {
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
        setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });
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

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        className="bg-slate-900"
        style={{ padding: "auto", minHeight: "90vh" }}
      >
        <Grid className="flex flex-col w-full my-10 align-start items-start">
          <h2 className="text-4xl font-semibold text-gray-800">
            Unlock Opportunities: Post Jobs Today!
          </h2>
          <h4 className="text-gray-600">Create Job</h4>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item className="w-full p-4 bg-white">
            <Paper
              style={{
                background: "white",
                padding: "20px",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <Grid
                style={{
                  width: "100%",
                  padding: "20px",
                  outline: "none",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "40px",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  className="gap-4"
                  spacing={3}
                >
                  {/* Job Title */}
                  <Grid item>
                    <h3 className={classes.label}> Job Title</h3>
                    <TextField
                      // className="focus:outline-none focus:border-none"
                      className={classes.inputBox}
                      id="outlined-basic"
                      // label="Title"
                      hiddenLabel
                      placeholder="Software Engineer..."
                      variant="standard"
                      value={jobDetails.title}
                      onChange={(event) =>
                        handleInput("title", event.target.value)
                      }
                      fullWidth
                    />
                  </Grid>
                  {/* Skill */}
                  <Grid item>
                    <h3 className={classes.label}> Skills</h3>
                    <ChipInput
                      className={classes.inputBox}
                      placeholder="React.js, TailwindCSS..."
                      // variant="outlined"
                      helperText="Press enter to add skills"
                      value={jobDetails.skillsets}
                      onAdd={(chip) =>
                        setJobDetails({
                          ...jobDetails,
                          skillsets: [...jobDetails.skillsets, chip],
                        })
                      }
                      onDelete={(chip, index) => {
                        let skillsets = jobDetails.skillsets;
                        skillsets.splice(index, 1);
                        setJobDetails({
                          ...jobDetails,
                          skillsets: skillsets,
                        });
                      }}
                      fullWidth
                    />
                  </Grid>
                  {/* Salary */}
                  <Grid item>
                    <h3 className={classes.label}> Salary</h3>
                    <TextField
                      type="number"
                      className={classes.inputBox}
                      variant="standard"
                      placeholder="1,00,000"
                      value={jobDetails.salary}
                      onChange={(event) => {
                        handleInput("salary", event.target.value);
                      }}
                      InputProps={{ inputProps: { min: 0 } }}
                      fullWidth
                    />
                  </Grid>

                  {/* Job Requirements */}
                  <Grid item>
                    <h3 className={classes.label}> Job Requirements</h3>

                    <ChipInput
                      className={classes.inputBox}
                      placeholder=""
                      variant="outlined"
                      helperText="Press enter to add skills"
                      value={jobDetails.requirements}
                      onAdd={(chip) =>
                        setJobDetails({
                          ...jobDetails,
                          requirements: [...jobDetails.requirements, chip],
                        })
                      }
                      onDelete={(chip, index) => {
                        let requirements = jobDetails.requirements;
                        requirements.splice(index, 1);
                        setJobDetails({
                          ...jobDetails,
                          requirements: requirements,
                        });
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  className="gap-4"
                  spacing={3}
                >
                  {/* Company Name */}
                  <Grid item>
                    <h3 className={classes.label}> Company Name</h3>
                    <TextField
                      className={classes.inputBox}
                      placeholder="Google"
                      value={jobDetails.companyName}
                      onChange={(event) =>
                        handleInput("companyName", event.target.value)
                      }
                      variant="standard"
                      fullWidth
                    />{" "}
                  </Grid>
                  {/* Address */}
                  <Grid item>
                    <h3 className={classes.label}> Address</h3>

                    <TextField
                      className={classes.inputBox}
                      label="Mumbai, India"
                      value={jobDetails.address}
                      onChange={(event) =>
                        handleInput("address", event.target.value)
                      }
                      variant="standard"
                      fullWidth
                      placeholder="City, State, Country"
                    />
                  </Grid>
                  {/* Job Type & Duration Container */}
                  <Grid
                    item
                    style={{
                      display: "grid",
                      // flexDirection: "row",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    {/* Job Type Input */}
                    <Grid item>
                      <h3 className={classes.label}> Job Type</h3>

                      <TextField
                        select
                        variant="standard"
                        value={jobDetails.jobType}
                        onChange={(event) => {
                          handleInput("jobType", event.target.value);
                        }}
                        fullWidth
                      >
                        <MenuItem value="Full Time">Full Time</MenuItem>
                        <MenuItem value="Part Time">Part Time</MenuItem>
                        <MenuItem value="Work From Home">
                          Work From Home
                        </MenuItem>
                      </TextField>
                    </Grid>
                    {/* Job Duration */}
                    <Grid item>
                      <h3 className={classes.label}> Duration</h3>

                      <TextField
                        style={{ marginLeft: ".5rem" }}
                        select
                        variant="standard"
                        value={jobDetails.duration}
                        onChange={(event) => {
                          handleInput("duration", event.target.value);
                        }}
                        fullWidth
                      >
                        <MenuItem value={0}>Flexible</MenuItem>
                        <MenuItem value={1}>1 Month</MenuItem>
                        <MenuItem value={2}>2 Months</MenuItem>
                        <MenuItem value={3}>3 Months</MenuItem>
                        <MenuItem value={4}>4 Months</MenuItem>
                        <MenuItem value={5}>5 Months</MenuItem>
                        <MenuItem value={6}>6 Months</MenuItem>
                      </TextField>
                    </Grid>
                    {/* Application Deadline */}
                    {/* <Grid item>
                      <h3 className={classes.label}> Application Deadline</h3>

                      <TextField
                        type="datetime-local"
                        className={classes.textField}
                        value={jobDetails.deadline}
                        onChange={(event) => {
                          handleInput("deadline", event.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        fullWidth
                      />
                    </Grid> */}
                  </Grid>
                  {/* Positions Available & Maximum Number Of Applicants Container*/}
                  <Grid
                    item
                    style={{
                      display: "grid",
                      // flexDirection: "row",
                      gap: "5px",
                      gridTemplateColumns: "1fr 1fr 1fr",
                    }}
                  >
                    <Grid item>
                      <h3 className={classes.label}> Positions</h3>
                      <TextField
                        type="number"
                        variant="standard"
                        value={jobDetails.maxPositions}
                        onChange={(event) => {
                          handleInput("maxPositions", event.target.value);
                        }}
                        InputProps={{ inputProps: { min: 1 } }}
                        fullWidth
                      />
                    </Grid>

                    <Grid item>
                      <h3 className={classes.label}> Max Applicants</h3>
                      <TextField
                        // className={classes.label}

                        // label="Maximum Number Of Applicants"
                        type="number"
                        variant="standard"
                        value={jobDetails.maxApplicants}
                        onChange={(event) => {
                          handleInput("maxApplicants", event.target.value);
                        }}
                        InputProps={{ inputProps: { min: 1 } }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <h3 className={classes.label}> Application Deadline</h3>

                      <TextField
                        type="datetime-local"
                        className={classes.textField}
                        value={jobDetails.deadline}
                        onChange={(event) => {
                          handleInput("deadline", event.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="flex items-center justify-center">
                <Button class="primaryButton" onClick={() => handleUpdate()}>
                  Post a Job
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateJobs;
