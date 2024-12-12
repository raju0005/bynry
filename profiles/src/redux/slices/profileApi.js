import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bynry-six.vercel.app/api/profiles/",
  }),
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (profileData) => {
        const formData = new FormData();
        formData.append("name", profileData.name);
        formData.append("address", profileData.address);
        formData.append("description", profileData.description);
        if (profileData.profilePic) {
          formData.append("profilePic", profileData.profilePic);
        }

        return {
          url: "admin_upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    getProfiles: builder.query({
      query: () => "profiles",
    }),

    getProfileById: builder.query({
      query: (id) => `profiles/${id}`,
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfilesQuery,
  useGetProfileByIdQuery,
} = profileApi;
