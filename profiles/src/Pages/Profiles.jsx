import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfilesQuery } from "../redux/slices/profileApi";
import {
  setSelectedProfileId,
  selectSelectedProfileId,
} from "../redux/slices/profileSlice";
import ProfileTab from "../components/ProfileTab";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Profiles = () => {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(selectSelectedProfileId);
  const { data: profiles, error, isLoading } = useGetProfilesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader />
      </div>
    );

  if (error) return <div>Error fetching profiles: {error.message}</div>;

  const handleProfileClick = (profileId) => {
    dispatch(setSelectedProfileId(profileId));
  };

  const handleClick = () => {
    navigate("/admin");
  };

  const filteredProfiles = profiles?.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-screen h-screen relative px-4 py-6 mx-auto">
      <button
        className="absolute top-7 right-10 transition-transform transform hover:scale-105"
        onClick={handleClick}
        aria-label="Go to Admin"
      >
        <FaUserPlus className="text-3xl" />
      </button>

      <h2 className="uppercase font-bold text-2xl mb-4">Profiles List</h2>

      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-600 rounded-md p-2 w-full mb-4 "
      />

      <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-5 w-full max-h-[60vh]  px-2 mt-10">
        {filteredProfiles?.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div
              key={profile._id}
              role="button"
              tabIndex={0}
              onClick={() => handleProfileClick(profile._id)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleProfileClick(profile._id)
              }
              className="bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 flex flex-col justify-center items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-transform transform hover:scale-105 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-4/5 sm:w-[80%] md:w-[80%] max-w-xs"
            >
              <img
                src={profile.profilePic}
                className="object-cover h-[130px] w-[130px] rounded-2xl mb-2 border border-black"
                alt={profile.name}
              />
              <h3 className="uppercase font-bold text-center">
                {profile.name}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full mt-4">No profiles found.</p>
        )}
      </div>

      {selectedProfileId && <ProfileTab />}
    </div>
  );
};

export default Profiles;
