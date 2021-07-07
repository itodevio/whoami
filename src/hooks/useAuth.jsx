import {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';

import firebase from '../config/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);

  // Verifica se usuário está logado, deslogado, logando ou deslogando, e atualiza estados
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        setAuthUser(user);
        setToken(await user.getIdToken());
      } else {
        setAuthUser(null);
        setToken(null);
      }
    });
  }, []);

  // Verifica se o token mudou de valor (venceu) e atualiza estados
  useEffect(() => {
    firebase.auth().onIdTokenChanged(async user => {
      if (user) {
        setAuthUser(user);
        setToken(await user.getIdToken());
      } else {
        setAuthUser(null);
        setToken(null);
      }
    });
  }, []);

  // Refresha o token a cada 10 minutos e limpa o intervalo quando é destruido
  useEffect(() => {
    const time = setInterval(async () => {
      const user = firebase.auth().currentUser;

      if (user) {
        await user.getIdToken(true);
      }
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(time);
    };
  }, []);

  const createAuthUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
  const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
  const signOut = () => firebase.auth().signOut();

  const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  return (
    <AuthContext.Provider value={{
      authUser,
      token,
      createAuthUser,
      signIn,
      signOut,
      signInGoogle,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
