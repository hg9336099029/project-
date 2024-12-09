import { useState } from "react";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");

  const handleSetFeedType = (type) => {
    if (feedType !== type) {
      setFeedType(type);
    }
  };

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      {/* Header */}
      <div className="flex w-full border-b border-gray-700">
        <div
          className={`flex justify-center flex-1 p-3 cursor-pointer relative ${
            feedType === "forYou" ? "bg-secondary" : ""
          }`}
          onClick={() => handleSetFeedType("forYou")}
        >
          For you
          {feedType === "forYou" && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
          )}
        </div>
        <div
          className={`flex justify-center flex-1 p-3 cursor-pointer relative ${
            feedType === "following" ? "bg-secondary" : ""
          }`}
          onClick={() => handleSetFeedType("following")}
        >
          Following
          {feedType === "following" && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
          )}
        </div>
      </div>

      {/* Create Post */}
      <CreatePost />

      {/* Posts */}
      <Posts feedType={feedType} />
    </div>
  );
};

export default HomePage;
