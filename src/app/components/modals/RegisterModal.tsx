'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

/* Next */
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Modal from './Modal';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';

/* Icons */
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

/* Hooks */
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

/* Constants */
import { API_ROUTES } from '../common/constants';

const formDefaulValues = {
  name: '',
  email: '',
  password: '',
};

export default function RegisterModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [loading, setLoading] = useState(false);

  const handleRegistration: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post(API_ROUTES.REGISTER, data)
      .then(() => {
        const credentials: FieldValues = {
          email: data.email,
          password: data.password,
        };
        // Sign the user if succesfully registered
        signIn('credentials', {
          ...credentials,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            reset();
            toast.success('Successfully registered!');
            router.refresh();
            registerModal.onClose();
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => {
        toast.error('Someting went wrong.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({ defaultValues: formDefaulValues });

  const toggleAuthProcess = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegistration)}>
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

      <input type="submit" hidden />
    </form>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      {/* <hr />
      <Button outline icon={FcGoogle} onClick={() => signIn('google')}>
        Continue with Google
      </Button>
      <Button outline icon={AiFillGithub} onClick={() => signIn('github')}>
        Continue with GitHub
      </Button> */}
      <p className="text-neutral-500 text-center mt-4 font-light">
        <span>Already have an account?</span>
        <span
          onClick={toggleAuthProcess}
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
      isLoading={loading}
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
