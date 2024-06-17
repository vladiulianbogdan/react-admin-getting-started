# Description

This is a template for a react-admin web application hosted on Genezio. It exposes some genezio classes as well as Genezio-based authentication.

# Deploying this example

[![Deploy to Genezio](https://raw.githubusercontent.com/Genez-io/graphics/main/svg/deploy-button.svg)](https://dev.app.genez.io/start/deploy?repository=https://github.com/Genez-io/react-admin-getting-started)

# Setting up this example

1. Enable Authentication by choosing "Authentication" on the left-side menu, and enable the Email provider
2. Make sure you update the reset password URL from Authentication / Settings / Email Templates / Reset Password to `https://ABC-DEF-GHI.app.genez.io/reset-password` (you'll find your domain name under the Domains section)
3. Update the auth token / region in the `client/src/authProvider.ts` file with the ones provided by Genezio - you can find them in the above Authentication section
4. Redeploy the genezio project
5. Go to `https://ABC-DEF-GHI.app.genez.io/` again and test the project in your browser

# Demo

You can play with it here: https://lime-recent-tuna.app.genez.io/