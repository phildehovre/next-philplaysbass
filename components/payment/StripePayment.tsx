import React, { useState, FormEvent } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";

// Define props interface
interface StripePaymentProps {
	handleSubmitRegistration: () => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({
	handleSubmitRegistration,
}) => {
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!elements || !stripe) return;

		handleSubmitRegistration();

		const { error: submitError } = await elements.submit();
		if (submitError) {
			setErrorMessage(
				submitError.message || "An error occurred during submission."
			);
			return;
		}

		const res = await fetch(
			`${process.env.VITE_API_URL}/checkout/create-payment-intent`,
			{
				method: "POST",
			}
		);

		const { client_secret: clientSecret } = await res.json();

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${process.env.VITE_CLIENT_URL}/checkout/success`,
			},
		});

		if (error) {
			setErrorMessage(error.message || "An error occurred during payment.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<button type="submit" disabled={!stripe || !elements}>
				Pay
			</button>
			{errorMessage && <div>{errorMessage}</div>}
		</form>
	);
};

export default StripePayment;
