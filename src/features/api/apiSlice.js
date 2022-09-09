import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "asad",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 200,
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    getRelatedVIdeo: builder.query({
      query: ({ id, title }) => {
        const gettitle = title.split(" ");
        let mainTitle = gettitle?.filter((t) => t.length > 2)

        let newURL = "";
        const tageLike = "title_like=";
        mainTitle?.map((t) => {
          newURL = newURL + tageLike + t + "&";
        });
        const finalURL = newURL + `id_ne=${id}&_limit=5`;
        return `/videos/?${finalURL}`;
      },
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVIdeoQuery } =
  apiSlice;
