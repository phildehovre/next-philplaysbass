// services/useApiCall.ts

import { useState, useCallback } from "react";

export function useApiCall<TArgs extends any[], TResult>(
	callback: (...args: TArgs) => Promise<TResult>
) {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState<TResult | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const execute = useCallback(
		async (...args: TArgs): Promise<TResult | undefined> => {
			setIsLoading(true);
			setError(null);
			try {
				const res = await callback(...args);
				setResult(res);
				return res;
			} catch (err) {
				setError(err as Error);
				console.error("API call error:", err);
				return undefined;
			} finally {
				setIsLoading(false);
			}
		},
		[callback]
	);

	return { execute, result, isLoading, error };
}
