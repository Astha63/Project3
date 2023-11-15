
// import "./DashB.css";


// import React, { useState, useRef, useEffect } from 'react';


// const UserProfile = ({ user }) => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const userName = user?.firstName || ''; // Use the user's first name from props
//     const userInitial = userName ? userName.charAt(0) : '';

//     const handleDocumentClick = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsDropdownOpen(false);
//         }
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleLogout = () => {
//         // Implement your logout logic here (e.g., clear user session, redirect to login page)
//         // For example, you can use localStorage to clear user data and redirect
//         localStorage.removeItem('user'); // Clear user data from localStorage
//         window.location.href = '/login'; // Redirect to the login page
//     };

//     useEffect(() => {
//         document.addEventListener('click', handleDocumentClick);
//         return () => {
//             document.removeEventListener('click', handleDocumentClick);
//         };
//     }, []);

//     return (
//         <div className="user-profile">
//             <div className="initial-letter" onClick={toggleDropdown}>
//                 {userInitial}
//             </div>
//             {isDropdownOpen && (
//                 <div className="dropdown" ref={dropdownRef}>
//                     <div className="dropdown-item" onClick={handleLogout}>
//                         Logout
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserProfile;


import "./DashB.css";
import React, { useState } from 'react';

const UserProfile = ({ user, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const userInitial = user ? user.firstName.charAt(0) : '';

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        
        localStorage.removeItem('user'); 
        onLogout();
    };

    return (
        <div className="user-profile">
            <div className="profile-icon" onClick={toggleDropdown}>
                {userInitial}
            </div>
            {isDropdownOpen && (
                <div className="dropdown">
                    <div className="dropdown-item" onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;

