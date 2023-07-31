"use client";

import { useCallback } from "react";

type CounterInputProps = {
	title: string;
	subtitle: string;
	value: number;
	onChange: (value: number) => void;
};

export default function CounterInput({
	title,
	subtitle,
	value,
	onChange,
}: CounterInputProps) {
	const onAdd = useCallback(() => {
		onChange(value + 1);
	}, [value, onChange]);

	const onSubstract = useCallback(() => {
		if (value === 1) return;

		onChange(value - 1);
	}, [value, onChange]);

	return (
		<div className="flex flex-row items-center justify-between">
			<div className="flex flex-col">
				<p className="font-medium">{title}</p>
				<p className="font-light text-gray-600">{subtitle}</p>
			</div>
			<div className="flex flex-row items-center gap-4">
				<button
          disabled={value === 1}
					onClick={onSubstract}
					className="
            w-10 h-10 rounded-full border-[1px] border-neutral-400 items-center justify-center 
            text-neutral-600 text-2xl cursor-pointer hover:opacity-80 disabled:cursor-not-allowed transition"
				>
					&#8722;
				</button>
				<span className="font-light text-xl text-neutral-600">{value}</span>
				<button
					onClick={onAdd}
					className="
            w-10 h-10 rounded-full border-[1px] border-neutral-400 items-center justify-center 
            text-neutral-600 text-2xl cursor-pointer hover:opacity-80 transition"
				>
					&#43;
				</button>
			</div>
		</div>
	);
}
