import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth";
import { FilmIcon, UserIcon, ListIcon } from "lucide-react";
import { SearchBar } from "./search-bar";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log("Searching for:", query);
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <FilmIcon className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">VideoStream</span>
          </div>
        </Link>

        <div className="flex-1 max-w-xl">
          <SearchBar onSearch={handleSearch} placeholder="Search movies..." />
        </div>

        <div className="flex items-center gap-4">
          {user?.isAdmin && (
            <div className="flex items-center gap-2">
              <Link href="/admin/movies">
                <Button variant="outline">Movies</Button>
              </Link>
              <Link href="/admin/categories">
                <Button variant="outline">Categories</Button>
              </Link>
            </div>
          )}

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span>{user.username}</span>
              </div>
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