import React, { useState } from "react";
import { useCreateProfileMutation } from "../redux/slices/profileApi";
import OtpInput from "react-otp-input";

const Admin = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const ADMIN_PASSWORD = "1234";

  const [createProfile, { isLoading, error, isSuccess }] =
    useCreateProfileMutation();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
    } else {
      alert("Invalid password! Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProfile({ name, address, description, profilePic }).unwrap();
      alert("Profile created successfully!");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen gap-20">
        <h2 className="uppercase font-bold text-2xl">Admin Login</h2>
        <form
          onSubmit={handlePasswordSubmit}
          className=" flex flex-col justify-around items-center gap-10"
        >
          <OtpInput
            value={password}
            onChange={setPassword}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
              <input className="w-16 h-16 text-center text-xl" {...props} />
            )}
            inputStyle={{
              width: "4rem",
              height: "4rem",
              fontSize: "1.5rem",
              borderRadius: "15px",
              border: "2px solid",
              borderColor: "black",
            }}
            containerStyle={{ gap: "1rem" }}
            inputType="password"
          />
          <button
            type="submit"
            className="ml-2 p-2 btn mt-4 btn-success text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-20 ">
      <h2 className="uppercase font-bold text-2xl">Create Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-around items-center gap-10"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <input
          type="file"
          onChange={(e) => setProfilePic(e.target.files[0])}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 btn mt-4 btn-success text-white rounded-md"
        >
          {isLoading ? "Uploading..." : "Submit"}
        </button>
      </form>

      {error && <div>Error: {error.message}</div>}
      {isSuccess && <div>Profile created successfully!</div>}
    </div>
  );
};

export default Admin;
