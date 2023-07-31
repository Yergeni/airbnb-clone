"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

/* Components */
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import CounterInput from "../inputs/CounterInput";
import ImageUpload from "../inputs/ImageUpload";

/* Hooks */
import useRentModal from "@/hooks/useRentModal";

/* Constants */
import { CATEGORIES } from "../navbar/constants";

/* Types */
import { RentFormValue } from "./types";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

// needs to match prisma schema Listing model
const DEFAULT_VALUES: RentFormValue = {
	category: "",
	location: null,
	guestCount: 1,
	roomCount: 1,
	bathroomCount: 1,
	imageSrc: "",
	price: 1,
	title: "",
	description: "",
};

export default function RentModal() {
	const rentModal = useRentModal();

	const [step, setStep] = useState(STEPS.CATEGORY);

	// Form
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<RentFormValue>({ defaultValues: DEFAULT_VALUES });
	const disabledNext =
		(step === STEPS.CATEGORY && !watch("category")) ||
		(step === STEPS.LOCATION && !watch("location"));

	const categoryValue = watch("category");
	const locationValue = watch("location");
	const guestCountValue = watch("guestCount");
	const roomCountValue = watch("roomCount");
	const bathroomCountValue = watch("bathroomCount");

	// Dynamic import of the Map to make it work in NextJS and load it everytime location changes
	const DynamicMap = useMemo(
		() => dynamic(() => import("../Map"), { ssr: false }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[locationValue]
	);

	// use a custon setValue to force re-render and registration
	const setCustomValue = (id: keyof RentFormValue, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const onNext = () => setStep((value) => value + 1);
	const onBack = () => setStep((value) => value - 1);

	const actionLabels = useMemo(() => {
		switch (step) {
			case STEPS.CATEGORY:
				return {
					primary: "Next",
				};
			case STEPS.PRICE:
				return {
					primary: "Finish",
					secondary: "Back",
				};
			default:
				return {
					primary: "Next",
					secondary: "Back",
				};
		}
	}, [step]);

	let bodyContent = (
		<section className="flex flex-col gap-8">
			<Heading
				title="Which of these describes your place?"
				subtitle="Pick a category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{CATEGORIES.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							label={item.label}
							icon={item.icon}
							onClick={(category) => setCustomValue("category", category)}
							selected={categoryValue === item.label}
						/>
					</div>
				))}
			</div>
		</section>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<section className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Help guests find you!"
				/>
				<CountrySelect
					value={locationValue}
					onChange={(value) => setCustomValue("location", value)}
				/>
				<DynamicMap center={locationValue?.latlng} />
			</section>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<section className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenities do you have?"
				/>
				<CounterInput
					title="Guest capacity"
					subtitle="How many guests will be allowed?"
					value={guestCountValue}
					onChange={(value) => setCustomValue("guestCount", value)}
				/>
				<hr />
				<CounterInput
					title="Rooms"
					subtitle="How mant rooms does the rent has?"
					value={roomCountValue}
					onChange={(value) => setCustomValue("roomCount", value)}
				/>
				<hr />
				<CounterInput
					title="Bathrooms"
					subtitle="How mant bathrooms does the rent has?"
					value={bathroomCountValue}
					onChange={(value) => setCustomValue("bathroomCount", value)}
				/>
			</section>
		);
	}

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<section className="flex flex-col gap-8">
				<Heading
					title="Add photos of your rent"
					subtitle="Show guest what your rent looks like!"
				/>
				<ImageUpload />
			</section>
		);
	}

	return (
		<Modal
			isOpen={rentModal.isOpen}
			title="Airbnb your rents"
			onClose={rentModal.onClose}
			actionLabel={actionLabels.primary}
			onConfirm={step === STEPS.PRICE ? undefined : onNext}
			secondaryActionLabel={actionLabels.secondary}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			disabled={disabledNext}
			body={bodyContent}
		/>
	);
}
