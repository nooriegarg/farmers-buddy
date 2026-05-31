import { createContext, useState } from 'react';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';
import authService from '../services/authService';

// Context is kept internal — consumed only via useAuth hook (context/useAuth.js)
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      const { token: jwt, ...userData } = res.data.data;
      localStorage.setItem(TOKEN_KEY, jwt);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setToken(jwt);
      setUser(userData);
      return { success: true, role: userData.role };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authService.register(data);
      return { success: true, data: res.data.data };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = () => user?.role === 'ADMIN';
  const isOfficer = () => user?.role === 'OFFICER';
  const isFarmer = () => user?.role === 'FARMER';

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, register, logout,
      isAuthenticated, isAdmin, isOfficer, isFarmer
    }}>
      {children}
    </AuthContext.Provider>
  );
};