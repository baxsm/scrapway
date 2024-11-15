"use server";

import { symmetricEncrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import {
  createCredentialSchema,
  CreateCredentialSchemaType,
} from "@/validations/credential";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getCredentialsForUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return prisma.credential.findMany({
    where: {
      userId,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const createCredential = async (form: CreateCredentialSchemaType) => {
  const { success, data } = createCredentialSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Encrypt value
  const encryptedValue = symmetricEncrypt(data.value);

  const result = await prisma.credential.create({
    data: {
      userId,
      name: data.name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error("Failed to create credential");
  }

  revalidatePath("/credentials");
};

export const deleteCredential = async (name: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.credential.delete({
    where: {
      userId_name: {
        userId,
        name,
      },
    },
  });

  revalidatePath("/credentials");
};
