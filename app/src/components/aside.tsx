import { useStore } from "@/lib/store";
import { LogoutDialog } from "./auth/logout-dialog";
import { RegisterDialog } from "./auth/register-dialog";
import { LoginDialog } from "./auth/login-dialog";
import { removeAuthenticatedUserToken } from "@/lib/api";
import { getAuthenticatedUserToken, isTokenExpired } from "@/lib/auth";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

const Aside = () => {
  const user = useStore((state) => state.user);
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      {user ? <LogoutDialog /> : <LoginDialog />}
      {!user && <RegisterDialog />}
    </div>
  );
};

export default Aside;
