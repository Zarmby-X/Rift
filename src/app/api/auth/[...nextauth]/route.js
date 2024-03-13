import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import OAuthController from "../../../../controllers/OAuth";

const handler = NextAuth({
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
      console.log(session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
