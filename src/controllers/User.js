import prisma from "../libs/db";

async function getByOAuthId(id) {
  let user = prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return user;
}

async function getByMail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}

async function createUser(data) {
  const user = await prisma.user.create({
    data: data,
  });
  return user;
}

const UserController = {
  getByOAuthId,
  getByMail,
  createUser,
};

export default UserController;
