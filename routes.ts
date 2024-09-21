import { Home, Info, Mail } from 'lucide-react';

export const routes = [
  {
    label: 'Home',
    path: '/',
    icon: Home,
  },
  {
    label: 'About',
    path: '/about',
    icon: Info,
  },
  {
    label: 'Contact',
    path: '/contact',
    icon: Mail,
  },
];

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/about', '/contact'];

/**
 * These are the routes which are accecsible to public
 * These routes do not require authentication
 */
export const publicRoutesPrefix = ['/songs', '/search'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/login'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiPrefix = '/api';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
