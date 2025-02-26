import { useQuery } from "@tanstack/react-query";
import { MovieGrid } from "@/components/movie-grid";
import { Skeleton } from "@/components/ui/skeleton";
import type { Movie } from "@shared/schema";

export default function Home() {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Movies</h1>
      <MovieGrid movies={movies || []} />
    </div>
  );
}
