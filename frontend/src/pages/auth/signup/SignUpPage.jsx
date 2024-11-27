import { Link } from "react-router-dom"; // Importing the Link component for navigation between routes.
import { useState } from "react"; // Importing useState to manage form data state.

import XSvg from "../../../components/svgs/X"; // Importing a custom SVG component.

import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from "react-icons/md"; // Importing icons for form fields.
import { FaUser } from "react-icons/fa"; // Importing the user icon.
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Importing React Query hooks for mutation and query cache.
import toast from "react-hot-toast"; // Importing toast notifications for user feedback.

const SignUpPage = () => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  // React Query's query client for managing cached data
  const queryClient = useQueryClient();

  // Mutation to handle the sign-up process
  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      // API call to the server for user sign-up
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, fullName, password }),
      });

      // Parsing response
      const data = await res.json();
      if (!res.ok) {
        // Throw an error if the request was unsuccessful
        throw new Error(data.error || "Failed to create account");
      }
      return data; // Return the parsed response
    },
    onSuccess: () => {
      // Actions to perform on successful sign-up
      toast.success("Account created successfully"); // Display success message
      queryClient.invalidateQueries({ queryKey: ["authUser"] }); // Invalidate queries to refresh cached data
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Validate form fields before making an API call
    if (
      !formData.email ||
      !formData.username ||
      !formData.fullName ||
      !formData.password
    ) {
      toast.error("Please fill in all fields"); // Display error if fields are empty
      return;
    }

    mutate(formData); // Trigger the mutation with form data
  };

  // Handle input field changes and update form data state
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      {/* Left section: Display an SVG graphic for larger screens */}
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      {/* Right section: Sign-up form */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit} // Attach the form submission handler
        >
          {/* Logo for smaller screens */}
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          {/* Email input field */}
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              aria-label="Email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </label>
          {/* Username and full name input fields */}
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                aria-label="Username"
                onChange={handleInputChange}
                value={formData.username}
                required
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                aria-label="Full Name"
                onChange={handleInputChange}
                value={formData.fullName}
                required
              />
            </label>
          </div>
          {/* Password input field */}
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              aria-label="Password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
          </label>
          {/* Submit button */}
          <button
            type="submit"
            className="btn rounded-full btn-primary text-white"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Loading..." : "Sign up"}
          </button>
          {/* Display error message if sign-up fails */}
          {isError && <p className="text-red-500">{error?.message}</p>}
        </form>
        {/* Navigation to login page */}
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
