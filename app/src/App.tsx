//import Sidebar from "./components/sidebar";
//import Feed from "./components/feed";
import { Toaster } from "./components/ui/toaster";
//import { LoginDialog } from "./components/auth/login-dialog";
// import { useStore } from "./lib/store";
// import { LogoutDialog } from "./components/auth/logout-dialog";
// import { RegisterDialog } from "./components/auth/register-dialog";
// import { useToast } from "./components/ui/use-toast";
// import { useEffect } from "react";
// import { removeAuthenticatedUserToken } from "./lib/api";
// import { getAuthenticatedUserToken, isTokenExpired } from "./lib/auth";
// import Aside from "./components/aside";
import MainView from "./components/main-view";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error-page";


function App() {
  // const user = useStore((state) => state.user);
  // const clearUser = useStore((state) => state.clearUser);
  // const { toast } = useToast();

  // useEffect(() => {
  //   const token = getAuthenticatedUserToken();
  //   if (token) {
  //     const isExpired = isTokenExpired(token);
  //     if (isExpired) {
  //       removeAuthenticatedUserToken();
  //       clearUser();
  //       toast({
  //         variant: "destructive",
  //         title: "Session Expired",
  //         description: "Your session has expired. Please login again.",
  //       });
  //     }
  //   }
  // }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
      errorElement: <ErrorPage />,
    },
  ]);
  

  return (
    <div className="flex justify-center min-h-screen">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
