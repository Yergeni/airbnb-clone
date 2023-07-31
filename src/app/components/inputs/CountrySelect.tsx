"use client";

// import Image from "next/image";
import Select from "react-select";

import { CountryValue } from "./types";

import useCountries from "@/hooks/useCountries";

// const flagCdnUrl = "https://flagcdn.com/";

type CountrySelectProps = {
	value: CountryValue | null;
	onChange: (value: CountryValue) => void;
};

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
	const { getAll } = useCountries();

	return (
		<div>
			<Select
				placeholder="Anywhere"
				isClearable
				options={getAll()}
				value={value}
				onChange={(value) => onChange(value as CountryValue)}
				formatOptionLabel={(option) => (
					<div className="flex flex-row items-center gap-3">
						{/* <Image
							src={flagCdnUrl + option.value.toLowerCase() + ".svg"}
							alt={option.value}
              className="h-auto w-[16px] aspect-auto"
							width={16}
							height={16}
						/> */}
						<span role="img" aria-label={option.label}>{option.flag}</span>
						<p>
							{option.label}
							{", "}
							<span className="text-neutral-400 ml-1">{option.region}</span>
						</p>
					</div>
				)}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg"
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6"
          }
        })}
			/>
		</div>
	);
}
