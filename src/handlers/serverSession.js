import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.provider === "github") {
        const rawtoken = await OAuthController.singInOAuth(account);
        return { ...token, token: rawtoken.token };
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url == baseUrl) {
        return "/dashboard";
      } else {
        return baseUrl;
      }
    },
    async session({ session, token }) {
      session = { ...session, token: token.token };
      return session;
    },
  },
};
