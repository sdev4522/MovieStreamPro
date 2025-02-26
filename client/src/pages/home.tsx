import { useQuery } from "@tanstack/react-query";
import { MovieGrid } from "@/components/movie-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";

export default function Home() {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const featuredMovie = movies?.[0];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="w-full h-[60vh] rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <Skeleton className="w-full aspect-video rounded-lg" />
              <Skeleton className="h-4 w-3/4 mt-4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {featuredMovie && (
        <div className="relative w-full h-[60vh] mb-12">
          <img
            src={featuredMovie.thumbnailUrl}
            alt={featuredMovie.title}
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">
              {featuredMovie.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              {featuredMovie.description}
            </p>
            <Link href={`/movie/${featuredMovie.id}`}>
              <Button size="lg" className="gap-2">
                <PlayCircle className="w-5 h-5" />
                Watch Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-8">All Movies</h2>
        <MovieGrid movies={movies || []} />
      </div>
    </div>
  );
}