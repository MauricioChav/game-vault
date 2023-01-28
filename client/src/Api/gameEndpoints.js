import { apiSlice } from "./apiSlice";

const gameEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation({
      query: (game) => ({
        url: "/games/",
        method: "POST",
        body: game.data,
        headers: {
          Authorization: "Bearer " + game.token,
        },
      }),
    }),

    getAllGames: builder.query({
        query: () => "/games/",
      }),

      getDevGames: builder.query({
        query: (developer_id) => `/games/dev/${developer_id}`,
      }),

      getGame: builder.query({
        query: (short_title) => `/games/${short_title}`,
      }),

  }),
  overrideExisting: false,
});

export const {useCreateGameMutation, useGetAllGamesQuery, useGetDevGamesQuery, useGetGameQuery} = gameEndpoints;