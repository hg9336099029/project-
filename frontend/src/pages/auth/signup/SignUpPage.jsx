import { Link } from "react-router-dom"; // Import the `Link` component for navigating between pages without reloading
import { useState } from "react"; // Import React's `useState` hook to manage state within the component

import XSvg from "../../../components/svgs/X"; // Import a custom SVG logo from a relative path

// Import specific icons from the `react-icons` library for use in the UI
import { MdOutlineMail } from "react-icons/md"; // Icon for the email field
import { FaUser } from "react-icons/fa"; // Icon for the username field
import { MdPassword } from "react-icons/md"; // Icon for the password field
import { MdDriveFileRenameOutline } from "react-icons/md"; // Icon for the full name field

const SignUpPage = () => {
  // State to hold form data (email, username, full name, and password)
  const [formData, setFormData] = useState({
    email: "", // Initial value for email is an empty string
    username: "", // Initial value for username is an empty string
    fullName: "", // Initial value for full name is an empty string
    password: "", // Initial value for password is an empty string
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading when the form is submitted
    console.log(formData); // Logs the current form data in the browser's console
  };

  // Function to update the form data state when an input field value changes
  const handleInputChange = (e) => {
    // Update the corresponding field in the state based on the input's `name` attribute
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Placeholder for error handling
  const isError = false; // Set to `true` if there's an error to show an error message

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      {/* Container div for the signup page. 
          Divided into a left section (for large screens) and a right section (for the form) */}
      
      {/* Left section */}
      <div className="flex-1 hidden lg:flex items-center justify-center">
        {/* The custom SVG logo is only visible on large screens */}
        <XSvg className="lg:w-2/3 fill-white" />
      </div>

      {/* Right section */}
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Sign-up form */}
        <form
          className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}>
          {/* Display the logo for smaller screens */}
          <XSvg className="w-24 lg:hidden fill-white" />

          {/* Page title */}
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>

          {/* Email input */}
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail /> {/* Email icon */}
            <input
              type="email"
              className="grow" // Makes the input take up remaining space
              placeholder="Email" // Placeholder text shown in the input field
              name="email" // Used to identify the field in the `handleInputChange` function
              onChange={handleInputChange} // Update state when the input value changes
              value={formData.email} // Set the input value from state
            />
          </label>

          {/* Username and Full Name input fields */}
          <div className="flex gap-4 flex-wrap">
            {/* Username input */}
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser /> {/* Username icon */}
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>

            {/* Full Name input */}
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <MdDriveFileRenameOutline /> {/* Full name icon */}
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </label>
          </div>

          {/* Password input */}
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword /> {/* Password icon */}
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>

          {/* Submit button */}
          <button className="btn rounded-full btn-primary text-white">
            Sign up
          </button>

          {/* Conditional error message */}
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>

        {/* Navigation to the login page */}
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to="/login">
            {/* Button to navigate to the login page */}
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; // Export the component so it can be used in other parts of the app
