import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { GenericType } from "typescript";

// Exclude keys from type/interface
function exclude<T extends {[key: string]: unknown}, Key extends keyof T>(
	object: T,
  keys: Key[]
	): Omit<T, Key> {
		// @ts-ignore
		return Object.fromEntries(
		// @ts-ignore
    Object.entries(object).filter(([key]) => !keys.includes(key))
  )
}

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
	const body = await request.json();
	const { email, name, password } = body;

	const salt = await bcrypt.genSalt(SALT_ROUNDS);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashedPassword,
		},
	});

	return NextResponse.json(exclude(user, ['hashedPassword']));
}
