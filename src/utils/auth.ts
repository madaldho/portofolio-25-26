// Authentication utility for admin access
// Password is read from environment variable, never hardcoded

function getAdminPassword(): string {
  const password = import.meta.env.ADMIN_PASSWORD;
  if (!password) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return '';
  }
  return password;
}

export function checkAuth(): boolean {
  if (typeof window === 'undefined') return false;
  
  const isAuthenticated = sessionStorage.getItem('admin-auth') === 'true';
  return isAuthenticated;
}

export function authenticate(password: string): boolean {
  const adminPassword = getAdminPassword();
  if (!adminPassword) return false;
  
  if (password === adminPassword) {
    sessionStorage.setItem('admin-auth', 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('admin-auth');
}

export function requireAuth(): void {
  if (typeof window === 'undefined') return;
  if (!checkAuth()) {
    window.location.href = '/admin-aldho';
  }
}
