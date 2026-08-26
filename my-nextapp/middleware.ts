import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ດຶງ Token ຈາກ Cookies (ຫຼື Headers)
  const token = request.cookies.get('token')?.value;

  // ລະບຸ Path ທີ່ຕ້ອງການ Protect (ປ້ອງກັນ)
  const protectedPaths = ['/users', '/posts'];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // ຖ້າເຂົ້າໜ້າ Protected ແລ້ວບໍ່ມີ Token -> Redirect ໄປໜ້າ /login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// ເລືອກ Path ທີ່ຕ້ອງການໃຫ້ Middleware ເຮັດວຽກ
export const config = {
  matcher: ['/users/:path*', '/posts/:path*'],
};