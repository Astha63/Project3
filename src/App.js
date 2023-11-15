import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './Components/SignIn/AuthContext';
import { PatientProvider } from './Components/DocPages/PatientContext';
import { AppointmentProvider } from './Components/DocPages/AppointmentContext';
import PrivateRoute from './Components/SignIn/PrivateRoute'; // Import the PrivateRoute component

import Login from './Components/SignIn/SignIn';
import SignUp from './Components/SignIn/SignUp';
import ResetPass from './Components/SignIn/ResetPass';
import Otp from './Components/SignIn/Otp';
import DashB from './Components/DocPages/DashB';
import Do from './Components/SignIn/Do';
import OpList from './Components/DocPages/OpList';
import BookAppoint from './Components/DocPages/BookAppoint';
import ScheduleApp from './Components/DocPages/ScheduleApp';
import RescheduleAppoint from './Components/DocPages/RescheduleAppoint';
import VerifyReschedule from './Components/DocPages/VerifyReschedule';
import VerifyAppoint from './Components/DocPages/VerifyAppoint';
import VerifyCancel from './Components/DocPages/VerifyCancel';
import Appoint from './Components/DocPages/Appoint';
import CancelAppoint from './Components/DocPages/CancelAppoint';
import DisS from './Components/DocPages/DisS';
import Feedback from './Components/DocPages/Feedback';
import IP from './Components/DocPages/IP';
import Chat from './Components/DocPages/Chat';
import RegisterP from './Components/DocPages/RegisterP';
import Analysis from './Components/DocPages/Analysis';
import PatientI from './Components/DocPages/PatientI';
import MedicalR from './Components/DocPages/MedicalR';
import AccountMenu from './Components/DocPages/AccountMenu';
import OperationalN from './Components/DocPages/OperationalN';
import RegisterP2 from './Components/DocPages/RegisterP2';
import RegisterP3 from './Components/DocPages/RegisterP3';
import NewPass from './Components/SignIn/NewPass';
import DocRes from './Components/SignIn/DocRes';
import DocPage2 from './Components/SignIn/DocPage2';
import DocPage1 from './Components/SignIn/DocPage1';
import DocPage3 from './Components/SignIn/DocPage3';
import OperationCard from './Components/DocPages/OperationCard';

function App() {
  
  return (
    <AuthProvider>
      <PatientProvider>
        <AppointmentProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="SignIn" element={<Login />} />
              <Route path="SignUp" element={<SignUp />} />
              <Route path="/ResetPass"  element={<ResetPass />} />
              <Route path="/NewPass" element={<NewPass  />}/>
              <Route path='/DocRes/:roles' element={<DocRes />} />
              <Route path="/Otp" element={<Otp />}  />
              <Route path="/DocPage3" element={<DocPage3 />}  />
              <Route path="/DocPage1" element={<DocPage1 />} />
              <Route path="/DocPage2" element={<DocPage2 />}  />
              <Route path="/DashB" element={<PrivateRoute element={<DashB />} />} />
              <Route path="/Do" element={<PrivateRoute element={<Do />} />} />
              <Route path="/OpList" element={<PrivateRoute element={<OpList />} />} />
              <Route path="/BookAppoint" element={<PrivateRoute element={<BookAppoint />} />} />
              <Route path="/ScheduleApp" element={<PrivateRoute element={<ScheduleApp />} />} />
              <Route path="/RescheduleAppoint" element={<PrivateRoute element={<RescheduleAppoint />} />} />
              <Route path="/VerifyReschedule" element={<PrivateRoute element={<VerifyReschedule />} />} />
              <Route path="/VerifyCancel" element={<PrivateRoute element={<VerifyCancel />} />} />
              <Route path="/CancelAppoint" element={<PrivateRoute element={<CancelAppoint />} />} />
              <Route path="/Appoint" element={<PrivateRoute element={<Appoint />} />} />
              <Route path="/VerifyAppoint" element={<PrivateRoute element={<VerifyAppoint />} />} />

              <Route path="/Feedback" element={<PrivateRoute element={<Feedback />} />} />
              <Route path="/DisS" element={<PrivateRoute element={<DisS />} />} /> 
              <Route path="/IP" element={<PrivateRoute element={<IP />} />} />
              <Route path="/IP" element={<PrivateRoute element={<IP />} />} />
              <Route path="/AccountMenu" element={<PrivateRoute element={<AccountMenu />} />} />
              <Route path="/OperationCard" element={<PrivateRoute element={<OperationCard/>} />} />
              <Route path="/IP" element={<PrivateRoute element={<IP />} />} />
              <Route path="/Chat" element={<PrivateRoute element={<Chat />} />} />
              <Route path="/RegisterP" element={<PrivateRoute element={<RegisterP />} />} />
              <Route path="/RegisterP2" element={<PrivateRoute element={<RegisterP2 />} />} />
              <Route path="/RegisterP3" element={<PrivateRoute element={<RegisterP3 />} />} />
              <Route path="/Analysis" element={<PrivateRoute element={<Analysis />} />} />
              <Route path="/PatientI" element={<PrivateRoute element={<PatientI />} />} />
              <Route path="/MedicalR" element={<PrivateRoute element={<MedicalR />} />} />
              <Route path="/OperationalN" element={<PrivateRoute element={<OperationalN />} />} />
            
             
              
            </Routes>
              
          
          </BrowserRouter>
        </AppointmentProvider>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;

