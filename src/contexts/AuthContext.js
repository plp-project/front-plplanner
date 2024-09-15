import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
	const [user, setUser] = useState(() => {
		const userString = localStorage.getItem("user");
		try {
			return userString ? JSON.parse(userString) : null;
		} catch (error) {
			console.error("Failed to parse user data from localStorage:", error);
			return null;
		}
	});

	const login = (token, user) => {
		setAuthToken(token);
		setUser(user);
		localStorage.setItem("authToken", token);
		localStorage.setItem("user", JSON.stringify(user));
	};

	const logout = () => {
		setAuthToken(null);
		localStorage.removeItem("authToken");
	};

	return (
		<AuthContext.Provider value={{ authToken, login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};
