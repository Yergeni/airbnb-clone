"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // https://next-auth.js.org/getting-started/client#signin
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";

/* Icons */
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

/* Custom Hooks */
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

const formDefaulValues = {
	email: "",
	password: "",
};

export default function LoginModal() {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [loading, setLoading] = useState(false);

	const handleLogin: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);

		// https://next-auth.js.org/getting-started/client#signin
		signIn("credentials", { ...data, redirect: false }).then((callback) => {
			setLoading(false);

			if (callback?.ok) {
				toast.success("Logged in");
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	// Form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({ defaultValues: formDefaulValues });

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subtitle="Login to your account" />
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
				<span>No have an account?</span>
				<span
					onClick={() => {
						loginModal.onClose();
						registerModal.onOpen();
					}}
					className="text-neutral-900 font-semibold cursor-pointer hover:underline ml-2"
				>
					Register
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={loading}
			isLoading={loading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onConfirm={handleSubmit(handleLogin)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}
