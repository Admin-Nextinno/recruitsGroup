import React, { useState } from "react";
import { Link } from "react-router-dom";
import JobModal from "../Shared/JobModal/Jobmodal";

const SavedJobsCard = ({ jobs }) => {
  const [modalIsOpen, setIsOpen] = useState({ status: false, data: {} });

  return (
    <>
      <JobModal
        closeModal={() => setIsOpen({ data: {}, status: false })}
        applied={false}
        isOpen={modalIsOpen.status}
        job={modalIsOpen?.data}
      />

      {jobs && jobs.length
        ? jobs?.slice(0, 5)?.map((item) => {
          return (
            <div
              style={{
                width: "100%",
                height: "110px",
                borderRadius: "17px",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                padding: "10px 15px",
                display: "flex",
                marginBottom: 15
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  // gap: "10px",
                }}
              >
                <h2 style={{ fontWeight: "600", fontSize: "16px" }}>
                  {item.company}
                </h2>
                <h4
                  style={{
                    fontWeight: "400",
                    color: "#5C5B5B",
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </h4>
                <h4
                  style={{
                    fontWeight: "400",
                    color: "#5C5B5B",
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                  }}
                >
                  3 days ago &nbsp;{" "}
                  {item.applied_candidates?.length
                    ? item.applied_candidates.length + " Applicants"
                    : "Be the first to apply"}
                </h4>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "end",
                }}
              >
                <h4
                  style={{
                    fontWeight: "400",
                    color: "#5C5B5B",
                    fontSize: "13px",
                  }}
                >
                  {item.location}
                </h4>
                <h4
                  style={{
                    color: "#3B6FB1",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsOpen({ status: true, data: item })}
                >
                  VIEW DETAILS
                </h4>
              </div>
            </div>
          );
        })
        : ""}
      {jobs?.length >= 5 &&
        <Link to={'/saved-jobs'} className="savedJobViewMOre">View More</Link >
      }
    </>
  );
};

export default SavedJobsCard;
