// Simple authentication utility for admin access
export const ADMIN_PASSWORD = 'Cileungsi1';

export function checkAuth(): boolean {
  if (typeof window === 'undefined') return false;
  
  const isAuthenticated = sessionStorage.getItem('admin-auth') === 'true';
  return isAuthenticated;
}

export function authenticate(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin-auth', 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem('admin-auth');
}

export function requireAuth(): void {
  if (!checkAuth()) {
    window.location.href = '/admin-aldho';
  }
}