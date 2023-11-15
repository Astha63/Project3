import React from 'react'
import { Link } from 'react-router-dom';



function Screen() {
    return (
        <>

            <div className='fixed bg-white w-full h-screen overflow-hidden text-left font-inter'>
                {/* Updated rectangles */}
                <div className='rectangle bg-[#f2e7d5] fixed bottom-[-140px] left-[50%] rounded-[31px] bg-antiquewhite-100 w-72 h-72 transform -translate-x-[-50%] rotate-[-72.08deg] origin-[0 0]'>

                    Rectangle 1
                </div>
                <div className='rectangle-2 bg-[#f2e7d5] absolute top-[240.05px] bottom-[-130px] left-[-5.94px] rounded-[31px] bg-antiquewhite-100 w-72 h-72 [transform:_rotate(30.41deg)] [transform-origin:0_0]' >


                </div>


                <div className='rectangle-3 bg-[#f2e7d5] absolute top-[-26%] left-[50%] rounded-[31px] bg-antiquewhite-100 w-72 h-72 transform -translate-x-[-50%] rotate-[20.85deg] origin-[0 0]'>
                    Rectangle 3
                </div>

                {/* Text content */}
                <div className='blah flex-row fixed font-bold font-inter text-gray-700 text-centre mt-[310px] ml-[18%] w-[90%] mb-[10%] text-3xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl'>
                    AI-Based Knowledge <br /> Discovery Platform
                </div>


                <div className='Group-3 bg-white w-full md:w-[500px] h-auto pl-10 space-y-4 flex flex-col md:flex-row md:justify-center fixed left-0 md:left-[1005px] top-[233px] right-0 md:right-[159px] bottom-0 md:bottom-[120px]'>
                    <form className='w-full md:w-[448px] mx-auto'>
                        <div>
                            <h1 className='mb-[4px] text-left w-[279px] h-[44px] ml-[-10px] text-gray-800 dark:text-white font-sans text-3xl font-semibold tracking-wide justify-center'>
                                Reset Password
                            </h1>
                        </div>

                        <p className='my-[4px] w-[258px] h-[41px] mt-[5px] md:mt-0 ml-[-7px] text-left text-[#929292]'>
                            Enter your username, We will send reset instructions to the associated email address.
                        </p>
                        <div>
                            <input
                                className='mt-[55px] md:mt-8 ml-[-10px] outline-none px-5 w-full md:w-[448px] h-12 flex-shrink-0 border border-grey-100 rounded-lg bg-white pr-10'
                                type='text'
                                placeholder='Enter your Username'
                                required
                            />
                        </div>

                        <div>
                            <button className='bg-[#6D9886] ml-[-8px] mt-8 w-full md:w-[448px] text-white font-semibold h-10  hover:bg-green-700 rounded-full hover:bg-white-600 duration-300'>
                                Sign In
                            </button>
                        </div>

                        <div className='mt-5'>
                            <p className='text-center text-gray-600'>
                                Go back to the{' '}
                                <span className='text-[#929292] font-inter text-base font-normal leading-normal'>
                                    <Link to='/'>Sign In</Link>
                                </span>
                                page
                            </p>
                        </div>
                    </form>
                </div>



            </div>
        </>
    );
}


export default Screen;