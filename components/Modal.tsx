"use client";
import React, { useEffect, useRef } from "react";
import "./Modal.css";

type ModalProps = {
	children: React.ReactNode;
	onClose: () => void;
	className?: string;
	excludeRefs?: React.RefObject<HTMLElement>[];
	excludeSelectors?: string[];
};

const Modal = ({
	children,
	onClose,
	className = "",
	excludeRefs = [],
	excludeSelectors = [],
}: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (!modalRef.current) return;

			// Inside modal?
			if (modalRef.current.contains(target)) return;

			// Inside an excluded ref?
			if (excludeRefs.some((ref) => ref.current?.contains(target))) return;

			// Inside an excluded selector?
			if (
				excludeSelectors.some((selector) =>
					(event.target as HTMLElement).closest(selector)
				)
			)
				return;

			// Otherwise → close
			onClose();
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose, excludeRefs, excludeSelectors]);

	return (
		<div className="modal_overlay">
			<div className={`modal_ctn ${className}`} ref={modalRef}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
