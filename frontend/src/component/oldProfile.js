// {/* <Grid
//                             container
//                             direction="column"
//                             alignItems="stretch"
//                             spacing={3}
//                         >
//                             <Grid item>
//                                 <TextField
//                                     label="Name"
//                                     value={profileDetails.name}
//                                     onChange={(event) =>
//                                         handleInput("name", event.target.value)
//                                     }
//                                     className={classes.inputBox}
//                                     variant="outlined"
//                                     fullWidth
//                                 />
//                             </Grid>
//                             <Grid item>
//                                 <ChipInput
//                                     className={classes.inputBox}
//                                     label="Skills"
//                                     variant="outlined"
//                                     helperText="Press enter to add skills"
//                                     value={profileDetails.skills}
//                                     onAdd={(chip) =>
//                                         setProfileDetails({
//                                             ...profileDetails,
//                                             skills: [
//                                                 ...profileDetails.skills,
//                                                 chip,
//                                             ],
//                                         })
//                                     }
//                                     onDelete={(chip, index) => {
//                                         let skills = profileDetails.skills;
//                                         skills.splice(index, 1);
//                                         setProfileDetails({
//                                             ...profileDetails,
//                                             skills: skills,
//                                         });
//                                     }}
//                                     fullWidth
//                                 />
//                             </Grid>
//                             <MultifieldInput
//                                 education={education}
//                                 setEducation={setEducation}
//                             />
//                             {/* <Grid item>
//                                 <ChipInput
//                                     className={classes.inputBox}
//                                     label="Skills"
//                                     variant="outlined"
//                                     helperText="Press enter to add skills"
//                                     value={profileDetails.skills}
//                                     onAdd={(chip) =>
//                                         setProfileDetails({
//                                             ...profileDetails,
//                                             skills: [
//                                                 ...profileDetails.skills,
//                                                 chip,
//                                             ],
//                                         })
//                                     }
//                                     onDelete={(chip, index) => {
//                                         let skills = profileDetails.skills;
//                                         skills.splice(index, 1);
//                                         setProfileDetails({
//                                             ...profileDetails,
//                                             skills: skills,
//                                         });
//                                     }}
//                                     fullWidth
//                                 />
//                             </Grid> */}
//                             <Grid item>
//                                 <FileUploadInput
//                                 class="file-upload-btn"
//                                     className={classes.inputBox}
//                                     label="Resume (.pdf)"
//                                     icon={<DescriptionIcon />}
//                                     uploadTo={apiList.uploadResume}
//                                     handleInput={handleInput}
//                                     identifier={"resume"}
//                                     profileDetails={profileDetails}
//                                 />
//                             </Grid>
//                             <Grid item>
//                                 <FileUploadInput
//                                 class="file-upload-btn"
//                                     className={classes.inputBox}
//                                     label="Profile Photo (.jpg/.png)"
//                                     icon={<FaceIcon />}
//                                     uploadTo={apiList.uploadProfileImage}
//                                     handleInput={handleInput}
//                                     identifier={"profile"}
//                                     profileDetails={profileDetails}
//                                 />
//                             </Grid>
//                         </Grid>
//                         <Button
//                             variant="contained"
//                             class="primaryButton"
//                             style={{ width: "auto", padding: "10px 50px", marginTop: "30px" }}
//                             onClick={() => handleUpdate()}
//                         >
//                             Update Details
//                         </Button> */}