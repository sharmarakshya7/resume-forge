import { createContext, useContext, useState, useCallback } from 'react';
import { persistSession, clearSession, getStoredUser } from '../services/authService.js';

const AuthContext = createContext(null);

/**
 * Wrap the app with <AuthProvider> to make auth state
 * available anywhere via the useAuth() hook.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  const login = useCallback((authPayload) => {
    persistSession(authPayload);
    setUser(authPayload.user);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Access auth state from any component */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
