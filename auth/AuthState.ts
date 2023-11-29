import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./Firebase";

//* This function is use to track the current authenication state of our user
export function useAuth() {
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, function handleAuth(auth: any) {
      if (auth) {
        setUser(auth);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  return user?.reloadUserInfo;
}
