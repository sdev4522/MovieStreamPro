import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { VideoPlayer } from "@/components/ui/video-player";
import { Skeleton } from "@/components/ui/skeleton";
import type { Movie } from "@shared/schema";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: [`/api/movies/${id}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="w-full aspect-video rounded-lg" />
        <Skeleton className="h-8 w-1/2 mt-4" />
        <Skeleton className="h-4 w-3/4 mt-4" />
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <VideoPlayer
        url={movie.videoUrl}
        type={movie.type}
        title={movie.title}
      />
      <h1 className="text-4xl font-bold mt-8">{movie.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {movie.description}
      </p>
    </div>
  );
}
