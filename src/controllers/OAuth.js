async function singInOAuth(account) {
  try {
    const tokenRequest = await fetch(process.env.DOMAIN + "api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        access_token: account.access_token,
        provider: account.provider,
        authMethod: account.type,
      }),
    });
    const jwt = await tokenRequest.json();
    return jwt;
  } catch (error) {
    return {error:error};
  }
}

async function getByProviderId(id) {
  const oAuth = await prisma.oAuth.findFirst({
    where: {
      providerId: id,
    },
  });
  return oAuth;
}

async function createOAuth(data) {
  const oAuth = await prisma.oAuth.create({
    data,
  });
  return oAuth;
}

async function getGitHubUser(access_token) {
  try {
    const request = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (request.status === 401) {
      throw { status: request.status };
    }
    const gitHubUser = await request.json();
    return gitHubUser;
  } catch (error) {
    return error;
  }
}

async function getPrimaryEmailGithub(access_token) {
  const request = await fetch("https://api.github.com/user/emails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await request.json();
  const primaryEmail = data.find((email) => email.primary === true);
  return primaryEmail.email;
}

const OAuthController = {
  singInOAuth,
  getByProviderId,
  createOAuth,
  getGitHubUser,
  getPrimaryEmailGithub,
};

export default OAuthController;
