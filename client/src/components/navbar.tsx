import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth";
import { FilmIcon, UserIcon } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <FilmIcon className="h-6 w-6" />
            <span className="font-semibold text-lg">VideoStream</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span>{user.username}</span>
              </div>
              {user.isAdmin && (
                <Link href="/admin/movies">
                  <Button variant="outline">Admin</Button>
                </Link>
              )}
              <Button variant="ghost" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : location === "/login" && (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}