import { apiSlice } from "./apiSlice";

const gameEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation({
      query: (game) => ({
        url: "/games/",
        method: "POST",
        body: game,
      }),
    }),

    getAllGames: builder.query({
        query: () => "/games/",
      }),

      getGame: builder.query({
        query: (short_title) => `/games/${short_title}`,
      }),

  }),
  overrideExisting: false,
});

export const {useCreateGameMutation, useGetAllGamesQuery, useGetGameQuery} = gameEndpoints;