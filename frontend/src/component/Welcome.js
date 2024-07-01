import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const Welcome = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "93vh" }}
    >
      <div className="py-2 bg-gray-100 text-gray-900 min-h-screen">
        <main>
          <div id="hero" className="px-10 py-20 my-5 lg:flex items-center">
            <div className=" sm:px-10 md:px-10 md:flex flex-col lg:block lg:w-1/2 lg:max-w-3xl lg:mr-8 lg:px-20">
              <div className="md:w-1/2 md:mr-10 lg:w-full lg:mr-0">
                <h1 className="text-3xl xl:text-5xl font-black md:leading-none xl:leading-tight">
                  {props.type === "recruiter"
                    ? "Hire a Talent Near You"
                    : "Find high paying jobs with Worko"}
                </h1>
                <p className="py-5 mt-4 xl:mt-2">
                  World Class Talent, just for you on contract, full-time or
                  part-time, whatever you need.
                </p>
              </div>
              <div className="flex-1">
                <div>
                  <Link
                    style={{ width: "150%" }}
                    to="home"
                    className="homeBtn transition-all duration-300 bg-#4f89f1 w-40 border border-transparent rounded font-semibold tracking-wide text-sm px-5 py-4 focus:outline-none focus:shadow-outline bg-indigo-500 text-gray-100 hover:bg-indigo-600 hover:text-gray-200"
                  >
                    {/* <button> */}
                    {props.type === "recruiter" ? "Find Talent" : "Find Job"}
                    {/* </button> */}
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-6 w-full flex-1 lg:mt-0">
              <div />
              <img
                className
                src="https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=85"
                alt="main"
              />
            </div>
          </div>
          <div className="p-5 sm:px-10 md:px-20" id="companies">
            <div className="max-w-screen-xl mx-auto">
              <img
                className="mx-auto"
                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846471026680582071-Strip-Payment-Logos.png"
                alt="main"
              />
            </div>
          </div>
          <div
            className="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8 bg-indigo-100"
            id="features"
          >
            <div className="py-10 max-w-screen-xl mx-auto">
              <h3 className="leading-none font-black text-3xl">Features</h3>
              <div className="flex flex-col justify-center flex-wrap lg:flex-row lg:items-stretch lg:flex-no-wrap lg:justify-between">
                <div className="w-full max-w-sm mt-6 lg:mt-8 bg-gray-100 rounded-2xl shadow-md p-12 lg:p-8 lg:mx-0 xl:p-12">
                  <div className="p-4 inline-block bg-indigo-200 rounded-lg">
                    <svg
                      className="text-indigo-500 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1={9} y1={9} x2="9.01" y2={9} />
                      <line x1={15} y1={9} x2="15.01" y2={9} />
                    </svg>
                  </div>
                  <div className="mt-4 font-extrabold text-2xl tracking-wide">
                    Amazing People
                  </div>
                  <div className="text-sm text-gray-600">
                    We guarantee that every designer you ever work with will be
                    an awesome member for your team. We conduct personal
                    interview with every designer to ensure that we only get the
                    best.
                  </div>
                </div>
                <div className="w-full max-w-sm mt-8 bg-gray-100 rounded-2xl shadow-md p-12 lg:p-8 lg:mx-4 xl:p-12">
                  <div className="p-4 inline-block bg-green-200 rounded-lg">
                    <svg
                      className="text-green-500 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1={12} y1={1} x2={12} y2={23} />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="mt-4 font-extrabold text-2xl tracking-wide">
                    Best Rates
                  </div>
                  <div className="text-sm text-gray-600">
                    Be assured that you will always get the best rates. We
                    continously monitor global freelance wage trends to ensure
                    that no one is under or overpaid.
                  </div>
                </div>
                <div className="w-full max-w-sm mt-8 bg-gray-100 rounded-2xl shadow-md p-12 lg:p-8 lg:mx-4 xl:p-12">
                  <div className="p-4 inline-block bg-red-200 rounded-lg">
                    <svg
                      className="text-red-500 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                      />
                      <line
                        xmlns="http://www.w3.org/2000/svg"
                        x1={12}
                        y1={9}
                        x2={12}
                        y2={13}
                      />
                      <line
                        xmlns="http://www.w3.org/2000/svg"
                        x1={12}
                        y1={17}
                        x2="12.01"
                        y2={17}
                      />
                    </svg>
                  </div>
                  <div className="mt-4 font-extrabold text-2xl tracking-wide">
                    Abuse Protection
                  </div>
                  <div className="text-sm text-gray-600">
                    Money is held by us in escrow subject to project completion.
                    If there is any dispute, a customer service representative
                    will manually review the case and take appropriate action.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8 bg-gray-100"
            id="cards"
          >
            {/* Popular Designer Section */}
            <div className="max-w-screen-xl mx-auto">
              <h3 className="leading-none font-black text-3xl">
                Popular Designers
              </h3>
              <div className="lg:flex justify-between lg:mt-8">
                {/* Hired Card*/}
                <div className=" flex-col  items-center">
                  <div className="flex-1 flex w-full max-w-sm pt-5 lg:pt-0">
                    <div className="w-full p-2 sm:p-10 lg:px-8 xl:px-12 shadow-md rounded bg-gray-100 relative">
                      <div className="my-5 flex items-center">
                        <div
                          className="w-16 h-16 bg-cover rounded-full border-2 border-gray-700"
                          alt=""
                          style={{
                            backgroundImage:
                              'url("https://res.cloudinary.com/difvkvxuy/image/upload/v1697566818/Latest%20Portfolio%20Images/photo_2023-10-17_23-49-54_rd8ord.jpg")',
                          }}
                        />
                        <div className="ml-5">
                          <div className="font-bold text-gray-800">
                            Junaid Ahmed Shaikh
                          </div>
                          <div className="text-xs text-gray-500">
                            Hired 3 Hours ago
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold  leading-tight">
                        Frontend Dev
                      </div>
                      <div>
                        <div className="flex justify-between mt-3 text-xs font-bold">
                          <div className="flex items-start">
                            <svg
                              className="text-gray-600 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx={12} cy={10} r={3} />
                            </svg>
                            <span className="ml-1 text-gray-600">
                              New York City
                            </span>
                          </div>
                          <div className="flex items-start ml-4">
                            <svg
                              className="text-gray-600 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                xmlns="http://www.w3.org/2000/svg"
                                x={2}
                                y={7}
                                width={20}
                                height={14}
                                rx={2}
                                ry={2}
                              />
                              <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                              />
                            </svg>
                            <span className="ml-1 text-gray-600">
                              Google (3 Years)
                            </span>
                          </div>
                        </div>
                        <div className="text-center flex flex-nowrap  text-xs">
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            Full Time
                          </span>
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            Remote
                          </span>
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            $30/Hr
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hired Card*/}
                <div className=" flex-col  items-center">
                  <div className="flex-1 flex w-full max-w-sm pt-5 lg:pt-0">
                    <div className="w-full p-2 sm:p-10 lg:px-8 xl:px-12 shadow-md rounded bg-gray-100 relative">
                      <div className="my-5 flex items-center">
                        <div
                          className="w-16 h-16 bg-cover rounded-full border-2 border-gray-700"
                          alt=""
                          style={{
                            backgroundImage:
                              'url("https://i.pinimg.com/136x136/fb/73/38/fb733864f9b1dd8f77629a71d7bccd04.jpg")',
                          }}
                        />
                        <div className="ml-5">
                          <div className="font-bold text-gray-800">
                            Akansha Kumar
                          </div>
                          <div className="text-xs text-gray-500">
                            Hired 3 Hours ago
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold  leading-tight">
                        SDE 1
                      </div>
                      <div>
                        <div className="flex justify-between mt-3 text-xs font-bold">
                          <div className="flex items-start">
                            <svg
                              className="text-gray-600 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx={12} cy={10} r={3} />
                            </svg>
                            <span className="ml-1 text-gray-600">India</span>
                          </div>
                          <div className="flex items-start ml-4">
                            <svg
                              className="text-gray-600 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                xmlns="http://www.w3.org/2000/svg"
                                x={2}
                                y={7}
                                width={20}
                                height={14}
                                rx={2}
                                ry={2}
                              />
                              <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                              />
                            </svg>
                            <span className="ml-1 text-gray-600">
                              Google (1 Years)
                            </span>
                          </div>
                        </div>
                        <div className="text-center flex flex-nowrap  text-xs">
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            Full Time
                          </span>
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            Remote
                          </span>
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            $80/Hr
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hired Card*/}
                <div className=" flex-col  items-center">
                  <div className="flex-1 flex w-full max-w-sm pt-5 lg:pt-0">
                    <div className="w-full p-2 sm:p-10 lg:px-8 xl:px-12 shadow-md rounded bg-gray-100 relative">
                      <div className="my-5 flex items-center">
                        <div
                          className="w-16 h-16 bg-cover rounded-full border-2 border-gray-700"
                          alt=""
                          style={{
                            backgroundImage:
                              'url("https://i.pinimg.com/736x/9d/7a/ef/9d7aefbc7d3f2a883f2fceae82964e8a.jpg")',
                          }}
                        />
                        <div className="ml-5">
                          <div className="font-bold text-gray-800">Avi</div>
                          <div className="text-xs text-gray-500">
                            Hired 9 Hours ago
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold  leading-tight">
                        Flutter Developer
                      </div>
                      <div>
                        <div className="flex justify-between mt-3 text-xs font-bold">
                          <div className="flex items-start">
                            <svg
                              className="text-gray-600 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx={12} cy={10} r={3} />
                            </svg>
                            <span className="ml-1 text-gray-600">
                              India | Mumbai
                            </span>
                          </div>
                          <div className="flex items-start ml-4">
                            <svg
                              className="text-gray-600 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                xmlns="http://www.w3.org/2000/svg"
                                x={2}
                                y={7}
                                width={20}
                                height={14}
                                rx={2}
                                ry={2}
                              />
                              <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                              />
                            </svg>
                            <span className="ml-1 text-gray-600">
                              Google (3 Years)
                            </span>
                          </div>
                        </div>
                        <div className="text-center flex flex-nowrap  text-xs">
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            Full Time
                          </span>
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            Remote
                          </span>
                          <span className=" grid place-items-center font-semibold w-4/12 mt-6 mx-1 p-1 rounded bg-gray-200 text-gray-600">
                            $30/Hr
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8 bg-indigo-100"
            id="blog-posts"
          >
            {/* Popular Post Section */}
            <div className="max-w-screen-xl mx-auto">
              <div className="xl:flex">
                <div>
                  <h3 className="leading-none font-black text-3xl">
                    Popular Posts
                  </h3>
                  <div className="flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-around">
                    <a
                      href="https://owaiskhan.me"
                      className="flex w-full max-w-sm mt-6 lg:mt-8 xl:mr-8"
                    >
                      <div className="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg bg-gray-100 relative">
                        <div
                          className="w-full h-48 bg-cover rounded-t-lg"
                          style={{
                            backgroundImage:
                              'url("https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80")',
                          }}
                        />
                        <div className="p-6">
                          <div className="text-lg font-bold">
                            Tips for creating an amazing design system
                          </div>
                          <div className="mt-2 text-gray-900 text-sm">
                            Learn how to create a new design system that is
                            beautiful and efficient for creating your UI
                            components.
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://timerse.com"
                      className="flex w-full max-w-sm mt-6 lg:mt-8 xl:mr-8"
                    >
                      <div className="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg bg-gray-100 relative">
                        <div
                          className="w-full h-48 bg-cover rounded-t-lg"
                          style={{
                            backgroundImage:
                              'url("https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80")',
                          }}
                        />
                        <div className="p-6">
                          <div className="text-lg font-bold">
                            Using a drawing tablet to create beautiful icons
                          </div>
                          <div className="mt-2 text-gray-900 text-sm">
                            Good Icons are hard to come by. This article guides
                            you on how to create beautiful sketched icons using
                            a drawing pad.
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mt-12 xl:mt-0 xl:ml-8">
                  <h3 className="leading-none font-black text-3xl">
                    Recent Posts
                  </h3>
                  <div className="flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-around xl:flex-col">
                    <a
                      href="https://owaiskhan.me"
                      className="flex w-full max-w-sm mt-6 lg:mt-8"
                    >
                      <div
                        className="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg
                    bg-gray-100 relative xl:flex xl:flex-row-reverse xl:items-center xl:px-6 xl:py-8"
                      >
                        <div
                          className="w-full h-48 bg-cover rounded-t-lg xl:w-32 xl:h-20 xl:rounded-lg xl:ml-2"
                          style={{
                            backgroundImage:
                              'url("https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=512&q=80")',
                          }}
                        />
                        <div className="p-6 xl:p-0">
                          <div className="text-lg font-bold">
                            How to work effectively with freelancers
                          </div>
                          <div className="mt-2 text-gray-900 text-sm xl:hidden">
                            Hiring a freelancer for your new project can be
                            challenging if you've never done before. Learn some
                            tips that will allow you to have a better experience
                            working with freelancers
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://owaiskhan.me"
                      className="flex w-full max-w-sm mt-6 lg:mt-8"
                    >
                      <div
                        className="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg
                    bg-gray-100 relative xl:flex xl:flex-row-reverse xl:items-center xl:px-6 xl:py-8"
                      >
                        <div
                          className="w-full h-48 bg-cover rounded-t-lg xl:w-32 xl:h-20 xl:rounded-lg xl:ml-2"
                          style={{
                            backgroundImage:
                              'url("https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80")',
                          }}
                        />
                        <div className="p-6 xl:p-0">
                          <div className="text-lg font-bold">
                            How to create smooth React Native animations
                          </div>
                          <div className="mt-2 text-gray-900 text-sm xl:hidden">
                            Animations play a vital role in user experience.
                            This article describes how you can create butter
                            smooth 60 FPS animations easily.
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="px-5 sm:px-10 md:px-20 py-8">
          <div className="flex flex-col items-center lg:flex-row-reverse justify-between">
            <div className>
              <a
                className="mx-4 text-sm font-bold text-indigo-600 hover:text-indigo-800"
                href="#"
              >
                Home
              </a>
              <a
                className="mx-4 text-sm font-bold text-indigo-600 hover:text-indigo-800"
                href="#"
              >
                About Us
              </a>
              <a
                className="mx-4 text-sm font-bold text-indigo-600 hover:text-indigo-800"
                href="#"
              >
                Careers
              </a>
            </div>

            <div className="mt-4 text-xs font-bold text-gray-500">
              © 2023 Online Job Portal
            </div>
          </div>
        </footer>
      </div>
    </Grid>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
