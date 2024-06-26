import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiPrefix,
  authRoutes,
  publicRoutes,
  publicRoutesPrefix,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  let isPublicRoutePrefix = false;
  for(let route of publicRoutesPrefix){
    if(nextUrl.pathname.startsWith(route)){
      isPublicRoutePrefix = true;
      break;
    }
  }
  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    isPublicRoutePrefix;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
