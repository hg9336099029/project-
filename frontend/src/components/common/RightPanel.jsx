import { Link } from "react-router-dom"; 
// Importing the `Link` component from `react-router-dom` to handle navigation.

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton"; 
// Importing a skeleton loader component to display a loading animation when data is being fetched.

import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy"; 
// Importing a dummy data file containing user information for the "Who to follow" section.

const RightPanel = () => {
	const isLoading = false; 
	// A temporary loading state. Set to `true` if data is being fetched.

	return (
		<div className='hidden lg:block my-4 mx-2'> 
		{/* Container div is hidden on smaller screens (below 'lg' breakpoint) and has margins for spacing. */}
		
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
			{/* Panel styled with a dark background, padding, rounded corners, and positioned as sticky to stay visible during scroll. */}
			
				<p className='font-bold'>Who to follow</p> 
				{/* Section heading styled as bold. */}
				
				<div className='flex flex-col gap-4'> 
				{/* Flex container for spacing items vertically with a gap between them. */}
				
					{/* Skeleton loaders */}
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{/* When `isLoading` is true, display multiple instances of `RightPanelSkeleton` as placeholders. */}

					{/* Display user list when data is loaded */}
					{!isLoading &&
						USERS_FOR_RIGHT_PANEL?.map((user) => (
							<Link
								to={`/profile/${user.username}`} 
								// Each user links to their profile page using their username.
								
								className='flex items-center justify-between gap-4' 
								// Flex container with space between user info and the follow button.
								
								key={user._id} 
								// Unique key for React's list rendering.
							>
								<div className='flex gap-2 items-center'> 
								{/* Flex container for user avatar and name */}
								
									<div className='avatar'>
										<div className='w-8 rounded-full'> 
										{/* Rounded avatar with a default size of 8 units */}
										
											<img src={user.profileImg || "/avatar-placeholder.png"} /> 
											{/* Display user's profile image, or a placeholder if none exists */}
										</div>
									</div>
									
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'> 
										{/* User's full name with bold styling and truncation for overflow */}
										
											{user.fullName}
										</span>
										<span className='text-sm text-slate-500'>@{user.username}</span> 
										{/* Display user's username with a muted text color */}
									</div>
								</div>
								
								<div>
									<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm' 
										// Styled as a small, rounded button with hover effects.
										
										onClick={(e) => e.preventDefault()} 
										// Prevent default behavior when the button is clicked (optional functionality placeholder).
									>
										Follow 
										{/* Label for the button */}
									</button>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};
export default RightPanel; 
// Exporting the component for use in other parts of the application.
