import React from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { addEducation, updateEducation } from "../../../store/reducers/profileReducer";
import moment from "moment";
import { FaSpinner } from "react-icons/fa";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: window.screen.width < 768 ? "90%" : "50%",
    padding: "0",
    zIndex: 999,
  },
};

function EducationModal({ isOpen, closeModal, currentData }) {
  const dispatch = useDispatch()

  const { loading, } = useSelector(state => ({
    loading: state.profile.loading,
  }))

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const dispatchObject = {
      education: { ...values, current_course: false },
      closeModal: closeModal
    }
    if (currentData?.id) {
      dispatch(updateEducation({ ...dispatchObject, educationId: currentData?.id }))
    } else {
      dispatch(addEducation(dispatchObject))
    }
  };


  console.log(currentData);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="job-modal-wrapper ed-modal">
          <div
            className="modal-header p-30 "
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="modal-close-btn" onClick={closeModal}>
              <IoIosClose />
            </div>
            <form className="education-form" onSubmit={handleSubmit(onSubmit)}>
              <div
                className=""
                style={{
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    textAlign: "start",
                    fontSize: 18,
                    marginBottom: 20,
                  }}
                  className="text-muted"
                >
                  {currentData?.id ? "Update" : "Add"} Education
                </h3>
              </div>

              <div>
                <label htmlFor="name" className="input-label">
                  Education <span className="text-danger">*</span>
                </label>
                <select
                  name="education"
                  className="profile-input"
                  defaultValue={currentData?.education}
                  {...register("education", { required: true })}
                >
                  <option value="">Select education</option>
                  <option value={"b.tech"}>b.tech</option>
                  <option value={"sslc"}>sslc</option>
                </select>
              </div>
              <div>
                <label htmlFor="name" className="input-label">
                  University/Institute <span className="text-danger">*</span>
                </label>
                <select
                  name="college"
                  {...register("college", { required: true })}
                  className="profile-input"
                  defaultValue={currentData?.college}

                >
                  <option value="">Select university/institute</option>
                  <option value={"CALICUT"}>CALICUT</option>
                  <option value={"KTU"}>KTU</option>
                </select>
              </div>
              <div>
                <label htmlFor="name" className="input-label">
                  Course <span className="text-danger">*</span>
                </label>
                <select
                  name="course"
                  {...register("course", { required: true })}
                  className="profile-input"
                  defaultValue={currentData?.course}
                >
                  <option value="">Select course</option>
                  <option value={"MECHANICAL"}>MECHANICAL</option>
                  <option value={"CS"}>CS</option>
                </select>
              </div>
              <div>
                <label htmlFor="name" className="input-label">
                  Specialization <span className="text-danger">*</span>
                </label>
                <select
                  name="specification"
                  {...register("specification", { required: true })}
                  className="profile-input"
                  defaultChecked={currentData?.specification}
                >
                  <option value="">Select Specialization</option>
                  <option value={"mtech"}>M.TECH</option>
                  <option value={"phd"}>PHD</option>
                </select>
              </div>
              <div style={{ marginTop: 10, marginBottom: 20 }}>
                <label htmlFor="name" className="input-label">
                  Course Type <span className="text-danger">*</span>
                </label>

                <div className="input-radio-group">
                  <div>
                    <input
                      type={"radio"}
                      id="full_time"
                      value="full_time"
                      {...register("type", { required: false })}
                      name="type"
                      defaultChecked={currentData?.type === 'full_time'}
                    />
                    <label htmlFor="full_time">Fullime</label>
                  </div>
                  <div>
                    <input
                      type={"radio"}
                      id="part_time"
                      value="part_time"
                      {...register("type", { required: false })}
                      name="type"
                      defaultChecked={currentData?.type === 'part_time'}
                    />
                    <label htmlFor="part_time">Part ime</label>
                  </div>
                  <div>
                    <input
                      type={"radio"}
                      id="correspondence"
                      value="correspondence"
                      {...register("type", { required: false })}
                      name="type"

                      defaultChecked={currentData?.type === 'correspondence'}
                    />
                    <label htmlFor="correspondence">
                      Correspondence/Distanceearnino
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="name" className="input-label">
                  Course duration <span className="text-danger">*</span>
                </label>
                <div className="course-duration">
                  <select
                    id="years"
                    name="start_date"
                    {...register("start_date", { required: false })}
                    className="profile-input"
                    defaultValue={moment(currentData?.start_date).format('YYYY').toString()}
                  >
                    <option value=""> Starting year </option>
                    <option value="2023"> 2023 </option>
                    <option value="2022"> 2022 </option>
                    <option value="2021"> 2021</option>
                    <option value="2020"> 2020 </option>
                  </select>
                  <span>To</span>
                  <select
                    id="years"
                    name="end_date"
                    {...register("end_date", { required: false })}
                    className="profile-input"
                    defaultValue={moment(currentData?.end_date).format('YYYY').toString()}
                  >
                    <option value=""> Ending year </option>
                    <option value="2023"> 2023 </option>
                    <option value="2022"> 2022 </option>
                    <option value="2021"> 2021</option>
                    <option value="2020"> 2020 </option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="name" className="input-label">
                  Grading System <span className="text-danger">*</span>
                </label>
                <select
                  name="score"
                  {...register("score", { required: true })}
                  className="profile-input"
                  defaultValue={currentData?.score}
                >
                  <option value="">select grading system</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    height: 38,
                    marginRight: 10,
                    padding: "10px 20px",
                    border: "none",
                    color: "#4892f0",
                    backgroundColor: "transparent",
                  }}
                  className=""
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  style={{
                    height: 38,
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: "#4892f0",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  type={"submit"}
                  className="button"
                >
                  Save {loading && <FaSpinner className="spinner" style={{ margin: "0 4px" }} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EducationModal;
