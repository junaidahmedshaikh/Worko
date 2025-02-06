export let Feature = [
  {
    name: "AI-Powered Job Matching",
    desc: "Leverages AI to provide personalized job recommendations, ensuring the best matches for both candidates and employers.",
  },
  {
    name: "Fast and Secure Communication",
    desc: "Real-time messaging with end-to-end encryption, enabling efficient and safe conversations between job seekers and employers.",
  },
  {
    name: "User-Friendly Interface",
    desc: "Simple, intuitive design for easy navigation and seamless interaction for both job seekers and employers.",
  },
  {
    name: "Instant Notifications and Alerts",
    desc: "Real-time updates for job seekers and employers, ensuring timely responses and quick actions.",
  },
  {
    name: "Seamless Profile Management",
    desc: "Easy profile updates for candidates and employers, simplifying job applications and recruitment processes.",
  },
  {
    name: "Advanced Search and Filter Options",
    desc: "Powerful search filters to help job seekers find relevant jobs and employers find the right candidates quickly.",
  },
];

// const mo = (
//   <Paper
//     class="w-6/12 shadow-md my-2 py-5 px-3 rounded-md"
//     className={classes.jobTileOuter}
//   >
//     <Grid>
//       <Grid>
//         <Grid item>
//           <Typography class="font-medium text-xl text-gray-700">
//             {job.title}
//           </Typography>
//         </Grid>

//         <Grid class="cardSubTitle">
//           <span class="">
//             {" "}
//             <i class="fa-solid fa-location-dot "> </i> {job.address}{" "}
//           </span>
//           <span class="">
//             <i class="fa-solid fa-building"></i> {job.companyName}
//           </span>
//         </Grid>

//         {/* <Grid item>
//           <Rating value={job.rating !== -1 ? job.rating : null} readOnly />
//         </Grid> */}

//         <Grid class="cardSubTitle">
//           <span>
//             {" "}
//             <i class="fa-solid fa-child"></i> {job.jobType}{" "}
//           </span>
//           <span>
//             {" "}
//             <i class="fa-solid fa-indian-rupee-sign"></i> {job.salary} per
//             month{" "}
//           </span>
//           <span item>
//             <i class="fa-solid fa-timeline"></i>{" "}
//             {job.duration !== 0 ? `${job.duration} month` : `Flexible`}{" "}
//             <i class="fa-solid fa-timer"></i>
//           </span>
//         </Grid>

//         <Grid class="cardSubTitle my-5">
//           <span> Number of Applicants: {job.maxApplicants} </span> {"       "}
//           <span item>
//             {" "}
//             Remaining Number of Positions:{" "}
//             {job.maxPositions - job.acceptedCandidates}{" "}
//           </span>
//         </Grid>
//         <Grid class="cardSubTitle" item>
//           Date Of Posting: {postedOn.toLocaleDateString()}
//         </Grid>

//         <Grid item xs class="flex my-5">
//           <Grid class="flex justify-items-start w-6/12">
//             <Button
//               class="w-auto"
//               className={classes.statusBlock}
//               onClick={() => handleClick(`/job/applications/${job._id}`)}
//             >
//               View Applications
//             </Button>
//           </Grid>
//           <Grid item xs class="flex w-6/12 justify-evenly">
//             <Button
//               class=""
//               className={classes.statusBlock}
//               onClick={() => {
//                 setOpenUpdate(true);
//               }}
//             >
//               Edit
//             </Button>
//             <Button
//               class=""
//               className={classes.statusBlock}
//               onClick={() => {
//                 setOpen(true);
//               }}
//             >
//               Delete
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>

//     <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
//       <Paper
//         style={{
//           padding: "20px",
//           outline: "none",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           minWidth: "30%",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h4" style={{ marginBottom: "10px" }}>
//           Are you sure?
//         </Typography>
//         <Grid container justify="center" spacing={5}>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="secondary"
//               style={{ padding: "10px 50px" }}
//               onClick={() => handleDelete()}
//             >
//               Delete
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               style={{ padding: "10px 50px" }}
//               onClick={() => handleClose()}
//             >
//               Cancel
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Modal>
//     <Modal
//       open={openUpdate}
//       onClose={handleCloseUpdate}
//       className={classes.popupDialog}
//     >
//       <Paper
//         style={{
//           padding: "20px",
//           outline: "none",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           minWidth: "30%",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h4" style={{ marginBottom: "10px" }}>
//           Update Details
//         </Typography>
//         <Grid
//           container
//           direction="column"
//           spacing={3}
//           style={{ margin: "10px" }}
//         >
//           <Grid item>
//             <TextField
//               label="Application Deadline"
//               type="datetime-local"
//               value={jobDetails.deadline.substr(0, 16)}
//               onChange={(event) => {
//                 handleInput("deadline", event.target.value);
//               }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               variant="outlined"
//               fullWidth
//             />
//           </Grid>
//           <Grid item>
//             <TextField
//               label="Maximum Number Of Applicants"
//               type="number"
//               variant="outlined"
//               value={jobDetails.maxApplicants}
//               onChange={(event) => {
//                 handleInput("maxApplicants", event.target.value);
//               }}
//               InputProps={{ inputProps: { min: 1 } }}
//               fullWidth
//             />
//           </Grid>
//           <Grid item>
//             <TextField
//               label="Positions Available"
//               type="number"
//               variant="outlined"
//               value={jobDetails.maxPositions}
//               onChange={(event) => {
//                 handleInput("maxPositions", event.target.value);
//               }}
//               InputProps={{ inputProps: { min: 1 } }}
//               fullWidth
//             />
//           </Grid>
//         </Grid>
//         <Grid container justify="center" spacing={5}>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="secondary"
//               style={{ padding: "10px 50px" }}
//               onClick={() => handleJobUpdate()}
//             >
//               Update
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               style={{ padding: "10px 50px" }}
//               onClick={() => handleCloseUpdate()}
//             >
//               Cancel
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Modal>
//   </Paper>)
