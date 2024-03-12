import prisma from "../libs/db";

async function createUrlApi(jwt, data) {
  try {
    const request = await fetch("http://localhost:3000/api/urls", {
      method: "POST",
      body: JSON.stringify({
        jwt: jwt,
        originalUrl: data.originalUrl,
        alias: data.alias,
      }),
    });
    const newUrl = await request.json();
    return newUrl;
  } catch (error) {
    return { error: error };
  }
}

async function deleteUrlApi(jwt, id) {
  try {
    const request = await fetch("http://localhost:3000/api/urls", {
      method: "DELETE",
      body: JSON.stringify({
        jwt: jwt,
        urlID: id,
      }),
    });
    const deletedUrl = await request.json();
    return deletedUrl;
  } catch (error) {
    return { error: error };
  }
}

async function updateUrlApi(jwt, data) {
  try {
    const request = await fetch("http://localhost:3000/api/urls", {
      method: "PUT",
      body: JSON.stringify({
        jwt: jwt,
        urlID: data.urlID,
        alias: data.alias,
        originalUrl: data.originalUrl,
      }),
    });
    const updatedUrl = await request.json();
    return updatedUrl;
  } catch (error) {
    return { error: error };
  }
}

function generateUrlId(numero) {
  const caracteresBase62 =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const base = 62;
  const idBase62 = [];

  while (numero) {
    const residuo = numero % base;
    numero = Math.floor(numero / base);
    idBase62.unshift(caracteresBase62[residuo]);
  }

  const idFinal = idBase62.join("");
  return idFinal;
}

async function getUrls(id) {
  return await prisma.url.findMany({
    where: {
      userID: id,
    },
  });
}

async function createUrl(userID, alias, originalUrl) {
  let url = await prisma.url.create({
    data: {
      alias: alias,
      originalUrl: originalUrl,
      riftUrl: "rift-Holder",
      userID: userID,
    },
  });
  const urlId = generateUrlId(url.id);
  const riftUrl = `${process.env.DOMAIN}${urlId}`;
  if (alias) {
    url = await prisma.url.update({
      where: {
        id: url.id,
      },
      data: {
        riftUrl: riftUrl,
      },
    });
  } else {
    url = await prisma.url.update({
      where: {
        id: url.id,
      },
      data: {
        alias: urlId,
        riftUrl: riftUrl,
      },
    });
  }
  return url;
}

async function deleteUrl(urlID, userID) {
  const deletedUrl = await prisma.url.delete({
    where: {
      id: urlID,
      userID: userID,
    },
  });
  return deletedUrl;
}

async function updateUrl(urlID, alias, originalUrl, userID) {
  if (alias == "") {
    const urlId = generateUrlId(urlID);
    const updatedUrl = await prisma.url.update({
      where: {
        id: urlID,
        userID: userID,
      },
      data: {
        alias: urlId,
        originalUrl: originalUrl,
      },
    });
    return updatedUrl;
  } else {
    const updatedUrl = await prisma.url.update({
      where: {
        id: urlID,
        userID: userID,
      },
      data: {
        alias: alias,
        originalUrl: originalUrl,
      },
    });
    return updatedUrl;
  }
}

async function getUrl(riftUrl) {
  const originUrl = await prisma.url.findFirst({
    where: {
      riftUrl: riftUrl,
    },
  });
  return originUrl;
}

const UrlsController = {
  getUrls,
  createUrl,
  createUrlApi,
  deleteUrl,
  deleteUrlApi,
  updateUrl,
  updateUrlApi,
  getUrl,
};

export default UrlsController;
