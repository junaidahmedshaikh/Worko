// <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
//   <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
//     {/* Profile Header */}
//     <div className="relative p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
//       <div className="flex items-center space-x-4">
//         <img
//           src={`${application.jobApplicant.profile}`}
//           alt={application.jobApplicant.name}
//           className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
//           onError={(e) => {
//             e.target.src =
//               "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
//           }}
//         />
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">
//            {application.jobApplicant.name}
//           </h2>
//           <p className="text-gray-600">{applicantData.title}</p>
//         </div>
//       </div>
//     </div>

//     {/* Main Content */}
//     <div className="p-6 space-y-6">
//       {/* SOP */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
//           Statement of Purpose
//         </h3>
//         <p className="text-gray-600 italic line-clamp-3">{application.sop !== "" ? application.sop : "Not Submitted"}</p>
//       </div>

//       {/* Education */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
//           Education
//         </h3>
//         <div className="space-y-3">
//           {applicantData.education.map((edu, index) => (
//             <div key={index} className="flex items-start space-x-2">
//               <FaGraduationCap className="text-blue-500 mt-1" />
//               <div>
//                 <p className="font-medium text-gray-800">{edu.degree}</p>
//                 <p className="text-sm text-gray-600">
//                   {edu.institution} • {edu.year}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Skills */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
//           Skills
//         </h3>
//         <div className="flex flex-wrap gap-2">
//           {application.jobApplicant.skills.map((skill, index) => (
//             <span
//               key={index}
//               className={`${getSkillColor(
//                 skill.level
//               )} text-white px-3 py-1 rounded-full text-sm font-medium transition transform hover:scale-105`}
//             >
//               {skill.name}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Actions */}
//     <div className="p-6 bg-gray-50 flex space-x-4">
//       <button
//         onClick={() => {
//                 setOpenEndJob(true);
//               }}
//         className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//       >
//         End Job
//       </button>
//       <a
//       style={{
//                   textDecoration: "none",
//                   color: "white",
//                 }}
//         // onClick={handleDownloadResume}
//         href={application.jobApplicant.resume}
//                 download
//         className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
//       >
//         <FiDownload />
//         <span>Download Resume</span>
//       </a>
//     </div>
//   </div>

//   {/* Confirmation Modal */}
//   {showModal && (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-6 max-w-sm w-full">
//         <h3 className="text-lg font-semibold mb-4">Confirm End Job</h3>
//         <p className="text-gray-600 mb-6">
//           Are you sure you want to end this job? This action cannot be undone.
//         </p>
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setShowModal(false)}
//             className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleEndJob}
//             className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   )}
// </div>;
