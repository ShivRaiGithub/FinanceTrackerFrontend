// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//   GetKpisResponse,
//   GetProductsResponse,
//   GetTransactionsResponse,
// } from "./types";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
//   reducerPath: "main",
//   tagTypes: ["Kpis", "Products", "Transactions"],
//   endpoints: (build) => ({
//     getKpis: build.query<Array<GetKpisResponse>, void>({
//       query: () => "kpi/kpis/",
//       providesTags: ["Kpis"],
//     }),
//     getProducts: build.query<Array<GetProductsResponse>, void>({
//       query: () => "product/products/",
//       providesTags: ["Products"],
//     }),
//     getTransactions: build.query<Array<GetTransactionsResponse>, void>({
//       query: () => "transaction/transactions/",
//       providesTags: ["Transactions"],
//     }),
//   }),
// });

// export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
//   api;


// //   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import {
// //   GetKpisResponse,
// //   GetProductsResponse,
// //   GetTransactionsResponse,
// // } from "./types";
// // import { kpis, products, transactions } from "../data/data";

// // export const api = createApi({
// //   baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
// //   reducerPath: "main",
// //   tagTypes: ["Kpis", "Products", "Transactions"],
// //   endpoints: (build) => ({
// //     getKpis: build.query<Array<GetKpisResponse>, void>({
// //       query: () => "kpi/kpis/",
// //       providesTags: ["Kpis"],
// //       async onQueryStarted(_arg, { queryFulfilled }) {
// //         try {
// //           const { data } = await queryFulfilled;
// //           console.log("KPIs data:", data);
// //         } catch (error) {
// //           console.error("Error fetching KPIs:", error);
// //         }
// //       },
// //     }),
// //     getProducts: build.query<Array<GetProductsResponse>, void>({
// //       query: () => "product/products/",
// //       providesTags: ["Products"],
// //       async onQueryStarted(_arg, { queryFulfilled }) {
// //         try {
// //           const { data } = await queryFulfilled;
// //           console.log("Products data:", data);
// //         } catch (error) {
// //           console.error("Error fetching Products:", error);
// //         }
// //       },
// //     }),
// //     getTransactions: build.query<Array<GetTransactionsResponse>, void>({
// //       query: () => "transaction/transactions/",
// //       providesTags: ["Transactions"],
// //       async onQueryStarted(_arg, { queryFulfilled }) {
// //         try {
// //           const { data } = await queryFulfilled;
// //           console.log("Transactions data:", data);
// //         } catch (error) {
// //           console.error("Error fetching Transactions:", error);
// //         }
// //       },
// //     }),
// //     }),
// //   })


// // export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;