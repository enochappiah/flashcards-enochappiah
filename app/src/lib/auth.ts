import { jwtDecode } from "jwt-decode";
import { User } from "./types";

export const getAuthenticatedUser = (): User => {
  const token = localStorage.getItem("token") as string;
  const decodedToken = jwtDecode<User>(token);
  return decodedToken;
};

export const getAuthenticatedUserToken = (): string | null => {
  return localStorage.getItem("token");
};

// Function to check if the token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    // If there's an error in decoding, assume the token is invalid/expired
    return true;
  }
};
