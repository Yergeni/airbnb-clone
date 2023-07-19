import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

/* Utils */
import { excludeKey } from "@/app/utils/excludeKey";

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

	return NextResponse.json(excludeKey(user, ['hashedPassword']));
}
