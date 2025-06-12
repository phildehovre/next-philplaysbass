"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type UserContextType = {
	user: {
		id: string;
		email: string;
		givenName: string;
		familyName: string;
	} | null;
	loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useKindeBrowserClient();
	const [currentUser, setCurrentUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user) {
			setCurrentUser(user);
			setLoading(false);
		} else {
			setCurrentUser(null);
			setLoading(false);
		}
	}, [user]);

	return (
		<UserContext.Provider value={{ user: currentUser, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
