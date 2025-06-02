"use client";
import React, { useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import PaymentForm from "./PaymentForm";
import "./Checkout.css";
import { useApiCall } from "../../services/useApiCall";
import { createUser, createMembership } from "../../services/membership";
import { PaymentDetails } from "@/types/types";

const Checkout = () => {
	const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>();
	const { setCookie, getCookie, deleteCookie } = useCookies();

	const {
		execute: exeUser,
		isLoading: isUserLoading,
		error: userError,
	} = useApiCall(createUser);

	const {
		execute: exeMembership,
		isLoading: isMembershipLoading,
		error: membershipError,
	} = useApiCall(createMembership);

	useEffect(() => {
		if (membershipError || userError) {
			console.error("Membership/User error", { membershipError, userError });
		}
	}, [membershipError, userError]);

	const handleSubmitRegistration = async (data: PaymentDetails) => {
		console.log("Received payment form data", data);
		setPaymentDetails(data);

		try {
			const userData = {
				email: "test@email.com", // replace later
				password: "123456", // replace later
			};

			const user = await exeUser(userData);
			if (!user) throw new Error("User creation failed");

			const membershipData = {
				startDate: new Date(),
				endDate: new Date(), // update as needed
				active: true,
				owner: user._id,
			};

			const membership = await exeMembership(membershipData);
			if (!membership) throw new Error("Membership creation failed");

			console.log("User + Membership created", user, membership);
			// navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="checkout_ctn">
			<h1>Payment</h1>
			<PaymentForm
				onSubmit={handleSubmitRegistration}
				paymentDetails={paymentDetails}
			/>
		</div>
	);
};

export default Checkout;
