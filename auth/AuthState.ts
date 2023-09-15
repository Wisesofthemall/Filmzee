// AuthStatus.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "./firebase";
function useAuth() {
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

export default useAuth;
