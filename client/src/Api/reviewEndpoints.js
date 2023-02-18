import { apiSlice } from "./apiSlice";

const reviewEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (review) => ({
        url: `/reviews/${review.game_id}`,
        method: "POST",
        body: review.data,
        headers: {
          Authorization: "Bearer " + review.token,
        },
      }),
    }),

    getGameReviews: builder.query({
      query: (game_id) => `/reviews/game/${game_id}`,
    }),

    getUserReviews: builder.query({
      query: (user_name) => `/reviews/user/${user_name}`,
    }),

    verifyReview: builder.query({
      query: (review) => ({
        url: `/reviews/verify/${review.game_id}`,
        headers: {
          Authorization: "Bearer " + review.token,
        },
      }),
    }),

    updateReview: builder.mutation({
      query: (review) => ({
        url: `/reviews/${review.id}`,
        method: "PATCH",
        body: review.data,
        headers: {
          Authorization: "Bearer " + review.token,
        },
      }),
    }),

    deleteReview: builder.mutation({
      query: (review) => ({
        url: `/reviews/${review.id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + review.token,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateReviewMutation,
  useGetGameReviewsQuery,
  useGetUserReviewsQuery,
  useVerifyReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewEndpoints;
