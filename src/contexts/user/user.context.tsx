import localforage from "localforage";
import { createContext, FunctionComponent, useState, useEffect } from "react";
import { db } from "../../database/db";

interface IUserContext {
  userId: number | null;
}
interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext>({
  userId: null,
});

const UserContextProvider: FunctionComponent<UserContextProviderProps> = (
  props
) => {
  const [currentUser, setCurrentUser] = useState<number | null>(null);

  useEffect(() => {
    localforage.getItem<number>("currentUserId").then((id) => {
      // setCurrentUser((c)=>{...c, id});
    });
  }, []);

  return (
    <UserContext.Provider value={{ userId: null }}>
      {props.children}
    </UserContext.Provider>
  );
};

// export default UserContext;
