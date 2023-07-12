"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
	actionLabel: string;
	isOpen?: boolean;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	disabled?: boolean;
	secondaryActionLabel?: string;
	onClose?: () => void;
	onConfirm?: () => void;
	secondaryAction?: () => void;
}

export default function Modal({
	actionLabel,
	isOpen = false,
	title,
	body,
	footer,
	disabled,
	onClose,
	onConfirm,
	secondaryAction,
	secondaryActionLabel,
}: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled || !onClose) {
			return;
		}

		setShowModal(false);
		// The timeout is just for adding animation when modal closes
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleConfirm = useCallback(() => {
		if (disabled || !onConfirm) {
			return;
		}

		onConfirm();
	}, [disabled, onConfirm]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}

		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) return null;

	return (
		// BACKDROP
		<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
			{/* MODAL WRAPPER*/}
			<div
				role="dialog"
				aria-labelledby="register-dialog"
				className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto"
			>
				{/* CONTENT (NOTE: animation duration matches same as timeout for handling close modal) */}
				<div
					className={`translate duration-300 h-full
	            ${showModal ? "translate-y-0" : "translate-y-full"}
	            ${showModal ? "opacity-100" : "opacity-0"}
	          `}
				>
					{/* MODAL CONTAINER */}
					<div className="translate relative flex flex-col h-full md:h-auto lg:h-auto w-full border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none">
						{/* HEADER */}
						<header className="relative flex items-center justify-center p-6 rounded-t border-b">
							<button
								onClick={handleClose}
								className="absolute border-0 p-1 right-9 transition hover:opacity-70"
							>
								<IoMdClose size={18} />
							</button>
							{/* Title */}
							<p id="register-dialog" className="text-lg font-semibold">
								{title}
							</p>
						</header>
						{/* BODY */}
						<section className="relative p-6 flex-auto">{body}</section>
						{/* FOOTER */}
						<footer className="flex flex-col gap-2 p-6">
							<div className="flex flex-row items-center gap-4 w-full">
								{secondaryAction && secondaryActionLabel && (
									<Button
										onClick={handleSecondaryAction}
										disabled={disabled}
										outline
									>
										{secondaryActionLabel}
									</Button>
								)}
								<Button onClick={handleConfirm} disabled={disabled}>
									{actionLabel}
								</Button>
							</div>
							{footer}
						</footer>
					</div>
				</div>
			</div>
		</div>
	);
}