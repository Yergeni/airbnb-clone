"use client";

import Image from "next/image";

export default function Logo() {
	return (
		<Image
			src="/images/logo.png"
			priority // https://nextjs.org/docs/pages/api-reference/components/image#priority
			alt="Logo"
			height="100"
			width="100"
			className="hidden md:block cursor-pointer w-auto h-auto"
		/>
	);
}
