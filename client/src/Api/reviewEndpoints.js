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
  }),
  overrideExisting: false,
});

export const { useCreateReviewMutation, useGetGameReviewsQuery } =
  reviewEndpoints;
