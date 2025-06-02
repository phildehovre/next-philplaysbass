"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StripePayment from "./StripePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentDetails } from "@/types/types";
import "./Form.css";

const stripePromise = loadStripe(process.env.VITE_STRIPE_PK as string);

type PaymentFormProps = {
	onSubmit: (data: PaymentDetails) => Promise<void>;
	paymentDetails?: PaymentDetails;
};

const PaymentForm: React.FC<PaymentFormProps> = ({
	onSubmit,
	paymentDetails,
}) => {
	const [clientSecret, setClientSecret] = useState<string | undefined>();

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<PaymentDetails>({
		defaultValues: paymentDetails ?? {
			account_holder: "",
			iban: "",
		},
	});

	useEffect(() => {
		if (paymentDetails) {
			setValue("account_holder", paymentDetails.account_holder);
			setValue("iban", paymentDetails.iban);
		}
	}, [paymentDetails, setValue]);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(
					`${process.env.VITE_API_URL}/checkout/create-payment-intent`,
					{
						method: "POST",
						body: JSON.stringify({ amount: 50, currency: "usd" }),
						credentials: "include",
						headers: { "Content-Type": "application/json" },
					}
				);
				const secret = await res.json();
				setClientSecret(secret.clientSecret);
			} catch (err) {
				console.error("Payment intent error:", err);
			}
		})();
	}, []);

	return (
		<div className="">
			<form className="form_ctn" onSubmit={handleSubmit(onSubmit)}>
				<h2>IBAN</h2>
				<div className="input-row">
					<div className="control">
						<label htmlFor="account_holder">
							Account holder
							<input
								type="text"
								{...register("account_holder", {
									required: "Account holder name is required",
								})}
								className={errors.account_holder ? "error" : ""}
							/>
						</label>
						{errors.account_holder && (
							<p className="error">{errors.account_holder.message}</p>
						)}
					</div>

					<div className="control">
						<label htmlFor="iban">
							Account IBAN
							<input
								type="text"
								{...register("iban", {
									required: "IBAN is required",
								})}
								className={errors.iban ? "error" : ""}
							/>
						</label>
						{errors.iban && <p className="error">{errors.iban.message}</p>}
					</div>
				</div>
				<button type="submit">Submit Payment Details</button>
			</form>

			{clientSecret && (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<StripePayment handleSubmitRegistration={onSubmit} />
				</Elements>
			)}
		</div>
	);
};

export default PaymentForm;
