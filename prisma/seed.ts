import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@easymaster.lk";
  const password = "Admin@123";

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: {
      email: email,
    },
    update: {
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      name: "Admin",
      email: email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin created successfully:");
  console.log(admin.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });