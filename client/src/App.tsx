import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, CustomRoutes } from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";

import { Dashboard } from './pages/Dashboard';
import { BlogPostList, BlogPostCreate, BlogPostEdit } from './pages/BlogPosts';
import { CategoryList, CategoryCreate } from './pages/Categories';

import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { ForgotPassword } from './auth/ForgotPassword';
import { ResetPassword } from './auth/ResetPassword';

import { authProvider } from "./authProvider";
import dataProvider from "ra-data-genezio";
import * as gsdk from "@genezio-sdk/react-admin";

export const App = () => (
<BrowserRouter>
  <Admin 
    authProvider={authProvider} 
    dataProvider={dataProvider(gsdk)}
    loginPage={Login}
    dashboard={Dashboard}
  >
    <Resource
      name="BlogPosts"
      list={BlogPostList}
      edit={BlogPostEdit}
      show={ShowGuesser}
      create={BlogPostCreate}
    />
    <Resource
      name="Categories"
      list={CategoryList}
      edit={EditGuesser}
      show={ShowGuesser}
      create={CategoryCreate}
    />
    <CustomRoutes>
        <Route path="/" element={<Dashboard />} />
    </CustomRoutes>
    <CustomRoutes noLayout>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
    </CustomRoutes>
  </Admin>
  </BrowserRouter>
);
