// Importing required SVG component and icons from libraries
import XSvg from "../svgs/X"; // Custom SVG component for the application logo

// Importing icons from react-icons library
import { MdHomeFilled } from "react-icons/md"; // Icon for "Home"
import { IoNotifications } from "react-icons/io5"; // Icon for "Notifications"
import { FaUser } from "react-icons/fa"; // Icon for "User Profile"
import { Link } from "react-router-dom"; // Used for navigation between routes
import { BiLogOut } from "react-icons/bi"; // Icon for "Logout"

// Sidebar component definition
const Sidebar = () => {
    // Mock user data
    const data = {
        fullName: "John Doe", // User's full name
        username: "johndoe", // User's username
        profileImg: "/avatars/boy1.png", // Path to user's profile image
    };

    return (
        // Parent container for the sidebar
        <div className='md:flex-[2_2_0] w-18 max-w-52'>
            {/* Sticky container to ensure the sidebar stays in view */}
            <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
                {/* Application logo */}
                <Link to='/' className='flex justify-center md:justify-start'>
                    <XSvg className='px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900' />
                </Link>

                {/* Navigation links */}
                <ul className='flex flex-col gap-3 mt-4'>
                    {/* Home link */}
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <MdHomeFilled className='w-8 h-8' /> {/* Home icon */}
                            <span className='text-lg hidden md:block'>Home</span> {/* Visible on medium screens */}
                        </Link>
                    </li>

                    {/* Notifications link */}
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/notifications'
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <IoNotifications className='w-6 h-6' /> {/* Notifications icon */}
                            <span className='text-lg hidden md:block'>Notifications</span>
                        </Link>
                    </li>

                    {/* Profile link */}
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to={`/profile/${data?.username}`} // Dynamic link to user's profile
                            className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <FaUser className='w-6 h-6' /> {/* User icon */}
                            <span className='text-lg hidden md:block'>Profile</span>
                        </Link>
                    </li>
                </ul>

                {/* User profile and logout section */}
                {data && (
                    <Link
                        to={`/profile/${data.username}`} // Dynamic link to user's profile
                        className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
                    >
                        {/* User avatar */}
                        <div className='avatar hidden md:inline-flex'>
                            <div className='w-8 rounded-full'>
                                <img src={data?.profileImg || "/avatar-placeholder.png"} /> {/* Fallback avatar */}
                            </div>
                        </div>

                        {/* User information and logout icon */}
                        <div className='flex justify-between flex-1'>
                            <div className='hidden md:block'>
                                <p className='text-white font-bold text-sm w-20 truncate'>{data?.fullName}</p> {/* Full name */}
                                <p className='text-slate-500 text-sm'>@{data?.username}</p> {/* Username */}
                            </div>
                            <BiLogOut className='w-5 h-5 cursor-pointer' /> {/* Logout icon */}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Sidebar; // Exporting the component for use in other parts of the application
