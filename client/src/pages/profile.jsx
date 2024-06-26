import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

import React, { useEffect, useRef, useState } from "react";
import {
  IoIosCamera,
  IoIosInformationCircleOutline,
  IoMdClose,
} from "react-icons/io";
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import {
  MdModeEditOutline,
  MdOutlineCastForEducation,
  MdOutlineKeyboardArrowRight,
  MdOutlineMenuBook,
  MdOutlineModeEdit,
} from "react-icons/md";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  avatarStudent,
  currentStudent,
  updateStudent,
  uploadResuma,
} from "@/redux/actions/studentAction";
import Loading from "./Loading";
import { FaEye } from "react-icons/fa";
const Profile = () => {
  const [experienceForm, setExpressionForm] = useState(false);
  const [education, setEducation] = useState(false);
  const [skill, setSkill] = useState(false);
  const [languages, setLanguages] = useState(false);
  const [generalInfo, setGeneralInfo] = useState(false);
  const [showResuma, setshowResuma] = useState(false);
  const { student, error, loading } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentStudent());
  }, [updateStudent]);
  const router=useRouter()
  const [studentProfile, setStudentProfile] = useState({
    avatar: { fileId: "", url: "" },
    firstname: "",
    lastname: "",
    email: "apj@example.com",
    internships: [],
    jobs: [],
    education: [],
    skills: [],
    languages: [],
    contact: "",
    city: "example",
    gender: "male",
    avatar: "",
  });

  useEffect(() => {
    if (student) {
      setStudentProfile((prevStudentProfile) => ({
        ...prevStudentProfile,
        ...student, // Update only the fields that exist in student
      }));
    }
  }, [student]);

  const [selectedFile, setSelectedFile] = useState(null);
  const formRef = useRef();
  const inputRef = useRef();
  const btnRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    btnRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      dispatch(avatarStudent(selectedFile));
    } else {
      console.log("No file selected");
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  /* Resuma */

  const [selectedResuma, setSelectedResuma] = useState(null); // Using "Resuma" in the variable name
  const formRefResuma = useRef();
  const inputRefResuma = useRef();
  const btnRefResuma = useRef();

  const handleFileChangeResuma = (event) => {
    const file = event.target.files[0];
    setSelectedResuma(file);
    btnRefResuma.current.click();
  };

  const handleSubmitResuma = async (event) => {
    event.preventDefault();
    if (selectedResuma) {
      dispatch(uploadResuma(selectedResuma));
      console.log("resuma selected", selectedResuma);
    } else {
      console.log("No Resuma selected");
    }
  };

  const handleAddResumaClick = () => {
    inputRefResuma.current.click();
  };
const handlCreateResume=()=>{
  router.push('/CreateResume')
}
  return (
    <Layout>
      {loading && <Loading />}
      <Container bgColor={"#F4F5F7"}>
      <div className="w-auto flex flex-col md:flex-row justify-center gap-4 px-2 min-h-[100vh] md:mt-[100px]">

        <div className="flex  flex-col gap-3 items-center">
            <div className=" flex flex-col justify-evenly items-center md:items-start min-h-[130px]   h-fit px-[20px] py-[10px] bg-white gap-3 rounded-md">
              <div
                onClick={handleClick}
                className="w-full h-[100px] flex items-center justify-center text-2xl rounded-full "
              >
                {student?.avatar.url ? (
                  <img
                    src={student.avatar.url}
                    className="w-[100px] h-[100px] rounded-full"
                    alt=""
                  />
                ) : (
                  <IoIosCamera className="text-[#8C8594]" />
                )}
              </div>

              <div className="flex justify-center items-center flex-col gap-[5px] w-[47vw]">
                <p className="text-lg font-semibold flex items-center gap-[20px]">
                  {studentProfile.firstname} {studentProfile.lastname}
                  <span>
                    <MdModeEditOutline
                      onClick={() => setGeneralInfo((e) => !e)}
                      className="cursor-pointer"
                    />
                  </span>
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="hidden">
                  <input
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <button ref={btnRef} type="submit">
                    Submit
                  </button>
                </form>

                {generalInfo && (
                  <UpdateGeneralInfo
                    set={setGeneralInfo}
                    studentProfile={studentProfile}
                    setStudentProfile={setStudentProfile}
                  />
                )}
                <div className="flex  justify-center items-center gap-1 font-[300] text-[15px]">
                  <MdOutlineMenuBook className="text-[#8C8594] flex items-center" />
                  <p className="flex items-center">{studentProfile?.course || "Bca"}</p>
                </div>
                <div className="flex items-center gap-1 font-[300] text-[15px]">
                  <IoLocationOutline className="text-[#8C8594]" />
                  <p>{studentProfile?.city}</p>
                </div>
                <div className="flex items-center gap-1 font-[500] text-green text-[15px]">
                  <AiOutlineShareAlt className="" />
                  <p>Share Profile</p>
                </div>
              </div>
            </div>

            <div className="w-full justify-evenly flex min-h-[130px]   h-fit px-[20px] py-[10px] bg-white gap-[100px] rounded-md ">
              <div className="flex flex-col gap-2 ">
                <div>
                  <p className="text-[13px] text-[#79777a]">Email ID</p>
                  <p className="text-[14px]">{studentProfile.email}</p>
                </div>
                <div>
                  <p className="text-[13px] text-[#79777a]">Current Location</p>
                  <p className="text-[14px]">Bhopal</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-[13px] text-[#79777a]">Phone Number</p>
                  <p className="text-[14px]">{studentProfile.contact}</p>
                </div>

                <div>
                  <p className="text-[13px] text-[#79777a]">Gender</p>
                  <p className="text-[14px]">{studentProfile.gender}</p>
                </div>
              </div>
              
            </div>
            <button className="w-full hover:bg-sky-800 py-2 px-4 bg-sky-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">Add resume</button>
            <button className="w-full hover:bg-sky-800 py-2 px-4 bg-sky-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200 ease-in-out" onClick={handlCreateResume}>Create resume</button>


          </div>
     
        </div>
      </Container>
    </Layout>
  );
};

export default Profile;

function UpdateGeneralInfo({ set, studentProfile, setStudentProfile }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(updateStudent(data));
    set(false);
  });

  useEffect(() => {
    // dispatch(currentStudent());
    setValue("firstname", studentProfile.firstname);
    setValue("lastname", studentProfile.lastname);
    setValue("email", studentProfile.email);
    setValue("contact", studentProfile.contact);
    setValue("gender", studentProfile.gender);
    setValue("city", studentProfile.city);
  }, []);

  useEffect(() => {
    dispatch(currentStudent());
  }, [dispatch]);

  return (
    <div className="absolute  top-0 left-0 flex items-center justify-center min-h-[100vh] w-[100vw] bg-[#49494aca] ">
      <div
        className=" flex flex-col gap-[20px] top-[50%] left-[50%] w-full h-full md:h-fit md:w-[50%] px-[10px] md:px-[25px] py-[20px]  md:rounded-lg bg-white "
        style={{ transition: "height 2s ease-in-out" }}
      >
        <div className="flex items-center text-sm md:text-lg  justify-between   font-semibold ">
          <h1 className="">General Info</h1>
          <RxCross2 className="cursor-pointer" onClick={() => set(false)} />
        </div>
        <div className="w-full h-[.1px] bg-[#00000092]"></div>

        <form onSubmit={onSubmit} className="capitalize">
          <div className="space-y-2">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full   px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("firstname", { required: true })}
                    />
                    {errors.firstname && (
                      <p className="text-[15px] text-red-500">
                        please Enter first Name.
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full  px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("lastname", { required: true })}
                    />
                    {errors.lastname && (
                      <p className="text-[15px] text-red-500">
                        please Enter lastname Name.
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full   px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="text-[15px] text-red-500">
                        please Enter email
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        city
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="city"
                          className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("city", { required: true })}
                        />
                        {errors.city && (
                          <p className="text-[15px] text-red-500">
                            please Enter City
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender
                      </label>
                      <div className="mt-2">
                        <select
                          id="gender"
                          name="gender"
                          autoComplete="gender"
                          className="block w-full px-2 py-1.5 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("gender", { required: true })}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                        {errors.gender && (
                          <p className="text-[15px] text-red-500">
                            Please select a gender
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contract
                      </label>
                      <div className="mt-2">
                        <input
                          id="contact"
                          name="contact"
                          type="text"
                          autoComplete="contact"
                          className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("contact", { required: true })}
                        />
                        {errors.contact && (
                          <p className="text-[15px] text-red-500">
                            please Enter contact
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => set(false)}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[##4982b7] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f91ce]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// components/JobApplicationModal.js
