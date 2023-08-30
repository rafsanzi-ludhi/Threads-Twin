import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/', '/api/webhook/clerk', '/onboarding'],
    ignoredRoutes: ['/api/webhook/clerk']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
