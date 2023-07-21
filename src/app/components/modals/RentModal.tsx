"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";

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
  console.log(watch())

	const categoryValue = watch("category");
  // use a custon setValue to force re-render and registration
	const setCustomValue = (id: keyof RentFormValue, value: unknown) => {
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

	const bodyContent = (
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

	return (
		<Modal
			isOpen={rentModal.isOpen}
			title="Airbnb your rents"
			onClose={rentModal.onClose}
			actionLabel={actionLabels.primary}
			onConfirm={step === STEPS.PRICE ? undefined : onNext}
			secondaryActionLabel={actionLabels.secondary}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	);
}
