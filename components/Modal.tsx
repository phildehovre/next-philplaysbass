"use client";
import React, { useEffect, useRef } from "react";
import "./Modal.css";

type ModalProps = {
	children: React.ReactNode;
	onClose: () => void;
	className?: string;
};

const Modal = ({ children, onClose, className = "" }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	return (
		<div className="modal_overlay">
			<div className={`modal_ctn ${className}`} ref={modalRef}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
