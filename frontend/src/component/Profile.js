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
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import { GridOff } from "@material-ui/icons";

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
  box1: {
    background: "Red",
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={6}>
            <TextField
              label={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          class="primaryButton"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add
        </Button>
      </Grid>
    </>
  );
};

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);

  const [resumeAnalysis, setResumeAnalysis] = useState([]);

  const bestFitListing = resumeAnalysis?.reduce((prevJob, currentJob) => {
    return currentJob.fit_score > prevJob.fit_score ? currentJob : prevJob;
  }, resumeAnalysis?.[0]);

  console.log("🚀 ~ Profile ~ filteredListings:", bestFitListing);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
  });

  const getResumeAnalysis = () => {
    axios
      .post(apiList.resumeparse, {
        resume_url: profileDetails.resume,
      })
      .then((response) => {
        console.log(response.data);
        setResumeAnalysis(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (profileDetails.resume) {
      getResumeAnalysis();
    }
  }, [profileDetails]);

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

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
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
        // setPopup({
        //   open: true,
        //   severity: "error",
        //   message: "Error",
        // });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editDetails = () => {
    setOpen(true);
  };

  const handleUpdate = () => {
    console.log(education);

    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

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
        // setPopup({
        //     open: true,
        //     severity: "error",
        //     message: err.response.data.message,
        // });
        console.log(err.response);
      });
    setOpen(false);
  };
  const companyName = "Open to Work";
  const startDate = "11/11/2022";
  const endDate = "30/12/2023";
  const jobTitle = "Frontend Developer";
  const department = "Designer Department";
  let firstName = "Junaid";
  let lastName = "Shaikh";
  let emailAddress = "avinash@gmail.com";
  let phoneNo = 8850094860;
  let profileLink =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png";

  // Projects Details
  const projectDetails = {
    projectName: "Worko",
    projectClientName: "Google",
    projectStartDate: "Dec 2023",
    projectEndDate: "Present",
    projectDescription:
      "Welcome to the Todoster Web Application! This simple and user-friendly application helps you manage your tasks and stay organized. This README will provide you with all the information you need to get started, including features and more",
  };

  return (
    <>
      <Grid container class="w-9/12 my-5">
        <Grid>
          <Paper item elevation={0} style={{ background: "transparent" }}>
            <Grid className="flex justify-between bg-transparent">
              <Grid item class="flex flex-cols py-10">
                <div className="w-40 flex justify-items-center mr-5">
                  <img
                    className="w-40 h-40 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover"
                    src={profileDetails.profile}
                    alt="Bordered avatar"
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <h1 className="cardTitle">{profileDetails.name}</h1>
                  <h3 className="cardSubTitle">{companyName}</h3>
                  <div>
                    <a href="" class="text-black">
                      <i class="fa-solid fa-globe m-1"></i>
                    </a>
                    <a href="" class="text-blue-600">
                      <i class="fa-brands fa-linkedin m-1"></i>
                    </a>
                    <a href="" class="text-black">
                      <i class="fa-brands fa-x-twitter m-1"></i>
                    </a>
                    <a href="" class="text-red-400">
                      <i class="fa-brands fa-instagram m-1"></i>
                    </a>
                  </div>
                </div>
              </Grid>
              <Grid item class="grid content-center">
                <Button class="primaryButton h-10" onClick={editDetails}>
                  {" "}
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
            <Grid className="w-full bg-white py-5 px-10 rounded-lg">
              {/* About Card */}
              <Grid className="profileCards">
                <Grid item className="profileCardsHeader">
                  <Typography class="profileCardsHeading">About Me</Typography>
                  <Grid item sm className="profileCardsHeaderIcons">
                    {/* <i class="fa-solid fa-pen"></i> */}
                  </Grid>
                </Grid>

                <Grid xs class="profileCardsFooter">
                  {" "}
                  I am a person who is positive about every aspect of life.
                  There are many things I like to do, to see, and to experience.
                  I like to read, I like to write; I like to think, I like to
                  dream; I like to talk, I like to listen. I like to see the
                  sunrise in the morning, I like to see the moonlight at night;
                  I like to feel the music flowing on my face, I like to smell
                  the wind coming from the ocean. I like to look at the clouds
                  in the sky with a blank mind, I like to do thought experiment
                  when I cannot sleep in the middle of the night. I like flowers
                  in spring, rain in summer, leaves in autumn, and snow in
                  winter. I like to sleep early, I like to get up late;
                </Grid>
              </Grid>
              {/* Personal Card */}
              <Grid className="profileCards">
                <Grid item className="profileCardsHeader">
                  <Typography class="profileCardsHeading">
                    {" "}
                    Personal Information{" "}
                  </Typography>
                  <Grid item sm className="profileCardsHeaderIcons">
                    {" "}
                    {/* <i class="fa-solid fa-pen"></i>{" "} */}
                  </Grid>
                </Grid>
                <div className="flex my-5 ">
                  <Grid xs className="flex flex-col mr-10">
                    {" "}
                    <Typography className="profileSectionHeaderList">
                      First Name
                    </Typography>{" "}
                    <Typography className="profileCardsFooter">
                      {profileDetails.name}
                    </Typography>
                  </Grid>
                  <Grid xs className="flex flex-col mr-10">
                    {" "}
                    <Typography className="profileCardsFooter">
                      Last Name
                    </Typography>{" "}
                    <Typography className="profileCardsFooter">
                      Payne
                    </Typography>
                  </Grid>
                  <Grid xs className="flex flex-col mr-10">
                    {" "}
                    <Typography className="profileSectionHeaderList">
                      Email Address
                    </Typography>{" "}
                    <Typography className="profileCardsFooter">
                      {emailAddress}
                    </Typography>
                  </Grid>
                  <Grid xs className="flex flex-col mr-10">
                    {" "}
                    <Typography className="profileSectionHeaderList">
                      Phone
                    </Typography>{" "}
                    <Typography className="profileCardsFooter">
                      {phoneNo}
                    </Typography>
                  </Grid>
                </div>
              </Grid>
              {/* Skills Card */}
              <Grid className="profileCards">
                <Grid item className="profileCardsHeader">
                  <Typography class="profileCardsHeading">Skills</Typography>
                  <Grid item sm className="profileCardsHeaderIcons">
                    {/* <i class="fa-solid fa-pen"></i> */}
                  </Grid>
                </Grid>
                <Grid item className="flex">
                  {profileDetails.skills.map((skillList) => (
                    <span className=" profileCardsSkills"> {skillList} </span>
                  ))}
                </Grid>
              </Grid>
              {/* Eduction Card */}
              <Grid className="profileCards">
                {/* Header of the card */}
                <Grid item className="profileCardsHeader">
                  <Typography class="profileCardsHeading">Education</Typography>
                  <Grid item sm className="profileCardsHeaderIcons">
                    {/* <i class="fa-solid fa-pen"></i> */}
                  </Grid>
                </Grid>
                {/* Main body of the card */}
                <Grid item>
                  <Grid item sm className="profileCardsSubHeading">
                    <span>{education.institutionName}</span>
                    {/* <span> Information Technology</span> */}
                  </Grid>
                  <Grid item sm className="profileCardsSubHeading">
                    <span>St. Xaviers College, Mumbai</span>
                  </Grid>
                  <Grid item sm className="profileCardsSubPara">
                    <span>{education.startDate}</span>
                    <span>{education.endDate}</span>
                  </Grid>
                </Grid>
              </Grid>
              {/* Project Card */}
              <Grid item className="profileCards">
                {/* Header of the card */}
                <Grid item sm className="profileCardsHeader">
                  <Typography class="profileCardsHeading">
                    Improvements
                  </Typography>
                </Grid>
                <>
                  <Grid className="text-xl mb-2">
                    You are best fitted for{" "}
                    <span className="font-bold">
                      {bestFitListing?.job_name}
                    </span>{" "}
                    roles
                  </Grid>
                  <Grid item sm className="profileCardsSubHeading ">
                    <span className="ml-3">
                      {bestFitListing?.recommendations}
                    </span>
                  </Grid>
                </>
                {/* Main body of the card */}
                {/* <Grid item>
                  <Grid
                    item
                    sm
                    class="profileCardsSubHeading"
                    style={{ margin: "0px", fontSize: "17px" }}
                  >
                    <span>{projectDetails.projectName}</span>
                  </Grid>
                  <Grid item sm className="profileCardsSubHeading">
                    <span>{projectDetails.projectClientName}</span>
                  </Grid>
                  <Grid item sm className="profileCardsSubPara">
                    <span>{projectDetails.projectStartDate}</span>
                    {" to "}
                    <span>{projectDetails.projectEndDate}</span>
                  </Grid>
                  <Grid
                    item
                    sm
                    className="profileCardsSubHeading"
                    style={{ marginTop: "5px" }}
                  >
                    <span>{projectDetails.projectDescription}</span>
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          style={{ padding: "30px", minHeight: "93vh" }}
        >
          <Grid item>
            <Typography variant="h2">Profile</Typography>
          </Grid>
          <Grid item xs>
            <Paper
              style={{
                padding: "20px",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item>
                  <TextField
                    label="Name"
                    value={profileDetails.name}
                    onChange={(event) =>
                      handleInput("name", event.target.value)
                    }
                    className={classes.inputBox}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <MultifieldInput
                  education={education}
                  setEducation={setEducation}
                />
                <Grid item>
                  <ChipInput
                    className={classes.inputBox}
                    label="Skills"
                    variant="outlined"
                    helperText="Press enter to add skills"
                    value={profileDetails.skills}
                    onAdd={(chip) =>
                      setProfileDetails({
                        ...profileDetails,
                        skills: [...profileDetails.skills, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      let skills = profileDetails.skills;
                      skills.splice(index, 1);
                      setProfileDetails({
                        ...profileDetails,
                        skills: skills,
                      });
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <FileUploadInput
                    className={classes.inputBox}
                    label="Resume (.pdf)"
                    icon={<DescriptionIcon />}
                    uploadTo={apiList.uploadResume}
                    handleInput={handleInput}
                    identifier={"resume"}
                    profileDetails={profileDetails}
                  />
                </Grid>
                <Grid item>
                  <FileUploadInput
                    className={classes.inputBox}
                    label="Profile Photo (.jpg/.png)"
                    icon={<FaceIcon />}
                    uploadTo={apiList.uploadProfileImage}
                    handleInput={handleInput}
                    identifier={"profile"}
                    profileDetails={profileDetails}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px", marginTop: "30px" }}
                onClick={() => handleUpdate()}
              >
                Update Details
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default Profile;
