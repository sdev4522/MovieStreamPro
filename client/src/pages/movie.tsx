import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { VideoPlayer } from "@/components/ui/video-player";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: [`/api/movies/${id}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="w-full aspect-video rounded-lg" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Movie not found</h1>
          <Link href="/">
            <Button variant="link">Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>

        <div className="max-w-6xl mx-auto">
          <VideoPlayer
            url={movie.videoUrl}
            type={movie.type}
            title={movie.title}
          />
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              {movie.downloadUrl && (
                <a href={movie.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </a>
              )}
            </div>
            <p className="text-lg text-muted-foreground">
              {movie.description}
            </p>
            {movie.content && (
              <div className="mt-8 prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: movie.content }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}