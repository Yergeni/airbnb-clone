"use client"

import { IconType } from "react-icons";

type ButtonProps = {
	children: React.ReactNode;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
	iconPosition?: "left" | "right";
};

export default function Button({
	children,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon, // alias Icon
	iconPosition = "left",
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
        relative transition w-full rounded-lg hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed
        ${
					outline
						? "bg-white border-black text-black hover:border-opacity-80"
						: "bg-rose-500 border-rose-500 text-white"
				}
        ${
					small
						? "py-1 text-sm font-light border"
						: "py-3 text-md font-semibold border-2"
				}
      `}
		>
			{Icon && (
				<Icon
					size={small ? 18 : 24}
					className={`absolute ${small ? "top-[0.35rem]" : "top-3"} ${
						iconPosition === "left" ? "left-4" : "right-4"
					}`}
				/>
			)}
			{children}
		</button>
	);
}
