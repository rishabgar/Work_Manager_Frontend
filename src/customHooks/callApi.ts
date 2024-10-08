// import axios from "axios";

// async function usePostApi(url: any, data: any, setResponse: any) {
//   return axios
//     .post(`${url}`, data)
//     .then((data) => {
//       console.log(data, "Post Api");
//       setResponse({
//         message: data?.data?.message,
//         success: data?.data?.success,
//         token: data?.data?.auth_token,
//         status: data.status,
//       });
//       return {
//         message: data?.data.message,
//         success: data?.data.success,
//         token: data?.data?.auth_token,
//         status: data.status,
//       };
//     })
//     .catch((data) => {
//       console.log(data, "Post Api");
//       setResponse({
//         message: data?.response?.data?.message,
//         success: data?.response?.data?.success,
//         status: data?.response?.status,
//         error: data?.data?.error,
//       });
//       return {
//         message: data?.response?.data?.message,
//         success: data?.response?.data?.success,
//         status: data?.response?.status,
//         error: data?.data?.error,
//       };
//     });
// }

// // async function useGetApi(url: any, setResponse: any) {
// //   return axios
// //     .post(`${url}`)
// //     .then((data) => {
// //       console.log(data, "Get Api");
// //       setResponse({
// //         message: data?.data?.message,
// //         success: data?.data?.success,
// //         token: data?.data?.auth_token,
// //         status: data.status,
// //       });
// //       return {
// //         message: data?.data.message,
// //         success: data?.data.success,
// //         token: data?.data?.auth_token,
// //         status: data.status,
// //       };
// //     })
// //     .catch((data) => {
// //       setResponse({
// //         message: data?.data.message,
// //         success: data?.data.success,
// //         status: data.status,
// //         error: data?.data.error,
// //       });
// //       return {
// //         message: data?.data.message,
// //         success: data?.data.success,
// //         status: data.status,
// //         error: data?.data.error,
// //       };
// //     });
// // }

// export default usePostApi;

import axios from "axios";

async function usePostApi(
  url: any,
  data: any,
  setResponse: any,
  auth_key?: any
) {
  return axios
    .post(`${url}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: auth_key,
      },
    })
    .then((data) => {
      setResponse({
        message: data?.data?.message,
        success: data?.data?.success,
        token: data?.data?.auth_token,
        status: data.status,
        data: data?.data?.allNote,
      });
      return {
        message: data?.data.message,
        success: data?.data.success,
        token: data?.data?.auth_token,
        status: data.status,
        data: data?.data?.allNote,
      };
    })
    .catch((data) => {
      setResponse({
        message: data?.response?.data?.message,
        success: data?.response?.data?.success,
        status: data?.response?.status,
        error: data?.data?.error,
      });
      return {
        message: data?.response?.data?.message,
        success: data?.response?.data?.success,
        status: data?.response?.status,
        error: data?.data?.error,
      };
    });
}

export async function useGetApi(url: any, setResponse: any, auth_key: any) {
  return axios
    .get(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: auth_key,
      },
    })
    .then((data) => {
      // console.log(data);

      setResponse({
        message: data?.data?.message,
        success: data?.data?.success,
        token: data?.data?.auth_token,
        status: data.status,
        data: data?.data?.allNote,
      });
      return {
        message: data?.data.message,
        success: data?.data.success,
        token: data?.data?.auth_token,
        status: data.status,
        data: data?.data?.allNote,
      };
    })
    .catch((data) => {
      console.log(data);

      setResponse({
        message: data?.response?.data?.message,
        success: data?.response?.data?.success,
        status: data?.response?.status,
        error: data?.data?.error,
      });
      return {
        message: data?.response?.data?.message,
        success: data?.response?.data?.success,
        status: data?.response?.status,
        error: data?.data?.error,
      };
    });
}

export default usePostApi;
