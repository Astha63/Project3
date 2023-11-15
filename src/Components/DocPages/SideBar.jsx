import React from 'react'
import ChatImage from './Img/Chat.png';
import "./DashB.css";
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const navigate = useNavigate();

  return (
    <>
    <div className="rectangle" />
            <div className="group">
              <button className="text11 button" onClick={() => navigate("/DashB")}>Home</button>
                <button className="text2 button" onClick={() => navigate("/IP")}>IP Patients</button>
                <button className="text3 button" onClick={() => navigate("/Appoint")}>Appointments</button>
                <button className="text4 button" onClick={() => navigate("/ScheduleApp")}>Book Appointment</button>
                <button className="text10 button" onClick={() => navigate("/BookAppoint")}>IPD</button>
                <button className="text5 button" onClick={() => navigate("/Analysis")}>Analysis</button>
                <button className="text6 button" onClick={() => navigate("/Feedback")}>Feedbacks</button>
            </div>
            <div className="chat-card">
                <div className="overlap-2 ">
                    <button className="button">
                        <img className="chat" alt="Wechat filled" src={ChatImage} />
            <button className="text7" onClick={() => navigate("/Chat")}>Chat</button>
             <button className="chat" src={ChatImage} onClick={() => navigate("/Chat")}></button>
             

                    </button>
                </div>
            </div>
            <div className="AI-knowledge">
                AI-Knowledge
                <br />
                Discovery
            </div>
            </>
  )
}

export default SideBar;