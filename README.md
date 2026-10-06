# The Seed Atelier

Brochure site for The Seed Atelier. Public pages are prerendered. Nuxt Studio at `/_studio` edits the content. Enquiry forms email the atelier and send the visitor a confirmation through Gmail.

```bash
bun install
bun run dev
```

Copy `.env.example` to `.env` before sending real mail or publishing from Studio.

## Studio sign-in

`/_studio` shows a provider only when its env vars are set. GitHub and Google can both be on. In local dev, use **Edit this page** on the public site. That writes files directly and does not use these logins.

GitHub, for your own access:

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
2. Homepage URL: the Vercel alias, for example `https://the-seed-atelier.vercel.app`.
3. Authorization callback URL: `https://<alias>.vercel.app/__nuxt_studio/auth/github`.
4. Put the client id and secret in `STUDIO_GITHUB_CLIENT_ID` and `STUDIO_GITHUB_CLIENT_SECRET`.

Google, for the atelier:

1. Google Cloud Console → APIs & Services → Credentials → OAuth client ID → Web application.
2. Authorized redirect URI: `https://<alias>.vercel.app/__nuxt_studio/auth/google`.
3. While the consent screen is in testing, add `theseedatelier.sg@gmail.com` as a test user.
4. Set `STUDIO_GOOGLE_CLIENT_ID`, `STUDIO_GOOGLE_CLIENT_SECRET`, and `STUDIO_GOOGLE_MODERATORS` (comma-separated emails that may sign in).
5. Create a GitHub personal access token that can write this repository and set `STUDIO_GITHUB_TOKEN`. Google login identifies the editor. The token is what pushes the commit.
