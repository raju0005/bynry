import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedProfileId,
  resetSelectedProfileId,
} from "../redux/slices/profileSlice";
import { useGetProfileByIdQuery } from "../redux/slices/profileApi";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ProfileTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProfileId = useSelector(selectSelectedProfileId);
  const { data, error, isLoading } = useGetProfileByIdQuery(selectedProfileId);

  // if (isLoading) return  <div className="flex justify-center items-center w-screen h-screen"><Loader/></div>;

  if (error) return <div>Error fetching profile: {error.message}</div>;

  const handleClose = () => {
    dispatch(resetSelectedProfileId());
  };

  const handleSummaryClick = () => {
    if (data && data.address) {
      const city = data.address;
      navigate(`/map/${city}`);
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border flex justify-center items-center">
      {data && (
        <div className="bg-grid-gradient relative h-[350px] w-[370px] p-3 flex justify-around gap-3 items-center flex-col rounded-xl border-gray-300 border-[3px]">
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 text-white p-2 rounded-full transition-transform transform hover:scale-105"
          >
            <IoCloseCircle className="text-3xl" />
          </button>
          <h3 className="uppercase font-bold text-lg">{data.name}</h3>
          <img
            src={data.profilePic}
            className="object-cover h-[130px] w-[130px] rounded-2xl border border-black"
            alt={data.name}
            width={100}
          />
          <p className="">
            <strong>Address:</strong> {data.address}
          </p>
          <p>
            <strong>Description:</strong> {data.description}
          </p>

          <button
            onClick={handleSummaryClick}
            className=" mt-4 btn-success text-white py-2 px-4 bg-green-500 rounded transition-transform transform hover:scale-105"
          >
            View Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
