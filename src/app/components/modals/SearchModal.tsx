"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";

import { SearchFormValue } from "./types";

import useSearchModal from "@/hooks/useSearchModal";

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const DEFAULT_SEARCH_VALUES: SearchFormValue = {
	location: null,
	guestCount: 1,
	roomCount: 1,
	bathroomCount: 1,
	dateRange: {
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection'
	},
	price: 0,
};

export default function SearchModal() {
	const router = useRouter();
	const params = useSearchParams();
	const searchModal = useSearchModal();

	const [step, setStep] = useState(STEPS.LOCATION);

	const { register, handleSubmit, setValue, watch, reset } =
		useForm<SearchFormValue>();

	const priceValue = watch("price");
	const locationValue = watch("location");
	const roomCountValue = watch("roomCount");
	const guestCountValue = watch("guestCount");
	const bathroomCountValue = watch("bathroomCount");

	// Dynamic import of the Map to make it work in NextJS and load it everytime location changes
	const DynamicMap = useMemo(
		() => dynamic(() => import("../Map"), { ssr: false }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[locationValue]
	);

	const onNext = () => setStep((value) => value + 1);
	const onBack = () => setStep((value) => value - 1);

	const actionLabel = useMemo(() => {
		if (step !== STEPS.INFO) return "Next";
		return "Search";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) return undefined;
		return "Back";
	}, [step]);

	const onSubmit: SubmitHandler<SearchFormValue> = (data) => {
		if (step !== STEPS.INFO) {
			return onNext();
		}

		console.log(data);
		// setStep(STEPS.LOCATION)
	};

	// Modal body content
	// let bodyContent = bodyContent = (
	// 	<section className="flex flex-col gap-8">
	// 		<Heading
	// 			title="Where is your place located?"
	// 			subtitle="Help guests find you!"
	// 		/>
	// 		<CountrySelect
	// 			value={locationValue}
	// 			onChange={(value) => setCustomValue("location", value)}
	// 		/>
	// 		<DynamicMap center={locationValue?.latlng} />
	// 	</section>
	// );



	return (
		<Modal
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onConfirm={handleSubmit(onSubmit)}
			title="Filters"
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			// bodyContent={bodyContent}
			b
		/>
	);
}
