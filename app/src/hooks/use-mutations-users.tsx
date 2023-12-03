import { login, logout, register } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { getAuthenticatedUser } from "@/lib/auth";

function useMutationUser() {
  const { toast } = useToast();
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);

  const loginUser = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      setUser(user);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login",
        description:
          (error as Error).message ||
          "There was an error signing you in. Please try again later.",
      });
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      clearUser();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to logout",
        description:
          (error as Error).message ||
          "There was an error signing you out. Please try again later.",
      });
    }
  };

  const registerUser = async (
    username: string,
    password: string,
    displayName: string,
    avatarUrl?: string,
  ) => {
    try {
      await register(username, password, displayName, avatarUrl);
      toast({
        variant: "default",
        title: "Registration successful",
        description: "Please login with your credentials.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to register",
        description:
          (error as Error).message ||
          "There was an error registering you. Please try again later.",
      });
    }
  };

  useEffect(() => {
    try {
      const user = getAuthenticatedUser();
      setUser(user);
    } catch (error) {
      clearUser();
    }
  }, []);

  return { loginUser, logoutUser, registerUser };
}

export default useMutationUser;
