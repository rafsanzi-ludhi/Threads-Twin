import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/', '/api/webhook/clerk', '/onboarding'],
    ignoredRoutes: ['/api/webhook/clerk', '/create-thread']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
