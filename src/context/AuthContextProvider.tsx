import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { Token, User } from '@/types';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys';
import { jwtDecode } from 'jwt-decode';

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem(QUERY_KEYS.TOKEN);
    
    // Check if token exists and is not null
    if (storedToken && storedToken !== 'null' && storedToken !== 'undefined') {
      try {
        // Try to parse if it's JSON, otherwise use as string
        let localToken;
        if (storedToken.startsWith('{')) {
          localToken = JSON.parse(storedToken);
        } else {
          // For demo token string
          localToken = { accessToken: storedToken };
        }

        if (localToken && localToken.accessToken) {
          const decodedToken: User = jwtDecode(localToken.accessToken);
          
          // Check if token is expired
          if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem(QUERY_KEYS.TOKEN);
            setToken(null);
            setUser(null);
            setRole(null);
            setIsSuperAdmin(false);
            setIsAuthenticated(false);
          } else {
            setToken(localToken);
            setUser(decodedToken);
            setRole(decodedToken.role);
            setIsSuperAdmin(decodedToken.role === 'SuperAdmin');
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        localStorage.removeItem(QUERY_KEYS.TOKEN);
        setToken(null);
        setUser(null);
        setRole(null);
        setIsSuperAdmin(false);
        setIsAuthenticated(false);
      }
    } else {
      // No token found
      setToken(null);
      setUser(null);
      setRole(null);
      setIsSuperAdmin(false);
      setIsAuthenticated(false);
    }
  }, []);

  // Value of the context
  const contextValue = {
    user,
    setUser,
    role,
    setRole,
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    isSuperAdmin,
    setIsSuperAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;