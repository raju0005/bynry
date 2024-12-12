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

const Profiles = () => {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(selectSelectedProfileId);
  const { data: profiles, error, isLoading } = useGetProfilesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (isLoading) return <div>Loading profiles...</div>;
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
    <div className="flex flex-col justify-around items-center w-screen h-screen relative">
      <button className="absolute top-7 right-10  transition-transform transform hover:scale-105 " onClick={handleClick}>
        <FaUserPlus className="text-3xl" />
      </button>
      <h2 className="uppercase font-bold text-2xl">Profiles List</h2>
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-600 rounded-md p-2 w-[80%] mb-4"
      />
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 h-[70%] w-[90%] overflow-auto">
        {filteredProfiles?.map((profile) => (
          <div
            key={profile._id}
            className="bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 flex flex-col justify-around items-center max-h-[40%] min-w-[40%]  p-2 border-2 border-white rounded-[32px] cursor-pointer transition-transform transform hover:scale-105 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            onClick={() => handleProfileClick(profile._id)}
          >
            <img
              src={profile.profilePic}
              className="object-cover h-[130px] w-[130px] rounded-3xl"
              alt={profile.name}
            />
            <h3 className="uppercase font-bold">{profile.name}</h3>
          </div>
        ))}
      </div>
      {selectedProfileId && <ProfileTab />}
    </div>
  );
};

export default Profiles;
