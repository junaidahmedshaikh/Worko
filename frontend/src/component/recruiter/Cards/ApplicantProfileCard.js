import React from "react";

const JobCard = () => {
  return (
    <div className="max-w-lg w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-2xl p-6 shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col space-y-4">
        {/* Job Title and Company */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold"> {application.job.title}</h2>
          <p className="text-lg font-medium text-gray-300">
            {" "}
            {application.job.companyName || "Company Name"}
          </p>
        </div>

        {/* Posted By and Role */}
        <div className="flex justify-between text-sm text-gray-200">
          <p>Posted By: {application.recruiter.name}</p>
          <p>Role: {application.job.jobType}</p>
        </div>

        {/* Salary and Duration */}
        <div className="flex justify-between text-sm text-gray-200">
          <p>Salary: ₹ {application.job.salary} per month</p>
          <p>
            Duration:{" "}
            {application.job.duration !== 0
              ? `${application.job.duration} month`
              : `Flexible`}{" "}
          </p>
        </div>

        {/* Applied On and Joined On */}
        <div className="flex justify-between text-sm text-gray-200">
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
          <span className="text-sm text-gray-200">Status: </span>
          <span className="bg-green-500 px-4 py-2 text-sm font-semibold rounded-lg">
            {application.status.toUpperCase()}
          </span>
        </div>
        <>
          {application.status === "accepted" ||
          application.status === "finished" ? (
            <span item>
              <Button
                variant="contained"
                color="primary"
                className={classes.statusBlock}
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
  );
};

export default JobCard;
