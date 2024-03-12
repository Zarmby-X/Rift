import UserController from "../controllers/User";
import OAuthController from "../controllers/OAuth";

async function singInWithGitHub(access_token) {
  const gitHubUser = await OAuthController.getGitHubUser(access_token);
  if (gitHubUser.status === 401) {
    throw { error: "Invalid access token", status: gitHubUser.status };
  }

  let oAuth = await OAuthController.getByProviderId(gitHubUser.id);

  if (!oAuth) {
    const email = await OAuthController.getPrimaryEmailGithub(access_token);
    let user = await UserController.getByMail(email);

    if (user === null) {
      user = await UserController.createUser({
        email: email,
      });
    }

    oAuth = await OAuthController.createOAuth({
      providerId: gitHubUser.id,
      email: email,
      provider: "github",
      userID: user.id,
    });

    return user;
  } else {
    const user = UserController.getByMail(oAuth.email);
    return user;
  }
}

const LoginController = {
  singInWithGitHub,
};

export default LoginController;
