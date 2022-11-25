import localforage from "localforage";
import { createContext, FunctionComponent, useState, useEffect } from "react";
import { UserModel } from "../../models/user.model";

interface IUserContext {
  currentUser: UserModel | null;
  signOutUser: () => Promise<void>;
  signInUser: (user: UserModel) => Promise<void>;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext>({
  currentUser: {
    email: "",
    password: "",
  },
  signOutUser: async () => {},
  signInUser: async () => {},
});

const UserContextProvider: FunctionComponent<UserContextProviderProps> = (
  props
) => {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

  useEffect(() => {
    localforage.getItem<UserModel>("currentUser").then((user) => {
      setCurrentUser(user);
    });
  }, []);

  const signOutUser = async () => {
    await localforage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const signInUser = async (user: UserModel) => {
    await localforage.setItem("currentUser", user);
    setCurrentUser(user);
  };
  const value: IUserContext = { currentUser, signOutUser, signInUser };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
