import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import save from "../../assets/images/icons/save.png";
import send from "../../assets/images/icons/send.png";
import { getJobsInfo, getUser } from "../../core/AuthHelpers";
import { updateSavedjobs } from "../../requests/Auth";
import Comments from "../Shared/Comments";
import JobModal from "../Shared/JobModal/Jobmodal";

const JobPost = ({ jobs }) => {
  const [job, setJob] = useState();
  const [open, setOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isCommentOpen, setIsCommentOpen] = React.useState(false);
  const openModal = (e, item) => {
    setOpen(true);
    setJob(item);
  };
  console.log(jobs);

  const getDayPosted = (item) => {
    const today = new Date();
    console.log(today, item);
    // const Difference_In_Time = today.getTime() - item.getTime();
    // const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // return Difference_In_Days;
  };

  const saveJob = async (e, item) => {
    try {
      const user = getUser();
      const saved = await updateSavedjobs(item.id, { userId: user.id });
      saved && toast.success("Saved");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <JobModal
        closeModal={() => setOpen(false)}
        applied={false}
        isOpen={open}
        job={job}
      />
      <div
        style={{ width: "90%", borderRadius: "10px", backgroundColor: "#fff" }}
      >
        {jobs && jobs.length
          ? jobs.map((item) => {
              return (
                <>
                  {/* <div className="job-card-cont" style={{ padding: "3% 5%" }}>
                    <img
                      className="newjob-company-logo"
                      src={item.logo}
                      alt="company-logo"
                    />
                    <div className="new-job-company-description">
                      <span className="new-job-company-heading"></span>
                      <div className="new-job-company-desc-div">
                        <span className="new-job-company-post">
                          {item.title}
                        </span>
                        <div className="new-job-time-of-upload">
                          <span>{getDayPosted(item.created_on)}</span>
                          <span className="dot"></span>
                          <span>
                            {item.applied_candidates?.length > 0
                              ? item.applied_candidates.length + " Applicants"
                              : "No applicants yet"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="new-job-company-extra-detail">
                      <span>{item.location}</span>
                      <span
                        className="new-job-view-deatil-tag"
                        onClick={(e) => openModal(e, item)}
                      >
                        VIEW DETAILS
                      </span>
                    </div>
                  </div>
                  <img
                    src={item.description_image}
                    style={{ width: "100%" }}
                    className="job_description"
                    alt="job description"
                    onClick={(e) => openModal(e, item)}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "3% 5%",
                    }}
                  >
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div style={{ height: "30px", width: "30px" }}>
                        <img
                          style={{ height: "100%", width: "100%" }}
                          src={save}
                          alt=""
                        />
                      </div>
                      <div style={{ height: "30px", width: "30px" }}>
                        <img
                          style={{ height: "100%", width: "100%" }}
                          src={send}
                          alt=""
                        />
                      </div>
                    </div>
                    <button
                      style={{
                        width: "120px",
                        height: "45px",
                        borderRadius: "10px",
                        backgroundColor: "#FECF34",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      Apply Now
                    </button>
                  </div> */}
                  <div className="job-card-cont" style={{ padding: "3% 5%" }}>
                    <img
                      className="newjob-company-logo"
                      src={item.logo}
                      alt="company-logo"
                    />
                    <div className="new-job-company-description">
                      <span className="new-job-company-heading">
                        {item.company}
                      </span>
                      <div className="new-job-company-desc-div">
                        <span className="new-job-company-post">
                          {item.title}
                        </span>
                        <div className="new-job-time-of-upload">
                          <span>3 days ago</span>
                          <span className="dot-job-post"></span>
                          <span>
                            {item.applied_candidates?.length > 0
                              ? item.applied_candidates.length + " Applicants"
                              : "No applicants yet"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="new-job-company-extra-detail">
                      <span>{item.location}</span>
                      <span
                        onClick={() => setIsOpen(true)}
                        className="new-job-view-deatil-tag sm:font-size-10"
                      >
                        VIEW DETAILS
                      </span>
                    </div>
                  </div>
                  <img
                    src={item.description_image}
                    style={{ width: "100%" }}
                    alt="Job description"
                    onClick={(e) => openModal(e, item)}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "3% 5%",
                    }}
                  >
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div style={{ height: "30px", width: "30px" }}>
                        <i
                          style={{ fontSize: "25px", cursor: "pointer" }}
                          class="fa fa-bookmark"
                          aria-hidden="true"
                          onClick={(e) => saveJob(e, item)}
                        ></i>
                      </div>
                      <div style={{ height: "30px", width: "30px" }}>
                        <i
                          style={{ fontSize: "25px", cursor: "pointer" }}
                          class="fa fa-paper-plane"
                          aria-hidden="true"
                        ></i>
                      </div>
                      {window.location.pathname == "/applied-jobs" && (
                        <div
                          onClick={() => setIsCommentOpen(!isCommentOpen)}
                          style={{ height: "30px", width: "30px" }}
                        >
                          <i
                            style={{ fontSize: "25px", cursor: "pointer" }}
                            class={
                              isCommentOpen
                                ? "fa fa-comments"
                                : "fa fa-comments-o"
                            }
                            aria-hidden="true"
                          ></i>
                        </div>
                      )}
                    </div>
                    {window.location.pathname == "/applied-jobs" ? (
                      <span
                        style={{
                          width: "120px",
                          height: "45px",
                          display: "flex",
                          color: "black",
                          fontWeight: 500,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Applied
                      </span>
                    ) : (
                      <button
                        style={{
                          width: "120px",
                          height: "45px",
                          borderRadius: "10px",
                          backgroundColor: "#FECF34",
                          outline: "none",
                          border: "none",
                        }}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                  <Comments isOpen={isCommentOpen} />
                </>
              );
            })
          : "No Jobs Found"}
      </div>
    </>
  );
};

export default JobPost;
