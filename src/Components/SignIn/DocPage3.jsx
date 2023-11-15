import React, { useState, useContext } from 'react';
import './DocPage2.css';
import './DocRes.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { AuthContext } from './AuthContext'; 

function DocPage3() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const [currentInstitution, setCurrentInstitution] = useState('');
    const [department, setDepartment] = useState('');
    const [yearsOfExperience, setyearsOfExperience] = useState('');
    const role = authContext.registData.role;

  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            currentInstitute: currentInstitution,
            department: department,
            yearsOfExperience: yearsOfExperience,
            username: authContext.username, 
            password: authContext.password,
            role: role,
        ...authContext.registData
        };
        console.log(data)
       

        try {
           
            const response = await axios.post('http://127.0.0.1:8000/auth/register', data);

            
               console.log(response.data)
                authContext.updateRegistData(data);

                
                console.log('Stored Registration Data:', data);

                navigate('/DashB');
            
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <>
            <div className='DocRes'>
                <div className='Rectangle Rectangle1' />
                <div className='Rectangle Rectangle2' />
                <div className='Rectangle Rectangle3' />
                <div className='TitleContainer'>
                    <h1 className='Title'>
                        AI-Based Knowledge <br /> Discovery Platform
                    </h1>
                </div>
                <div className='DocPage3'>
                    <form className='Form2' onSubmit={handleSubmit}>
                        <h2 className='FormTitleDoc'>Doctor Registration</h2>
                        <div className='DocFace '>
                            <img
                                src="https://publicpagestutorbin.blob.core.windows.net/%24web/%24web/assets/Michael_da5aae10ec.png"
                                alt="Doc Face"
                            />
                        </div>
                        <input
                            className='FormInput'
                            type='text'
                            placeholder='Current Institution'
                            required
                            value={currentInstitution}
                            onChange={(e) => setCurrentInstitution(e.target.value)}
                        />
                        <input
                            className='FormInput'
                            type='text'
                            placeholder='Enter your department'
                            required
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                        <input
                            className='FormInput'
                            type='text'
                            placeholder='Enter your yearsOfExperience'
                            required
                            value={yearsOfExperience}
                            onChange={(e) => setyearsOfExperience(e.target.value)}
                        />
                        <button className='FormButton B2' type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default DocPage3;
