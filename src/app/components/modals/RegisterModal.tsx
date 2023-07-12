"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";

/* Icons */
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

/* Hooks */
import useRegisterModal from "@/hooks/useRegisterModal";

const formDefaulValues = {
	name: "",
	email: "",
	password: "",
};

export default function RegisterModal() {
	const registerModal = useRegisterModal();

	const [loading, setLoading] = useState(false);

	const handleRegistration: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);

		axios
			.post("/api/register", data)
			.then(() => {
				registerModal.onClose();
			})
			.catch((error) => {
				toast.error("Someting went wrong.");
			})
			.finally(() => setLoading(false));
	};

	// Form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({ defaultValues: formDefaulValues });

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to Airbnb Clone" subtitle="Create an account" />
			<Input
				id="email"
				label="Email"
				disabled={loading}
				register={register}
				errors={errors}
				required
				autoFocus
			/>
			<Input
				id="name"
				label="Name"
				disabled={loading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={loading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button outline icon={FcGoogle} onClick={() => {}}>
				Continue with Google
			</Button>
			<Button outline icon={AiFillGithub} onClick={() => {}}>
				Continue with GitHub
			</Button>
			<p className="text-neutral-500 text-center mt-4 font-light">
				<span>Already have an account?</span>
				<span
					onClick={registerModal.onClose}
					className="text-neutral-900 font-semibold cursor-pointer hover:underline ml-2"
				>
					Log in
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={loading}
			isOpen={registerModal.isOpen}
			title="Registrer"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onConfirm={handleSubmit(handleRegistration)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}