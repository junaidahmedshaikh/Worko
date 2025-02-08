import { useContext, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  List,
  Chip,
} from "@material-ui/core";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
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

// const MultifieldInput = (props) => {
//   const classes = useStyles();
//   const { education, setEducation } = props;

//   return (
//     <>
//       {education.map((obj, key) => (
//         <Grid
//           item
//           container
//           className={classes.inputBox + "flex gap-4"}
//           key={key}
//         >
//           <Grid item xs={7}>
//             <TextField
//               label={`Institution Name #${key + 1}`}
//               value={education[key].institutionName}
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].institutionName = event.target.value;
//                 setEducation(newEdu);
//               }}
//               variant="outlined"
//               // style={{ width: "40%" }}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <TextField
//               label="Start Year"
//               value={obj.startYear}
//               variant="outlined"
//               type="number"
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].startYear = event.target.value;
//                 setEducation(newEdu);
//               }}
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <TextField
//               label="End Year"
//               value={obj.endYear}
//               variant="outlined"
//               type="number"
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].endYear = event.target.value;
//                 setEducation(newEdu);
//               }}
//             />
//           </Grid>
//         </Grid>
//       ))}
//       <Grid item style={{ alignSelf: "center" }}>
//         <Button
//           variant="contained"
//           // className="primaryButton"
//           onClick={() =>
//             setEducation([
//               ...education,
//               {
//                 institutionName: "",
//                 startYear: "",
//                 endYear: "",
//               },
//             ])
//           }
//           className={classes.inputBox + "bg-blue-500 text-base"}
//           style={{ background: "#3182ce", color: "white" }}
//         >
//           Add
//         </Button>
//       </Grid>
//     </>
//   );
// };
const MultifieldInput = ({ education, setEducation }) => {
  // Handle adding new education item on pressing Enter
  const handleAddEducation = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setEducation((prev) => [...prev, e.target.value.trim()]);
      e.target.value = ""; // Clear input after adding
    }
  };

  // Handle removing an education item
  const handleRemoveEducation = (index) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };
};

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);
  const [experience, setExperience] = useState();
  const [resumeAnalysis, setResumeAnalysis] = useState([]);
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");

  // Handle skill input changes
  const handleSkillChange = (e) => {
    setCurrentSkill(e.target.value);
  };

  // Add skill when Enter key is pressed
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && currentSkill.trim() !== "") {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill(""); // Reset the input field
    }
  };

  // Remove a skill from the list
  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const bestFitListing = resumeAnalysis?.reduce((prevJob, currentJob) => {
    return currentJob.fit_score > prevJob.fit_score ? currentJob : prevJob;
  }, resumeAnalysis?.[0]);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    education: [],
    skills: [],
    companyInfo: [],
    socialMediaLinks: {},
    resume: "",
    profileImage: "",
  });
  console.log("🚀 ~ Profile ~ filteredListings:", bestFitListing);

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

  // Model Handle Function
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // const companyName = "Open to Work";
  // const startDate = "11/11/2022";
  // const endDate = "30/12/2023";
  // const jobTitle = "Frontend Developer";
  // const department = "Designer Department";
  // let firstName = "Junaid";
  // let lastName = "Shaikh";
  // let emailAddress = "avinash@gmail.com";
  // let phoneNo = 8850094860;
  // let profileLink =
  //   "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png";

  // Projects Details
  // const projectDetails = [
  //   {
  //     projectName: "Worko",
  //     projectClientName: "Google",
  //     projectStartDate: "Dec 2023",
  //     projectEndDate: "Present",
  //     projectDescription:
  //       "Welcome to the Todoster Web Application! This simple and user-friendly application helps you manage your tasks and stay organized. This README will provide you with all the information you need to get started, including features and more",
  //   },
  //   {
  //     projectName: "Project 2",
  //     projectClientName: "Facebook",
  //     projectStartDate: "Dec 2022",
  //     projectEndDate: "Jan 2023",
  //     projectDescription:
  //       "Welcome to the Todoster Web Application! This simple and user-friendly application helps you manage your tasks and stay organized. This README will provide you with all the information you need to get started, including features and more",
  //   },
  // ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        profilePicture: file,
      }));
    }
  };
  const imagePreview = profileDetails.profilePicture
    ? URL.createObjectURL(profileDetails.profilePicture)
    : null;
  const handleChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        // className="bg-slate-900"
        style={{ padding: "auto", minHeight: "90vh", paddingTop: "30px" }}
      >
        <div className="w-full bg-white p-5">
          <div className="flex justify-between bg-white py-10 px-10">
            <div className="flex">
              <div className="w-20 flex justify-items-center mr-5 ml-10">
                <img
                  className="w-36 object-cover rounded-full"
                  src={imagePreview}
                  alt="Profile"
                />
              </div>
              <div className="flex flex-col">
                <div>
                  {" "}
                  <h1 className="text-xl font-semibold">
                    {profileDetails.name} {profileDetails.surname}
                  </h1>
                  <h3 className="text-sm">Recruiter</h3>
                  {/* Social Media Icons Section */}
                  <div className="flex space-x-4 mt-4">
                    {/* LinkedIn */}
                    <a
                      href={profileDetails.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    {/* Twitter */}
                    <a
                      href={profileDetails.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
                    >
                      <FaTwitter size={24} />
                    </a>
                    {/* GitHub */}
                    <a
                      href={profileDetails.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-gray-600 transition-all duration-300 transform hover:scale-110"
                    >
                      <FaGithub size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center mt-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleOpen}
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-white py-5 px-10 rounded-lg mt-5 ">
            {/* Personal Details */}
            <div
              className="rounded-md my-2 py-5 px-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              style={{
                boxShadow:
                  "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
              }}
            >
              <h2 className="text-lg font-semibold text-gray-900 ">
                Personal Information
              </h2>
              <div>
                <div className="flex mt-4 justify-between">
                  <div className="mr-10">
                    <p className="font-semibold text-gray-800">Name</p>
                    <p className="text-gray-600">
                      {profileDetails.name} {profileDetails.surname}
                    </p>
                  </div>
                  <div className="mr-10">
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">{profileDetails.email}</p>
                  </div>
                  <div className="mr-10">
                    <p className="font-semibold  text-gray-800">Phone</p>
                    <p className="text-gray-600">
                      {profileDetails.contactNumber || ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Skills Card */}
            <div
              className="rounded-md py-5 px-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              style={{
                boxShadow:
                  "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
              }}
            >
              <h2 className="text-lg font-semibold text-gray-900 ">Skill </h2>
              <div className="flex mt-4">
                <div item className="flex">
                  {profileDetails.skills.map((skillList) => (
                    <span className=" profileCardsSkills"> {skillList} </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Eduction Card */}
            <div
              className="rounded-md py-5 px-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              style={{
                boxShadow:
                  "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
              }}
            >
              <h2 className="text-lg font-semibold text-gray-900 ">
                {" "}
                Education{" "}
              </h2>
              <div className="flex mt-4 justify-evenly align-middle">
                <div className="flex w-full justify-between font-semibold items-center text-gray-600">
                  {education.map((college) => {
                    return (
                      <>
                        <div className="mr-10">
                          <p className="font-semibold text-gray-800">College</p>
                          <div className="text-gray-600 ">
                            <span>{college.institutionName}</span>
                            {/* <span> Information Technology</span> */}
                          </div>
                        </div>
                        <div className="mr-10">
                          <p className="font-semibold text-gray-800">Course</p>
                          <p className="text-gray-600">
                            {profileDetails.email}
                          </p>
                        </div>
                        <div className="mr-10">
                          <p className="font-semibold  text-gray-800">Year</p>
                          <div className="flex justify-end">
                            <span>{college.startYear}</span>
                            <span> - </span>
                            <span>{college.endYear}</span>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      {/* Modal For Updating Profile */}
      {open && (
        <div className="fixed top-32  bg-transparent bg-opacity-80 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl w-3/4 max-w-4xl shadow-2xl transform transition-all duration-300 ">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-gray-800 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ">
                Edit Profile
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="bg-transparent z-10 rounded-md p-2 inline-flex items-center justify-center text-gray-800  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form>
              <div className="grid  gap-8 ">
                {/* Left Section:  */}
                <div className="">
                  {/* Personal Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Personal Details
                    </label>
                    <div className="flex gap-4">
                      <span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={profileDetails.name}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>
                      <span>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={profileDetails.email}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>
                      <span>
                        <input
                          type="text"
                          name="contactNumber"
                          placeholder="Phone"
                          value={profileDetails.contactNumber}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>
                    </div>
                  </div>
                  {/* Social Media Links */}
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Social Media Links
                    </label>
                    <div className="flex gap-4">
                      <span>
                        <input
                          type="text"
                          name="linkedin"
                          placeholder="LinkedIn URL"
                          value={profileDetails.linkedin}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>

                      <span>
                        <input
                          type="text"
                          name="twitter"
                          placeholder="Twitter URL"
                          value={profileDetails.twitter}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>

                      <span>
                        <input
                          type="text"
                          name="github"
                          placeholder="GitHub URL"
                          value={profileDetails.github}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>
                      <span>
                        <input
                          type="text"
                          name="instagram"
                          placeholder="instagram URL"
                          value={profileDetails.instagram}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>
                    </div>
                  </div>
                  {/* Education */}
                  <div className="space-y-6">
                    <label className="block text-sm font-medium text-gray-800">
                      Education
                    </label>

                    <div className="grid grid-cols-3 gap-2 ">
                      <span>
                        <input
                          type="text"
                          name="college name"
                          placeholder="College Name"
                          value={education.institutionName}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>
                      <span>
                        <input
                          type="text"
                          name="Course name"
                          placeholder="Course Name"
                          value={education.courseName || ""}
                          onChange={handleChange}
                          className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                        />
                      </span>
                      <span className="flex">
                        <span>
                          <input
                            type="text"
                            name="college start year"
                            placeholder="Start Year"
                            value={education.startDate}
                            onChange={handleChange}
                            className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                          />
                        </span>
                        <span>
                          <input
                            type="text"
                            name="college end year"
                            placeholder="End Year"
                            value={education.endDate}
                            onChange={handleChange}
                            className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                          />
                        </span>

                        {/* <span>
                        <Button
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
                          className="bg-gradient-to-r bg-blue-500 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-600  transition duration-300"
                        >
                          Add
                        </Button>
                      </span> */}
                      </span>
                    </div>
                  </div>
                  {/* Company Details */}
                  <div className="grid grid-cols-3 gap-2">
                    <span>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={profileDetails.companyName}
                        onChange={handleChange}
                        className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                      />
                    </span>
                    <span>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        name="joiningDate"
                        placeholder="joiningDate"
                        value={profileDetails.experience}
                        onChange={handleChange}
                        className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                      />
                    </span>
                    <span>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        placeholder="endDate"
                        value={profileDetails.experience}
                        onChange={handleChange}
                        className="w-full p-4 mb-6 bg-white text-gray-600 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 "
                      />
                    </span>
                  </div>
                  {/* Skills */}
                  <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Skills
                      </label>
                      <input
                        type="text"
                        value={currentSkill}
                        onChange={handleSkillChange}
                        onKeyDown={handleAddSkill}
                        placeholder="Press Enter to add skill"
                        className="w-full p-3 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-200 rounded-lg px-4 py-2"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="bg-gradient-to-r bg-blue-500 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-600  transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
