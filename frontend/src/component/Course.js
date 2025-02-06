import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Box } from "@material-ui/core";
import axios from "axios";
import apiList from "../lib/apiList";
import { SetPopupContext } from "../App";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const staticCourses = [
  {
    desc: "In this course, you will learn three key website programming and design languages: HTML, CSS, and JavaScript...",
    difficulty: "Intermediate",
    name: "Responsive Website Basics: Code with HTML, CSS, and JavaScript",
    rating: "4.5",
    url: "https://www.coursera.org/learn/website-coding",
  },
  {
    desc: "Learn foundational programming concepts and how to solve problems like a programmer...",
    difficulty: "Beginner",
    name: "Programming Foundations with JavaScript, HTML, and CSS",
    rating: "4.5",
    url: "https://www.coursera.org/learn/duke-programming-web",
  },
  // Additional static course data...
];

const Course = () => {
  const [courses, setCourses] = useState(() => staticCourses);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState({});
  const setPopup = useContext(SetPopupContext);
  const [profileDetails, setProfileDetails] = useState({});

  const fetchProfileData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setProfileDetails(response.data))
      .catch((err) => console.error("Error fetching profile data:", err));
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchCourseSuggestions = () => {
    if (!profileDetails?.skills) return;

    setLoading(true);
    axios
      .post(apiList.coursesuggestions, { user_skills: profileDetails.skills })
      .then((response) => setCourses(response.data?.recommendations || []))
      .catch((err) => {
        console.error("Error fetching course suggestions:", err);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching course suggestions.",
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourseSuggestions();
  }, [profileDetails]);

  const fetchImages = () => {
    const promises = courses.map(() =>
      axios
        .get("https://source.unsplash.com/random/400x300/?programming")
        .then((response) => response.request.responseURL)
        .catch(() => "")
    );

    Promise.all(promises).then((imageUrls) => setImages(imageUrls));
  };

  useEffect(() => {
    fetchImages();
  }, [courses]);

  const truncate = (input) =>
    input?.length > 300 ? `${input.substring(0, 400)}...` : input;

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="px-1 text-xs text-gray-700">
            <FaStar />
          </span>
        ))}
        {hasHalfStar && (
          <span className="px-1 text-xs text-gray-700">
            <FaStarHalfAlt />
          </span>
        )}
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        courses.map((course, idx) => (
          <div
            key={idx}
            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl m-8 mt-10"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                {images[idx] ? (
                  <img
                    className="h-full w-full object-cover md:w-48"
                    src={images[idx]}
                    alt="Course"
                  />
                ) : (
                  <div className="h-full w-full flex justify-center items-center bg-gray-200">
                    <CircularProgress />
                  </div>
                )}
              </div>
              <div className="p-8 w-full">
                <div className="uppercase tracking-wide text-xs text-indigo-500 font-semibold">
                  {course.difficulty}
                </div>
                <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                  {course.name}
                </h2>
                <p className="mt-2 text-gray-500">{truncate(course.desc)}</p>
                <div className="inline-flex mt-4 bg-gray-200 rounded-full w-max p-1">
                  {renderRating(parseFloat(course.rating))}
                </div>
                <div className="mt-6">
                  <a
                    href={course.url}
                    className="text-indigo-500 hover:text-indigo-600 font-semibold text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Course
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Course;
