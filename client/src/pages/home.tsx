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
        <div className="w-full h-[50vh] rounded-2xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 px-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full aspect-[9/16] rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {featuredMovie && (
        <div className="relative w-full h-[50vh] mb-12 overflow-hidden">
          <img
            src={featuredMovie.thumbnailUrl}
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold max-w-2xl text-white">
              {featuredMovie.title}
            </h1>
            <p className="text-lg text-gray-200 max-w-xl">
              {featuredMovie.description}
            </p>
            <Link href={`/movie/${featuredMovie.id}`}>
              <Button size="lg" className="gap-2 mt-4">
                <PlayCircle className="w-5 h-5" />
                Watch Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">All Movies</h2>
        <MovieGrid movies={movies || []} />
      </div>
    </div>
  );
}