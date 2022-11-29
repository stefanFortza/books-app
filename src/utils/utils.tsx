import dexie from "dexie";
import localforage from "localforage";
import { UserModel } from "../models/user.model";
import { LoaderFunction, redirect } from "react-router-dom";

export const getCurrentUser = async () => {
  return localforage.getItem<UserModel>("currentUser");
};

export async function signOutUser() {
  await localforage.removeItem("currentUser");
}

//Todo fix state:{from}
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
