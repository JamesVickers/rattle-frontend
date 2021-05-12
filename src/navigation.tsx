// import { NavigationContainerRef } from "@react-navigation/native";
// import { createRef } from "react";

// export const navigationContainerRef = createRef<NavigationContainerRef>();

// let navigationIsReady = false;

// let queuedNavigationRequest:
//   | { routeName: string; params?: Record<string, unknown> }
//   | undefined;

// export const rootNavigate = (
//   routeName: string,
//   params?: Record<string, unknown>,
// ): void => {
//   if (navigationIsReady) {
//     queuedNavigationRequest = undefined;
//     navigationContainerRef.current?.navigate(routeName, params);
//   } else {
//     queuedNavigationRequest = {
//       routeName,
//       ...(params && { params: { ...params } }),
//     };
//   }
// };

// export const onNavigationControllerUnmount = (): void => {
//   navigationIsReady = false;
// };

// export const onNavigationControllerReady = (): void => {
//   navigationIsReady = true;

//   if (queuedNavigationRequest) {
//     const { routeName, params } = queuedNavigationRequest;
//     queuedNavigationRequest = undefined;

//     setImmediate(() => {
//       rootNavigate(routeName, params);
//     });
//   }
// };

export {};
