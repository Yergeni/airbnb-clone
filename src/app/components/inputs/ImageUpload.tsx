"use client";

import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";

import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
	value: string;
	onChange: (value: string) => void;
};

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="airbnb_uploads" // Cloudinary upload preset 
			options={{ maxFiles: 1 }}
		>
			{({ open }) => {
				return (
					<button
						className="
              relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20
              border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600
            "
						onClick={(e) => {
							e.preventDefault();
							open();
						}}
					>
						<TbPhotoPlus size={50} />
						<p className="font-semibold text-lg">Click to upload</p>
						{value && (
							<Image
								alt="Upload"
								fill
								style={{ objectFit: "cover" }}
								src={value}
							/>
						)}
					</button>
				);
			}}
		</CldUploadWidget>
	);
}
