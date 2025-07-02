import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest} from "next/server";
import { routing } from "./i18n/routing";
//import { getToken } from "next-auth/jwt";

// Private Pages
const privatePages = ["/favourite", "/cart", "/checkout", "/profile"];

// Handle i18 Routing
const handleI18nRouting = createMiddleware(routing);

// Handle MilldleWare
const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },

  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/",
    },
  },
);

export default async function middleware(req: NextRequest) {

  //token

  //const token = await getToken({ req });

  // private Pathname
  const privatePathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${privatePages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  // Check Private
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  // Check private and token
  if (isPrivatePage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  } 
  
  else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return handleI18nRouting(req);
  }

}
// Matcher
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
