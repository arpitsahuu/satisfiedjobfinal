import Container from "@/components/Container";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { LuArrowUpRight } from "react-icons/lu";
import { FaHome, FaRupeeSign, FaShoppingBag } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoCashOutline, IoLocation } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AllJobs, applicationSend } from "@/redux/actions/studentAction";
import Pagination from "@/components/Pagination";
import { GrNext, GrPrevious } from "react-icons/gr";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
const Job = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(false);
  const [Page, setPage] = useState(1);
  const [search, setSearch] = useState({
    profile: "",
    location: "",
    skills:[]
  });
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState();
  const { allJobs, page, loading, student } = useSelector((e) => e.student);
  const { employee, error } = useSelector((e) => e.employee);
  console.log(student);
  console.log(allJobs)

  const [Filters, SetFilters] = useState({
    title: "",
    location: "",
    category: "",
    experience: "",
    salary: "",
    skills:[]
  });
 

 


  const handleChange = (e) => {
    if (e.target.name === "skills") {
      SetFilters({ ...Filters, [e.target.name]: [e.target.value] });
    } else {
      SetFilters({ ...Filters, [e.target.name]: e.target.value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredJobs = allJobs.filter((job) => {
      return (
        Filters.skills.length === 0 ||
        Filters.skills.some((skill) => job.skills.includes(skill))
      );

    });
  console.log(filteredJobs)
    // Dispatch the filtered jobs along with the filters
    dispatch(AllJobs({ page: Page, ...Filters, allJobs: filteredJobs }));
  };
  
  useEffect(() => {
    dispatch(AllJobs({ page: Page, ...Filters }));
  }, [Page, setPage]);

  useEffect(() => {
    dispatch(AllJobs());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleApply = async (_id) => {
    if (!appliedJobs.includes(_id)) {
      dispatch(applicationSend({ jobId: _id, resume: "a.pdf" }));
      setAppliedJobs([...appliedJobs, _id]);
    }
  };

  return (
    <div className="bg-[#F8F8F8]">
      <Layout>
        <Container>
          {!loading ? (
            <div className="min-h-[90vh]  flex px-[8%]  w-full flex-col lg:flex-row   text-black mt-[50px] md:mt-[100px] items-center justify-center md:items-start relative gap-[50px]">
              {/* mobile */}

              <SidebarLG
                handleSubmit={handleSubmit}
                handleChange={handleChange}
              />

              <div>
                <div
                  className="flex items-center justify-center mt-2 p-4 lg:hidden"
                  onClick={() => setFilter(true)}
                >
                  <CiFilter className="text-2xl text-[#008BDC] " />
                  <p>Filter</p>
                </div>
              </div>

              {filter && <SidebarSm set={setFilter}></SidebarSm>}

              {/*  */}

              <div className="w-[100%] md:w-[70%]  lg:w-[55%] h-[100vh] lg:mx-[10px] md:px-[10px] flex flex-col gap-3  pt-2 overflow-auto mb-[20px]">
                {allJobs?.map(
                  (
                    {
                      _id,
                      salary,
                      jobType,
                      description,
                      openings,
                      employer,
                      perks,
                      skills,
                      applications,
                      title,
                      category,
                      location,
                    },
                    i
                  ) => {
                    const studentApplications = student?.applications.map(
                      (application) => application.toString()
                    );
                    const jobApplications = applications?.map((application) =>
                      application.toString()
                    );

                    const isAlreadyApplied = appliedJobs.includes(_id);

                    
                    return (
                      <>
                        <div
                          key={i}
                          className="bg-white w-full h-fit px-[20px] min-w-[46%] py-[20px] flex flex-col gap-3"
                        >
                          <div className="flex border-[0.5px] rounded-[4px] px-2 w-fit border-[#8A8A8A]">
                            <p className="text-[12px]">Actively hiring</p>
                          </div>

                          <div className="flex justify-between w-full">
                            <div>
                              <h1 className="text-[14px] font-semibold  mr-[140px]">
                                {title}
                              </h1>

                              <div className="flex gap-2">
                                {skills.map((e, i) => {
                                  return (
                                    <>
                                      <p
                                        key={i}
                                        className="text-sm text-[#8A8A8A]"
                                      >
                                        {e}
                                      </p>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                            <img
                              src={employer.organisationlogo.url}
                              className="h-[18px] "
                              alt=""
                            />
                          </div>

                          <div className="flex items-center gap-1 font-[500] text-sm">
                            <IoLocation />
                            <p className="capitalize">{location}</p>
                          </div>

                          <div>
                            <div className="flex flex-wrap gap-2 lg:-0 items-center justify-between ">
                              <div className=" flex flex-col items-start justify-start text-sm  text-[#8A8A8A]">
                                <div className="flex items-center justify-center  gap-2">
                                  <MdOutlineNotStarted />
                                  <p className="">Job Type</p>
                                </div>
                                <h3 className="text-black">{jobType}</h3>
                              </div>

                              <div className=" flex flex-col items-start justify-start text-sm  text-[#8A8A8A]">
                                <div className="flex items-center justify-center  gap-2">
                                  <FaRupeeSign />
                                  <p>CTC (ANNUAL)</p>
                                </div>
                                <h3 className="text-black">{salary}</h3>
                               

                              </div>

                              <div className=" flex flex-col items-start justify-start text-sm  text-[#8A8A8A]">
                                <div className="flex items-center justify-center  gap-2">
                                  <FaShoppingBag />
                                  <p>Opening</p>
                                </div>
                                <h3 className="text-black">{openings}</h3>
                              </div>
                            </div>
                          </div>

                          <div className="w-full h-[1px] bg-gray" />

                          <div className="flex items-center gap-3 justify-end">
                        
                            <Link
                              href={`/details/${_id}`}
                              className="border-2 px-2 py-1 text-sm border-green text-green hover:bg-green hover:text-white rounded-md"
                              style={{ transition: "all .5s " }}
                            >
                              View details
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  }
                )}

                <nav aria-label="Page navigation example text-[#9DA4B0]">
                  <ul className="inline-flex -space-x-px text-base h-10">
                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight  bg-white    rounded-s-lg  dark:bg-gray-800   dark:hover:bg-gray-700 "
                      >
                        <GrPrevious />
                      </a>
                    </li>

                    {Array.from({ length: page.totalPages }).map((_, index) => {
                      return (
                        <>
                          <li key={index}>
                            <div
                              onClick={() => setPage(index + 1)}
                              className={`flex cursor-pointer ${index == page.currentPage - 1
                                  ? "bg-[#0B60B0] text-white"
                                  : ""
                                } items-center justify-center px-4 h-10   bg-white`}
                            >
                              {index + 1}
                            </div>
                          </li>
                        </>
                      );
                    })}

                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 h-10 leading-tight  bg-white   rounded-e-lg  dark:bg-gray-800   dark:hover:bg-gray-700 "
                      >
                        <GrNext />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          ) : (
            <>Loading</>
          )}
        </Container>
      </Layout>
    </div>
  );
};

export default Job;

function SidebarLG({ handleSubmit, handleChange }) {
  const [roleCategories, setRoleCategories] = useState([
    { label: "Software Developer", isChecked: false },
    { label: "IT Consulting", isChecked: false },
    { label: "BD/Pre Sales", isChecked: false },
    // Add more categories as needed
  ]);
  const [education, setEducation] = useState([
    { label: "Any Postgraduate", isChecked: false },
    { label: "MBA/PGDM", isChecked: false },
    { label: "Any Graduates", isChecked: false },
    { label: "B.E/B.Tech", isChecked: false },

    // Add more categories as needed
  ]);
  const handleCheckboxChange = (index) => {
    const updatedCategories = [...roleCategories];
    updatedCategories[index].isChecked = !updatedCategories[index].isChecked;
    setRoleCategories(updatedCategories);
  };

  return (
    <div className="side bg-white p-6  h-auto  hidden lg:inline md:w-[45%] lg:w-[35%] rounded-md">
      <div className="flex items-center justify-center mt-2 py-2">
        <CiFilter className="text-2xl text-[#008BDC] " />
        <p>Filter</p>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 text-[#ADADAD]">
          <div className="">
            <p className="text-black text-[14px] font-[600]">Profile</p>
            <input
              className="border-[1px] px-2 py-[6px] outline-none rounded-[4px] bg-[#fcfcfcd2] w-full"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="e.g markiting"
            />
          </div>
          <div className="">
            <p className="text-black text-[14px] font-[600]">Location</p>
            <input
              className="border-[1px] px-2 py-[6px] outline-none rounded-[4px] bg-[#fcfcfcd2] w-full"
              type="text"
              name="location"
              onChange={handleChange}
              placeholder="e.g sironj"
            />
          </div>

          <div>
            <p className="text-black text-[14px] font-[600]">Annual Salary</p>
            <input
              type="text"
              placeholder="enter year of experience"
              name="salary"
              onChange={handleChange}
              className="border-[1px] px-2 py-[6px] outline-none rounded-[4px] bg-[#fcfcfcd2] w-full"
            />
          </div>

          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>Work from Home</p>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>part time</p>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p> internships</p>
          </div>
          <div>
          <input type="number" placeholder="Annual Salary"/>
                      </div>
        </div>
        <div className="flex flex-col gap-[10px] mt-[20px]">
            <p className="text-black text-[14px] font-[600]">Departments</p>
            <div className="flex items-center gap-1">
           <input type="text" />
          </div>
          </div>

          <div className="flex flex-col gap-[10px] mt-[20px]">
            <p className="text-black text-[14px] font-[600]">Company Type</p>
            <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>Corporate </p>
           
          </div>
         
          </div>


          <div className="flex flex-col gap-[10px] mt-[20px]">
            <p className="text-black text-[14px] font-[600]">Industry </p>
            <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>IT Services & Consulting </p>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>Software Product </p>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>Real Estate</p>
          </div>
         
          </div>
       <div className="flex flex-col gap-[10px] mt-[20px]" >
       <p className="text-black text-[14px] font-[600]">Role </p>
       {roleCategories.map((category, index) => (
        <div className="flex items-center gap-1" key={index}>
          <input
            type="checkbox"
            checked={category.isChecked}
            onChange={() => handleCheckboxChange(index)}
          />
          <p>{category.label}</p>
        </div>
      ))}

       </div>

       <div className="flex flex-col gap-[10px] mt-[20px]" >
       <p className="text-black text-[14px] font-[600]">Education </p>
       {education.map((category, index) => (
        <div className="flex items-center gap-1" key={index}>
          <input
            type="checkbox"
            checked={category.isChecked}
            onChange={() => handleCheckboxChange(index)}
          />
          <p>{category.label}</p>
        </div>
      ))}

       </div>
      
       <div className="flex flex-col gap-[10px] mt-[20px]" >
       <p className="text-black text-[14px] font-[600]">Skills </p>
       <input type="text" name="skills" placeholder="Skills" onChange={handleChange} />

       </div>


        <div className="flex items-center justify-between mt-2">
          <div className="w-[45%] h-[1px] bg-[#ADADAD]"></div>
          <p className="text-sm capitalize text-[11px]">oR</p>
          <div className="w-[45%] h-[1px] bg-[#ADADAD]"></div>
        </div>

        {/* <p className="text-center mt-2 text-[#ADADAD] font-semibold my-3">
          Search
        </p> */}

        <div className="w-full text-center mt-5">
          <button className="btn">Search</button>
        </div>

        {/* <input
        type="text"
        placeholder="search..."
        className="border-[1px] px-2 py-[6px] border-[#ADADAD]  outline-none  bg-[#fcfcfcd2] w-full"
      /> */}
      </form>
    </div>
  );
}

function SidebarSm({ set }) {
  return (
    <div className="flex items-center  justify-center   bg-[#dadadadc] h-[120vh] w-[100vw]  absolute left-0 -top-[50px] md:-top-[100px] lg:hidden">
      <div className="side bg-white py-4  px-[10px] w-[90%]  md:w-[50%]  rounded-md">
        <div className="flex flex-col gap-3 text-[#ADADAD]">
          <div className="flex items-center justify-between text-black font-semibold">
            <p>Filter</p>
            <RxCross2 onClick={() => set(false)} />
          </div>

          <div className="">
            <p className="text-black text-[14px] font-[600]">Profile</p>
            <input
              className="border-[1px] px-2 py-[6px] outline-none rounded-[4px] bg-[#fcfcfcd2] w-full"
              type="text"
              placeholder="e.g markiting"
            />
          </div>

          <div className="">
            <p className="text-black text-[14px] font-[600]">Location</p>
            <input
              className="border-[1px] px-2 py-[6px] outline-none rounded-[4px] bg-[#fcfcfcd2] w-full"
              type="text"
              placeholder="e.g sironj"
            />
          </div>

          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>Work from Home</p>
          </div>

          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p>part time</p>
          </div>

          <div className="flex items-center gap-1">
            <input type="checkbox" />
            <p> internships</p>
          </div>

          <div>
            <p>Annual salary (in lakhs)</p>
          </div>

          <div>
            <p className="text-black text-[14px] font-[600]">
              Years of experience
            </p>
            <input
              type="text"
              placeholder="enter year of experience"
              className="border-[1px] px-2 py-[6px] outline-none rounded-[4px] bg-[#fcfcfcd2] w-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="w-[45%] h-[1px] bg-[#ADADAD]"></div>
          <p className="text-sm capitalize text-[11px]">oR</p>
          <div className="w-[45%] h-[1px] bg-[#ADADAD]"></div>
        </div>

        <p className="text-center mt-2 text-[#ADADAD] font-semibold my-3">
          Search
        </p>

        <input
          type="text"
          placeholder="search..."
          className="border-[1px] px-2 py-[6px] border-[#ADADAD]  outline-none  bg-[#fcfcfcd2] w-full"
        />
      </div>
    </div>
  );
}
