// Sistema simple de autenticación
export interface User {
  email: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Clave para localStorage
const AUTH_KEY = 'lpino_admin_auth';

// Guardar autenticación
export const setAuth = (user: User): void => {
  const authState: AuthState = {
    isAuthenticated: true,
    user
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
};

// Obtener autenticación
export const getAuth = (): AuthState => {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null };
  }
  
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading auth state:', error);
  }
  
  return { isAuthenticated: false, user: null };
};

// Cerrar sesión
export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

// Verificar si está autenticado
export const isAuthenticated = (): boolean => {
  return getAuth().isAuthenticated;
};
