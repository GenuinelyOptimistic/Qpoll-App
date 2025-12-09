import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from 'firebase/auth';

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
};

type AuthContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setIsLoading] = useState<boolean>(true);

  const logout = async () => {
    try {
      await auth().signOut(); // Sign out from Firebase
      setUser(undefined); // Clear user from state
      await AsyncStorage.removeItem('userData'); // Clear stored user data
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    // fetch user
    checkUser();
  }, []);

  // Save user data whenever it changes
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user]);

  async function checkUser() {
    try {
      setIsLoading(true);
      const savedUserData = await AsyncStorage.getItem('userData');
      if (savedUserData) {
        setUser(JSON.parse(savedUserData));
      }
    } catch (e) {
      alert("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Please wrap the component with Auth Provider");
  }

  return context;
}
