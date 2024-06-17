import { AuthProvider, UserIdentity } from 'react-admin';
import { AuthService } from "@genezio/auth";
AuthService.getInstance().setTokenAndRegion("1-a89649c4-b810-4990-b40f-ba73eef3d4a5", "eu-central-1");

export const authProvider: AuthProvider = {

  register: async ({ username, email, password }) => {
    await AuthService.getInstance().register(email, password);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
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
    } catch (error) {
      throw(error);
    }
    return {
      id: -1
    };
  },
  forgotPassword: async ({ email }) => {
    await AuthService.getInstance().resetPassword(email);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  updatePassword: async ({ password, token }) => {
    await AuthService.getInstance().resetPasswordConfirmation(token, password);    
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
