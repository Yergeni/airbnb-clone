"use client";

import { HTMLInputTypeAttribute } from "react";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

import { BiDollar } from "react-icons/bi";

type InputProps = {
	id: string;
	label: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	type?: HTMLInputTypeAttribute;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
  autoFocus?: boolean;
};

export default function Input({
	id,
	label,
	register,
	errors,
	type = "text",
	disabled,
	formatPrice,
	required,
  autoFocus
}: InputProps) {
	const minPriceValue = type === "number" && formatPrice ? 1 : undefined;

	return (
		<div className="w-full relative">
			{formatPrice && (
				<BiDollar
					size={24}
					className="absolute text-neutral-700 top-5 left-2"
				/>
			)}
			{/* Placeholder MUST be whitespace */}
			<input
        autoFocus={autoFocus}
				id={id}
				disabled={disabled}
				{...register(id, { required, min: minPriceValue })}
				placeholder=" "
				type={type}
				className={`
        peer w-full p-3 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${formatPrice ? "pl-9" : "pl-4"}
        ${
					errors[id]
						? "border-rose-500 focus:border-rose-500"
						: "border-neutral-300 focus:border-black"
				}
        `}
			/>
			{/* LABEL */}
			<label
				htmlFor={id}
				className={`
          absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
						formatPrice ? "left-9" : "left-4"
					}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-90
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
			>
				{label}
			</label>
		</div>
	);
}
