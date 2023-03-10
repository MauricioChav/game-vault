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
      query: (developer_name) => `/games/dev/${developer_name}`,
    }),

    getGame: builder.query({
      query: (short_title) => `/games/${short_title}`,
    }),

    updateGame: builder.mutation({
      query: (game) => ({
        url: `/games/${game.id}`,
        method: "PATCH",
        body: game.data,
        headers: {
          Authorization: "Bearer " + game.token,
        },
      }),
    }),

    deleteGame: builder.mutation({
      query: (game) => ({
        url: `/games/${game.id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + game.token,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateGameMutation,
  useGetAllGamesQuery,
  useGetDevGamesQuery,
  useGetGameQuery,
  useUpdateGameMutation,
  useDeleteGameMutation
} = gameEndpoints;
