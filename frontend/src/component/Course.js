import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Chip,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import axios from "axios";
import apiList from "../lib/apiList";
import { SetPopupContext } from "../App";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const staticCourses = [
  {
    desc: "In this course you will learn three key website programming and design languages: HTML, CSS and JavaScript. You will create a web page using basic elements to control layout and style.  Additionally, your web page will support interactivity.   At the end of the course, you will be able to:  1. Define the purpose of HTML, CSS and JavaScript 2. Make a simple web page using HTML 3. Use CSS to control text styles and layout 4. Use CSS libraries such as Bootstrap to create responsive layouts 5. Use JavaScript variables and functions 6. Manipulate web page content using JavaScript 7. Respond to user input using JavaScript  In this course, you will complete:  2 assignments writing HTML, CSS and JavaScript, each taking ~1 hour to complete 4 quizzes, each taking ~20 minutes to complete 1 programming exercise~30 minutes to complete multiple practice quizzes, each taking ~5 minutes to complete  Participation in or completion of this online course will not confer academic credit for University of London programmes.",
    difficulty: "Intermediate",
    name: "Responsive Website Basics: Code with HTML, CSS, and JavaScript",
    rating: "4.5",
    score: 0.5000000000000001,
    url: "https://www.coursera.org/learn/website-coding",
  },
  {
    desc: "Learn foundational programming concepts (e.g., functions, for loops, conditional statements) and how to solve problems like a programmer. In addition, learn basic web development as you build web pages using HTML, CSS, JavaScript. By the end of the course, will create a web page where others can upload their images and apply image filters that you create.  After completing this course, you will be able to: 1. Think critically about how to solve a problem using programming; 2. Write JavaScript programs using functions, for loops, and conditional statements; 3. Use HTML to construct a web page with paragraphs, divs, images, links, and lists; 4. Add styles to a web page with CSS IDs and classes; and 5. Make a web page interactive with JavaScript commands like alert, onClick, onChange, adding input features like an image canvas, button, and slider.",
    difficulty: "Beginner",
    name: "Programming Foundations with JavaScript, HTML and CSS",
    rating: "4.5",
    score: 0.4803844614152615,
    url: "https://www.coursera.org/learn/duke-programming-web",
  },
  {
    desc: "In this intermediate-level course you will explore how CSS (Cascading Stylesheets) can be used to alter the appearance of a table on your web page. HTML is used to add a table to a website to organize content. CSS is used to make that table easier to read and more visually appealing to website visitors. You will use the Notepad++ editor to write CSS rules with a variety of selectors and properties that are applied to table components to change their appearance. The Chrome browser is used to display the page to test the results of your work. CSS is a very powerful tool and using it to enhance the look of a table is a valuable skill for a web developer.  Note: This course works best for learners who are based in the North America region. We�re currently working on providing the same experience in other regions.",
    difficulty: "Beginner",
    name: "Style Tables with CSS",
    rating: "4.8",
    score: 0.4803844614152615,
    url: "https://www.coursera.org/learn/style-html-tables-css",
  },
  {
    desc: "This course is designed to start you on a path toward future studies in web development and design, no matter how little experience or technical knowledge you currently have. The web is a very big place, and if you are the typical internet user, you probably visit several websites every day, whether for business, entertainment or education. But have you ever wondered how these websites actually work? How are they built? How do browsers, computers, and mobile devices interact with the web? What skills are necessary to build a website? With almost 1 billion websites now on the internet, the answers to these questions could be your first step toward a better understanding of the internet and developing a new set of internet skills.    By the end of this course you�ll be able to describe the structure and functionality of the world wide web, create dynamic web pages using a combination of HTML, CSS, and JavaScript, apply essential programming language concepts when creating HTML forms, select an appropriate web hosting service, and publish your webpages for the world to see. Finally, you�ll be able to develop a working model for creating your own personal or business websites in the future and be fully prepared to take the next step in a more Advanced web development or design course or specialization.",
    difficulty: "Conversant",
    name: "Introduction to Web Development",
    rating: "4.6",
    score: 0.4803844614152615,
    url: "https://www.coursera.org/learn/web-development",
  },
  {
    desc: "The capstone will develop a professional-quality web portfolio.  Students will demonstrate the ability to design and implement a responsive site for a minimum of three platforms.  Adherence to validation and accessibility standards will be required. The evolving student implementations will be reviewed each week by capstone peers and teaching assistants to make sure that the student keeps up with the agenda of the course.   Upon completion of this course students will feel comfortable creating and/or updating existing front-end sites, utilizing existing frameworks, and testing sites for accessibility compliance.  This course is only open to students who have completed the first four courses in the Web Design for Everybody specialization: Introduction to HTML5, Introduction to CSS3, Interactivity with JavaScript, and Advanced Styling with Responsive Design.",
    difficulty: "Beginner",
    name: "Web Design for Everybody Capstone",
    rating: "4.4",
    score: 0.4803844614152615,
    url: "https://www.coursera.org/learn/web-design-project",
  },
];

const Course = () => {
  const [courses, setCourses] = useState(() => staticCourses);
  const [loading, setLoading] = useState(true); // Added loading state
  console.log("🚀 ~ Course ~ courses:", courses);
  const setPopup = useContext(SetPopupContext);

  const getCourseSuggestions = () => {
    setLoading(true); // Set loading to true before making the API call
    axios
      .post(apiList.coursesuggestions, {
        user_skills: ["html", "css", "javascript"],
      })
      .then((response) => {
        console.log(response.data);
        setCourses(response.data?.recommendations);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API call is completed
      });
  };

  useEffect(() => {
    getCourseSuggestions();
  }, []);

  const truncate = (input) =>
    input?.length > 300 ? `${input.substring(0, 400)}...` : input;

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span className="flex px-1 py-1 text-xs font-semibold text-gray-700">
            <FaStar key={index} />
          </span>
        ))}
        {hasHalfStar && (
          <span className="flex px-1 py-1 text-xs font-semibold text-gray-700 ">
            <FaStarHalfAlt />
          </span>
        )}
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box> // Display loading state
      ) : (
        courses?.map((course) => (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl m-8 mt-10">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-full w-full object-cover md:w-48"
                  src="https://source.unsplash.com/random?courses,programming"
                  alt="Course Image"
                />
              </div>
              <div className="p-8 w-full">
                <div className="uppercase tracking-wide text-xs text-indigo-500 font-semibold">
                  {course.difficulty}
                </div>
                <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                  {course.name}
                </h2>
                <p className="mt-2 text-gray-500">{truncate(course.desc)}</p>
                <div className="inline-flex mt-4 bg-gray-200 rounded-full w-max pb-1 pt-1 pl-2 pr-2">
                  {renderRating(course.rating)}
                </div>
                <div className="mt-6">
                  <a
                    href={course.url}
                    class="text-indigo-500 hover:text-indigo-600 font-semibold text-sm"
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
// </Box>

export default Course;
