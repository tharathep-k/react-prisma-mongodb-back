const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { validateEditUser } = require("../validator/edituser-validate");
const bcryptService = require("../service/bycrypt-service");

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

exports.editUser = async (req, res, next) => {
  try {
    const data = validateEditUser(req.body);
    data.password = await bcryptService.hash(data.password);

    const newData = await prisma.users.update({
      where: { id: data.id },
      data: {
        email: data.email,
        password: data.password,
      },
    });
    // console.log(newData);

    res.status(200).json(newData);
  } catch (error) {
    next(error);
  }
};

exports.searchUserByEmail = async (req, res, next) => {
  try {
    const { value } = req.query;
    console.log(value);
    newValue = value.toLowerCase();

    const newData = await prisma.users.findMany({
      where: { email: { startsWith: newValue } },
    });

    console.log(newData);

    res.status(200).json(newData);
  } catch (error) {
    next(error);
  }
};
