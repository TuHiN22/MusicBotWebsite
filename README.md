# Zibot-dashboard

User dashboard for Zibot project

## Installation Guide 🔥

<details>
  <summary>Click to expand</summary>

  * Clone the repo
  * Rename the file `.env.local.example` to `.env` or `.env.local`
  * If you use localhost, keep the default value. If you deploy to server such as [Vercel](https://vercel.app) or Render, copy its address and paste in `NEXTAUTH_URL`
  * Go to your application in [Discord Developer](https://discord.dev)
  * Navigate to the OAuth2 tab, copy the Client ID and Client Secret and paste them to the environment variable.
  * Make sure `NEXTAUTH_URL` is the same as Redirect URL in your discord app.
  * Finally, run the project by using the following command
  ```sh
  npm install
  npm run build
  npm run start
  ```
</details>
