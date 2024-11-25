// Import React's `useState` hook to manage component state
import { useState } from "react";
// Import `Link` component from `react-router-dom` for page navigation without reloading
import { Link } from "react-router-dom";

// Import a custom SVG logo component
import XSvg from "../../../components/svgs/X";

// Import icons from the `react-icons` library
import { MdOutlineMail } from "react-icons/md"; // Icon for email/username input
import { MdPassword } from "react-icons/md"; // Icon for password input

// Define the `LoginPage` component
const LoginPage = () => {
  // State to store the form data (username and password)
  const [formData, setFormData] = useState({
    username: "", // Initial value for the username field is an empty string
    password: "", // Initial value for the password field is an empty string
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (e.g., page reload)
    console.log(formData); // Logs the current state of the form data to the console
  };

  // Function to handle input changes and update the state
  const handleInputChange = (e) => {
    // Update the corresponding field in `formData` based on the input's `name` attribute
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Placeholder variable for error handling
  const isError = false; // Can be set to `true` to display an error message

  // JSX for rendering the login page
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      {/* Left section: Visible only on large screens */}
      <div className="flex-1 hidden lg:flex items-center justify-center">
        {/* Displays a custom SVG logo */}
        <XSvg className="lg:w-2/3 fill-white" />
      </div>

      {/* Right section: Contains the login form */}
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Login form */}
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          {/* Mobile-friendly SVG logo (hidden on large screens) */}
          <XSvg className="w-24 lg:hidden fill-white" />

          {/* Page title */}
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>

          {/* Username input field */}
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail /> {/* Username icon */}
            <input
              type="text"
              className="grow" // Makes the input field expand to fill available space
              placeholder="username" // Placeholder text for the input
              name="username" // Used to identify this input field in state updates
              onChange={handleInputChange} // Updates state when the value changes
              value={formData.username} // Sets the input value from the state
            />
          </label>

          {/* Password input field */}
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

          {/* Login button */}
          <button className="btn rounded-full btn-primary text-white">
            Login
          </button>

          {/* Error message (conditionally displayed) */}
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>

        {/* Section for navigation to the signup page */}
        <div className="flex flex-col gap-2 mt-4">
          {/* Text prompting the user to create an account */}
          <p className="text-white text-lg">{"Don't"} have an account?</p>

          {/* Link to the signup page */}
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be used in other parts of the app
export default LoginPage;
