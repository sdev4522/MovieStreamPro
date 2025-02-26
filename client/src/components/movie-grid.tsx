import React from "react";
import { Card } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="space-y-8">
      {/* Main Categories */}
      <div className="flex flex-wrap gap-4 justify-center mb-8 px-4">
        {["Hollywood", "Bollywood", "Tollywood"].map((category) => (
          <Link key={category} href="/">
            <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 transform hover:-translate-y-0.5 transition-all">
              {category}
            </button>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 px-2">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Card className="group cursor-pointer border-none bg-transparent shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden rounded-xl">
                  <AspectRatio ratio={9/16}>
                    <img
                      src={movie.thumbnailUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <PlayCircle className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <div className="w-full">
                        <h3 className="font-medium text-sm text-white line-clamp-2 leading-tight">
                          {movie.title}
                        </h3>
                      </div>
                    </div>
                  </AspectRatio>
                </div>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}