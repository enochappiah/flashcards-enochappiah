import { Toaster } from "./components/ui/toaster";
import MainView from "./components/main-view";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error-page";
import CardView from "./components/card-view";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/decks/:deckId/cards",
      element: <CardView />,
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
