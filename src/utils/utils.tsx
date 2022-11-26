import dexie from "dexie";
import localforage from "localforage";
import { UserModel } from "../models/user.model";

export const getCurrentUser = async () =>
  await localforage.getItem<UserModel | null>("currentUser");

export async function signOutUser() {
  await localforage.removeItem("currentUser");
}
