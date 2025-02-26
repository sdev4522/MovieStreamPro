import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2Icon, PencilIcon } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Movie } from "@shared/schema";
import { useLocation } from "wouter";

export default function AdminMovies() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/movies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({
        title: "Success",
        description: "Movie deleted successfully",
      });
    },
  });

  if (!user?.isAdmin) {
    setLocation("/");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Manage Movies</h1>
        <Button onClick={() => toast({ title: "Not implemented" })}>
          Add Movie
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies?.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell className="font-medium">{movie.title}</TableCell>
                <TableCell>{movie.categoryId}</TableCell>
                <TableCell>{movie.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast({ title: "Not implemented" })}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(movie.id)}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}