import dexie from "dexie";
import localforage from "localforage";
import { UserModel } from "../models/user.model";
import { LoaderFunction, redirect } from "react-router-dom";

export const getCurrentUser = async () =>
  await localforage.getItem<UserModel | null>("currentUser");

export async function signOutUser() {
  await localforage.removeItem("currentUser");
}

export const withAuth = (fn: LoaderFunction) => {
  const newFunc: LoaderFunction = async (args) => {
    const user = await getCurrentUser();
    if (!user) {
      return redirect("/auth");
    }

    fn(args);
  };

  return newFunc;
};
