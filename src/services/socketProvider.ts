// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// declare global {
//   interface Window {
//     Echo: Echo;
//     Pusher: typeof Pusher;
//   }
// }

// const socketProvider = (userToken?: string) => {
//   if (!window.Pusher || !window.Echo) {
//     try {
//       window.Pusher = Pusher;

//       window.Echo = new Echo({
//         broadcaster: "pusher",
//         key: process.env.REACT_APP_PUSHER_KEY,
//         cluster: process.env.REACT_APP_PUSHER_CLUSTER,
//         forceTLS: true,
//         enabledTransports: ["ws", "wss"],
//         authEndpoint: `${process.env.REACT_APP_WEB_BASE_URL}/broadcasting/auth`,
//         auth: {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Accept: "application/json",
//           },
//         },
//       });

//       const connectionCheckInterval = setInterval(() => {
//         if (window.Echo && window.Pusher.isReady) {
//           console.log("Socket successfully connected:", window.Echo.socketId());
//           clearInterval(connectionCheckInterval);
//         }
//       }, 1000);
//       return connectionCheckInterval;
//     } catch (error) {
//       console.error("socketProvider error:\n", error);
//     }
//   }
// };

// export default socketProvider;
