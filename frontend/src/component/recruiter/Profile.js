import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  Modal,
  TextField,
  Chip,
  MultifieldInput,
  FileUploadInput,
  Model,
  // DescriptionIcon,
} from "@material-ui/core";
import axios from "axios";
import { SetPopupContext } from "../../App";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa"; // Importing the social media icons
import apiList from "../../lib/apiList";
import { CiFaceSmile } from "react-icons/ci";

const useStyles = makeStyles(() => ({
  body: {
    height: "inherit",
  },
}));

const Profile = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  // const [open, setOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    contactNumber: "",
    bio: "",
    companyInfo: [],
    socialMediaLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
    },
    profileImage: "",
  });

  const [phone, setPhone] = useState("");
  console.log("profileDetails:", profileDetails);

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
          message: "Error fetching profile details",
        });
      });
  };

  const handleUpdate = () => {
    const updatedDetails = {
      ...profileDetails,
      contactNumber: phone ? `+${phone}` : "",
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
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };
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

    // console.log("e.target.value: ", e.target.value);
  };

  const handleSocialMediaLinks = (e) => {
    setProfileDetails({
      ...profileDetails,
      socialMediaLinks: {
        [e.target.name]: e.target.value,
      },
    });
  };
  // Model Handle Function
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                      href={profileDetails.socialMediaLinks.linkedin}
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
                <div className="flex mt-4">
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

            <div
              className="rounded-md py-5 px-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              style={{
                boxShadow:
                  "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
              }}
            >
              <h2 className="text-lg font-semibold text-gray-900 ">
                Employment Details
              </h2>
              <div className="flex mt-4">
                <div className="mr-10">
                  <p className="font-semibold  text-gray-800">Experience</p>
                  <p className="text-gray-600">{profileDetails.experience}</p>
                </div>
                <div className="mr-10">
                  <p className="font-semibold  text-gray-800">Company Name</p>
                  <p className="text-gray-600">{profileDetails.companyName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>

      {/* Model  */}
      {open && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center  items-center">
          <div className="bg-white p-6 rounded-lg w-2/4 ">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <div>
                <button
                  type="button"
                  onClick={handleClose}
                  class="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>

                  <svg
                    class="h-6 w-6"
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
            </div>
            <form>
              <div className="flex gap-8 ">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Personal Information
                  </label>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={profileDetails.name}
                      onChange={handleChange}
                      className="w-full p-3 mb-4 border rounded"
                    />
                    <input
                      type="text"
                      name="surname"
                      placeholder="Surname"
                      value={profileDetails.surname}
                      onChange={handleChange}
                      className="w-full p-3 mb-4 border rounded"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={profileDetails.email}
                      onChange={handleChange}
                      className="w-full p-3 mb-4 border rounded"
                    />
                    <input
                      type="text"
                      name="contactNumber"
                      placeholder="Phone"
                      value={profileDetails.contactNumber}
                      onChange={handleChange}
                      className="w-full p-3 mb-4 border rounded"
                    />
                    <input
                      type="text"
                      name="experience"
                      placeholder="Experience"
                      value={profileDetails.experience}
                      onChange={handleChange}
                      className="w-full p-3 mb-4 border rounded"
                    />
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={profileDetails.companyName}
                      onChange={handleChange}
                      className="w-full p-3 mb-4 border rounded"
                    />
                  </div>
                </div>

                <div className="">
                  {/* Social Media Links */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Social Media Links
                    </label>

                    <input
                      type="text"
                      name="linkedin"
                      placeholder="LinkedIn URL"
                      value={profileDetails.socialMediaLinks.linkedin}
                      onChange={handleSocialMediaLinks}
                      className="w-full p-3 mt-2 mb-4 border rounded"
                    />
                    <input
                      type="text"
                      name="twitter"
                      placeholder="Twitter URL"
                      value={profileDetails.socialMediaLinks.twitter}
                      onChange={handleSocialMediaLinks}
                      className="w-full p-3 mb-4 border rounded"
                    />
                    <input
                      type="text"
                      name="github"
                      placeholder="GitHub URL"
                      value={profileDetails.socialMediaLinks.github}
                      onChange={handleSocialMediaLinks}
                      className="w-full p-3 mb-4 border rounded"
                    />
                  </div>

                  {/* Image Upload Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleImageChange} // Function to handle image upload
                      accept="image/*"
                      className="w-full p-3 mt-2 border rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
