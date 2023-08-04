"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

import { ROUTES } from "./common/constants";


type NoDataStateProps = {
	title?: string;
	subTitle?: string;
	showReset?: boolean;
};

export default function NoDataState({
	title = "No matches found!",
	subTitle = "Try changing or removing some of your filters.",
	showReset,
}: NoDataStateProps) {
	const router = useRouter();

	return (
		<section className="h-[60vh] flex flex-col gap-2 justify-center items-center">
			<Heading title={title} subtitle={subTitle} center />
			{showReset && (
				<div className="w-48 mt-4">
					<Button outline onClick={() => router.push(ROUTES.HOME)}>
						Remove all filters
					</Button>
				</div>
			)}
		</section>
	);
}
