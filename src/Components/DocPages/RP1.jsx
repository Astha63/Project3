import React from 'react'

function RP1() {
  return (
    <>
        <div className='RP1'>
            <div className='Rectangle Rectangle1' />
            <div className='Rectangle Rectangle2' />
            <div className='Rectangle Rectangle3' />
            <div className='TitleContainer'>
                <h1 className='Title'>
                    AI-Based Knowledge <br /> Discovery Platform
                </h1>
            </div>
            <div className='RPage1'>
                <form className='Form' onSubmit={handleSubmit}>
                    <h2 className='FormTitle'>Doctor Registration</h2>


                    <input
                        className='FormInput'
                        type='text'
                        placeholder='Enter your full name'
                        required
                        value={fullName}
                        onChange={handleFullNameChange}
                    />
                    <input
                        className='FormInput'
                        type='email'
                        placeholder='Enter your email'
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <div className='DateP'>
                        <DateP placeholder="Date Of Birth" onChange={handleDateChange} />
                    </div>
                    <div>
                        <PhoneN onChange={handlePhoneChange} />
                    </div>

                    <div className="button-group">
                        <button
                            className={`button1 ${selectedGender === 'Male' ? 'selected' : ''}`}
                            onClick={() => handleGenderClick('Male')}
                            type="button"
                        >
                            Male
                        </button>
                        <button
                            className={`button2 ${selectedGender === 'Female' ? 'selected' : ''}`}
                            onClick={() => handleGenderClick('Female')}
                            type="button"
                        >
                            Female
                        </button>
                        <button
                            className={`button3 ${selectedGender === 'Other' ? 'selected' : ''}`}
                            onClick={() => handleGenderClick('Other')}
                            type="button"
                        >
                            Other
                        </button>
                    </div>
                    <button className='FormButton B2' type='submit'>
                        Next
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

 
export default RP1