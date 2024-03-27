import { Home, Info, LogIn, Mail } from 'lucide-react';

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
  {
    label: 'Login',
    path: '/login',
    icon: LogIn,
  },
];
