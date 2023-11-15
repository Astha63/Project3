import React, { useState, useEffect, useContext } from 'react';
import "./DashB.css";
import { useNavigate } from 'react-router-dom';
import { AiFillHome, AiFillSetting, AiFillBook } from 'react-icons/ai';
import { IoNotificationsSharp } from 'react-icons/io5';
import { BsFillLightningFill, BsPersonFill, BsPencilSquare } from 'react-icons/bs';
import AccountMenu from './AccountMenu';
import { VscBook } from "react-icons/vsc";
import ChatImage from './Img/Chat.png';
import SideBar from './SideBar';
import { AuthContext } from '../SignIn/AuthContext';

export const DashB = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="Frame">

                <div className="Footer">
                    <button className="button" onClick={() => navigate("/PatientI")}>
                        <div className="patient-info">
                            Patient
                            <br />
                            Info
                        </div>
                        <BsPersonFill className="vector-4" />
                    </button>
                </div>
                <div className="Footer">

                    <button className="button" onClick={() => navigate("/DisS")}>
                        <div className="discharge-summary">
                            Discharge
                            <br />
                            Summary
                        </div>
                        <AiFillBook className="img2" />
                    </button>
                </div>

                <div className="Footer">
                    <button className="button" onClick={() => navigate("/MedicalR")}>
                        <div className="medical-report">
                            Medical
                            <br />
                            Report
                        </div>
                        <VscBook className="vector-2" />
                    </button>
                </div>

                <div className="Footer ">
                    <button className="button" onClick={() => navigate("/OpList")}>
                        <div className="operation-notes">
                            Operation
                            <br />
                            Notes
                        </div>
                        <BsPencilSquare className="vector-4" />
                    </button>
                </div>
            </div>

            <div className="Grp2" >

                <IoNotificationsSharp className="notification-icon" />
                <BsFillLightningFill className="bolt-icon" />
                <AiFillSetting className="setting-icon" />
                <AccountMenu className="menu-icon" />
                <button className="register-btn" onClick={() => navigate("../RegisterP")}>
                    <div className="group-2">
                        <BsPersonFill className="vector-6" />
                        <div className="text9">Register Patient</div>
                    </div>
                </button>
            </div>
            <SideBar />
        </div>
    );
};

export default DashB;
