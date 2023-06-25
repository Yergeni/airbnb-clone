"use client";

import Image from "next/image";

export default function Avatar() {
	return (
		<Image
			src="/images/placeholder.png"
			alt="Avatar"
			className="rounded-full"
			height="30"
			width="30"
		/>
	);
}
