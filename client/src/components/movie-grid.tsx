import React from "react";
import { Card } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";
import { motion } from "framer-motion";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Card className="group cursor-pointer border-none bg-transparent shadow-none">
              <div className="relative overflow-hidden rounded-xl">
                <AspectRatio ratio={16/9}>
                  <img
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
              </div>
              <div className="mt-3 px-1">
                <h3 className="font-medium text-base line-clamp-2 leading-tight mb-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-snug">
                  {movie.description}
                </p>
              </div>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}