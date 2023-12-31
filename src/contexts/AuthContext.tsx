import {ReactNode, createContext, useState, useEffect} from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth} from '../services/firebaseConnection';

interface IAuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  user: IUserProps | null;
  handleInfoUser: ({name, email, uid}: IUserProps) => void;
}

interface IUserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: IAuthProviderProps){
  const [user, setUser] = useState<IUserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email
        })

        setLoadingAuth(false);

      }else{
        setUser(null);
        setLoadingAuth(false);
      }
    })

    return () => {
      unsub();
    }
  }, [])

  function handleInfoUser({name, email, uid}: IUserProps){
    setUser({
      name,
      email,
      uid
    })
  }

  return(
    <AuthContext.Provider 
      value={{
        signed: !!user,
        loadingAuth,
        user,
        handleInfoUser
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;