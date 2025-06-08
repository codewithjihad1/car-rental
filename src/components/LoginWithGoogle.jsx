import React from 'react'

const LoginWithGoogle = ({ handleGoogleLogin, buttonText = "Login with Google" }) => {

    return (
        <button
            onClick={handleGoogleLogin}
            className="btn bg-white dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 w-full h-auto hover:scale-105 text-black text-base border-[#e5e5e5] transition-all duration-200 py-3 rounded-full"
        >
            <svg className='rounded-full' aria-label="Google logo" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
            </svg>
            {buttonText}
        </button>
    )
}

export default LoginWithGoogle;