export const server = "http://localhost:8080";
export const courseMLServer = "http://localhost:5000";
export const resumeParserServer = "http://localhost:5001";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  coursesuggestions: `${courseMLServer}/courses`,
  resumeparse: `${resumeParserServer}/analyze_resume`,
};

export default apiList;
