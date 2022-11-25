import dexie from "dexie";
import localforage from "localforage";

export async function getCurrentUser() {
  return await localforage.getItem<number>("currentUserId");
}

export async function signOutUser() {
  localforage.removeItem("currentUserId");
}
