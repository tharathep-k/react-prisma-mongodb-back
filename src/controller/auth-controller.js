const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const bcryptService = require("../service/bycrypt-service");
const tokenService = require("../service/token-service");
const { validateLogin } = require("../validator/auth-validate");

exports.register = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    data.password = await bcryptService.hash(data.password);

    await prisma.users.create({ data: data });

    res.status(200).json("success");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = validateLogin(req.body);
    console.log(data);

    const [user] = await prisma.users.findMany({
      where: { email: data.email },
    });
    console.log(user);

    if (user) {
      const isCorrect = await bcryptService.compare(
        data.password,
        user.password
      );

      if (!isCorrect) {
        return res.status(400).json("invalid credential");
      }
      const accessToken = tokenService.sign({ id: user.id });
      res.status(200).json(accessToken);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
