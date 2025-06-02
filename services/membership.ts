// services/membership.ts

const API_URL = process.env.VITE_API_URL; // Make sure this is defined in your .env file

const defaultHeaders = {
	headers: {
		"Content-Type": "application/json",
	},
	credentials: "include" as RequestCredentials,
};

export async function createUser(data: { email: string; password: string }) {
	try {
		const res = await fetch(`${API_URL}/signup`, {
			method: "POST",
			...defaultHeaders,
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error(`Signup failed: ${res.status}`);
		return await res.json();
	} catch (err) {
		console.error("createUser error:", err);
		throw err;
	}
}

export async function createMembership(data: {
	startDate: Date;
	endDate: Date;
	active: boolean;
	owner: any;
}) {
	try {
		const res = await fetch(`${API_URL}/membership`, {
			method: "POST",
			...defaultHeaders,
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error(`Membership creation failed: ${res.status}`);
		return await res.json();
	} catch (err) {
		console.error("createMembership error:", err);
		throw err;
	}
}
