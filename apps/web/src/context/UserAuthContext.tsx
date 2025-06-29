import { createContext, useContext, useEffect, useState } from 'react';

//import { GoogleAuthProvider, signInWithPopup, signOut } from '../services/authService';
import supabase from '../clients/supabaseClient';

interface UserAuthContextType {
  session: any;
  signUpNewUser: (email: string, password: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signOutUser: () => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthContextProvider({ children }) {
  const [session, setSession] = useState(undefined);

  // Sign Up
  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
    });

    if (error) {
      console.error('Error signing up:', error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  // Sign In
  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error('Error signing in:', error);
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      return { success: false, error: 'Unexpected error occurred' };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  //Sign Out
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <UserAuthContext.Provider value={{ signUpNewUser, signInUser, session, signOutUser }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function UserAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('UserAuth must be used within a UserAuthContextProvider');
  }
  return context;
}
