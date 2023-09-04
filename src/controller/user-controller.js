const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getUserdata = async (req, res, next) => {
  try {
    const data = await prisma.users.findMany();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.query;
    console.log(id);
    await prisma.users.delete({ where: { id: id.id } });

    res.status(200).json("Delete Complete");
  } catch (error) {
    next(error);
  }
};
