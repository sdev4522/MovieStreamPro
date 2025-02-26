import React from "react";
import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";
import { motion } from "framer-motion";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="group cursor-pointer overflow-hidden bg-black/20 hover:bg-black/40 transition-colors">
              <AspectRatio ratio={16/9}>
                <div className="relative w-full h-full">
                  <img
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-t-lg brightness-90 group-hover:brightness-110 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </AspectRatio>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {movie.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80">
                  {movie.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}