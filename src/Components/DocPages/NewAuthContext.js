// // NewAuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// const NewAuthContext = createContext();

// export function NewAuthProvider({ children }) {
//     const [user, setUser] = useState(null);

//     const login = (userInfo) => {
//         setUser(userInfo);
//     };

//     const logout = () => {
//         setUser(null);
//     };

//     return (
//         <NewAuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </NewAuthContext.Provider>
//     );
// }

// export function useNewAuth() {
//     return useContext(NewAuthContext);
// }
