import type { DecksData, User } from "@/lib/types";
import { getAuthenticatedUser, getAuthenticatedUserToken } from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;
  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

// Logout and clear the token
export const logout = async (): Promise<void> => {
  removeAuthenticatedUserToken();
};

export const register = async (
  username: string,
  password: string,
  displayName: string,
  avatarUrl?: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, displayName, avatarUrl }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

export const fetchDecks = async (): Promise<DecksData[]> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks?withUserData=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
  return responseJson.data;
};

export const deleteDeck = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

export const createDeck = async (
  title: string,
  image?: string,
): Promise<DecksData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, image }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
  return {
    ...responseJson.data,
    user: user,
  };
};

export const editDeck = async (id: string, newTitle: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newTitle }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

export const storeAuthenticatedUserToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeAuthenticatedUserToken = (): void => {
  localStorage.removeItem("token");
};

const handleError = (response: Response, message?: string) => {
  if (response.status === 401) {
    removeAuthenticatedUserToken();
    throw new Error("Your session has expired. Please login again.");
  }

  throw new Error(
    `Error: ${response.status} - ${message || response.statusText}`,
  );
};
