import React from "react";
import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <Card className="cursor-pointer hover:scale-105 transition-transform">
            <AspectRatio ratio={16/9}>
              <img
                src={movie.thumbnailUrl}
                alt={movie.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </AspectRatio>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{movie.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {movie.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
