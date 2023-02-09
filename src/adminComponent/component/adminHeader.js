import React from "react";
import { useState, useContext } from "react";
import { SignInContext } from "../../contexthandle/contextCreate";
import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
  const {signAdmin, setSignAdmin} = useContext(SignInContext)
  const [play, setPlay] = useState(false);
  const navigate = useNavigate()
  const adminName = localStorage.getItem("name")

  const showProfile = () => {
    setPlay(!play);
  };
  
 
  return (
    <div className="contain">
      <div className="row d-flex justify-content-between align-items-center my-4">
        <div className="col-2 d-flex justify-content-between">
          <img
            style={{ width: "130px", height: "40px", objectFit: "cover" }}
            src={ require("../../images/undraw_Outer_space_re_u9vd.png")}
            alt="img"
          />
        </div>
        <div className="col-4 d-flex justify-content-start">
          <h4>ADMIN BOARD</h4>
        </div>
        <div className="col-3  d-flex justify-content-end">
          <div className="border-0 rounded p-1 d-flex align-items-center w-100 " style={{backgroundColor: "#F6E9FB"}}>
            <i className="bi bi-search ps-1"></i>
            <input
              placeholder="search"
              type="text"
              className="border-0 ps-3 "
              style={{ outline: "none", backgroundColor: "#F6E9FB  " }}
            />
          </div>
        </div>
        <div className="col-3 ">
          <div className="d-flex justify-content-end gap-2 align-items-center" onClick={showProfile}>
            <img src={require("../../images/undraw_Pic_profile_re_7g2h.png")} style={{width: "50px"}} alt="profile"/>
            <p>{adminName} </p>
            {play?  <i className="bi bi-caret-down-fill" style={{color: "#7303A3"}}></i>: <i className="bi bi-caret-down" ></i>}
          </div>
          <div style={{ display: play ? "block" : "none" }} className="profileCon">
            <div className="profile p-3">
              <div className="row pb-3">
                <div className="col-7 pt-2">
                  <p className="fw-semibold m-0">{adminName}</p>
                  <p className="m-0">{signAdmin.gmail}</p>
                </div>
              </div>
              <div className="border-top text-start pt-3">
                <p onClick={()=>{ setSignAdmin([]); navigate("/")}}>Log out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
