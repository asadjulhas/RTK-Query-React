import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "asad",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ['videos', 'video', 'Relatedvideos'],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      // keepUnusedDataFor: 400,
      providesTags: ['videos']
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, arg) => [
        {type: 'video', id: arg},
      ]
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
      providesTags: (result, error, arg) => [
        {type: 'Relatedvideos', id: arg.id}
      ]
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['videos']
    }),
    editVideo: builder.mutation({
      query: ({id, data}) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        'videos',
        {type: 'video', id: arg.id},
        {type: 'Relatedvideos', id: arg.id}
      ]
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        'videos',
        {type: 'video', id: arg.id},
        {type: 'Relatedvideos', id: arg.id}
      ]
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVIdeoQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } =
  apiSlice;
