const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getUserById = (id) =>
  prisma.users.findUnique({
    where: { id: id },
  });
