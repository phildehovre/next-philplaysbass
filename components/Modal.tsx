"use client";
import React, { useEffect, useRef } from "react";
import "./Modal.css";

type ModalProps = {
	children: React.ReactNode;
	onClose: () => void;
	className?: string;
	excludeRefs: React.RefObject<HTMLElement>[];
};

const Modal = ({
	children,
	onClose,
	className = "",
	excludeRefs = [],
}: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const clickedOutsideModal =
				modalRef.current && !modalRef.current.contains(target);
			const clickedInsideExcluded = excludeRefs.some(
				(ref) => ref.current && ref.current.contains(target)
			);
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest(".song-dropdown_ctn") // fallback safety
			) {
				onClose();
			}
			if (clickedOutsideModal && !clickedInsideExcluded) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose, excludeRefs]);

	return (
		<div className="modal_overlay">
			<div className={`modal_ctn ${className}`} ref={modalRef}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
