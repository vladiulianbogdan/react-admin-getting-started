import { AuthProvider, UserIdentity } from 'react-admin';
import { AuthService } from "@genezio/auth";

const authToken:string = "1-TOKEN";
AuthService.getInstance().setTokenAndRegion(authToken, "eu-central-1");

export const authProvider: AuthProvider = {

  login: async ({ email, password }) => {
    if ((email) && password) {
      await AuthService.getInstance().login(email, password);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    try {
      await AuthService.getInstance().logout();
    } catch (error) {}
    return;
  },
  checkAuth: async () => {
    try {
      let ui = (await AuthService.getInstance().userInfo());

      if (ui && ui.email) {
        return;
      }
    } catch (error) {
      if (authToken.indexOf("TOKEN") != -1)
        throw new Error("The Genezio Auth token was not provided. Please provide a valid token and region in the authProvider.ts file. The token is available on https://app.genez.io/ under the Authentication section.");
      else
        throw(error);
    }
  },
  checkError: async (error) => {
  },
  getPermissions: async () => null,
  getIdentity: async ():Promise<UserIdentity> => {
    try {
      let ui = await AuthService.getInstance().userInfo();
      if (ui && ui.email) {
        return {
          id: ui.userId,
          fullName: ui.email
        };
      }
      else throw new Error("User not found");
    } catch (error) {
      throw(error);
    }
  }  
};
