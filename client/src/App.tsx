import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useAuth } from "./lib/auth";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Movie from "@/pages/movie";
import AdminMovies from "@/pages/admin/movies";
import AdminCategories from "@/pages/admin/categories";
import Login from "@/pages/login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movie/:id" component={Movie} />
      <Route path="/admin/movies" component={AdminMovies} />
      <Route path="/admin/categories" component={AdminCategories} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;