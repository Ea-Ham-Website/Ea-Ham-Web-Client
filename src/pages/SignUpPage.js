import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phNo, setPhNo] = useState("");
  const [passingYear, setPassingYear] = useState();
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [passWord, setPassWord] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const phNoChangeHandler = (e) => {
    setPhNo(e.target.value);
  };
  const passingYearChangeHandler = (e) => {
    setPassingYear(e.target.value);
  };
  const courseChangeHandler = (e) => {
    setCourse(e.target.value);
  };
  const branchChangeHandler = (e) => {
    setBranch(e.target.value);
  };
  const passWordChangeHandler = (e) => {
    setPassWord(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    Navigate("/login");
    const newUserData = {
      name: name,
      email: email,
      phNo: phNo,
      passingYear: passingYear,
      course: course,
      branch: branch,
      passWord: passWord,
    };
    const res = await axios.post(
      "http://localhost:4000/signUpPost",
      newUserData
    );
    if (res.data === "userName already exist") {
      window.alert("please fill with correct information");
    }
  };
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <label>Name</label>
        <input type="text" onChange={nameChangeHandler} value={name} />
        <label>Email</label>
        <input type="text" onChange={emailChangeHandler} value={email} />
        <label>Ph No :</label>
        <input type="text" onChange={phNoChangeHandler} value={phNo} />
        <label>Passing Year</label>
        <input
          type="number"
          onChange={passingYearChangeHandler}
          value={passingYear || ""}
        />
        <label>Course</label>
        <select name="course" onChange={courseChangeHandler} value={course}>
          <option value="btech">B.Tech</option>
          <option value="mtech">M.Tech</option>
          <option value="mca">MCA</option>
          <option value="phd">PHD</option>
        </select>
        <label>Branch</label>
        <select name="branch" onChange={branchChangeHandler} value={branch}>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECHANICAL">MECHANICAL</option>
          <option value="METALLURGY">METALLURGY</option>
          <option value="CIVIL">CIVIL</option>
          <option value="BIOTECH">BIOTECH</option>
          <option value="OTHER">OTHER</option>
        </select>
        <label>Password</label>
        <input type="text" onChange={passWordChangeHandler} value={passWord} />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default SignUpPage;
