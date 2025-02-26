import { movies, categories, users, type Movie, type Category, type User, type InsertMovie, type InsertCategory, type InsertUser } from "@shared/schema";

export interface IStorage {
  // Movies
  getMovies(): Promise<Movie[]>;
  getMovie(id: number): Promise<Movie | undefined>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  updateMovie(id: number, movie: Partial<InsertMovie>): Promise<Movie | undefined>;
  deleteMovie(id: number): Promise<boolean>;
  getMoviesByCategory(categoryId: number): Promise<Movie[]>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private movies: Map<number, Movie>;
  private categories: Map<number, Category>;
  private users: Map<number, User>;
  private currentMovieId: number;
  private currentCategoryId: number;
  private currentUserId: number;

  constructor() {
    this.movies = new Map();
    this.categories = new Map();
    this.users = new Map();
    this.currentMovieId = 1;
    this.currentCategoryId = 1;
    this.currentUserId = 1;

    // Add mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    const actionCategory: Category = {
      id: this.currentCategoryId++,
      name: "Action",
      slug: "action",
    };
    this.categories.set(actionCategory.id, actionCategory);

    const dramaCategory: Category = {
      id: this.currentCategoryId++,
      name: "Drama",
      slug: "drama",
    };
    this.categories.set(dramaCategory.id, dramaCategory);

    const mockMovies: Movie[] = [
      {
        id: this.currentMovieId++,
        title: "Big Buck Bunny",
        description: "A large rabbit deals with three bullies.",
        categoryId: actionCategory.id,
        thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/640px-Big_buck_bunny_poster_big.jpg",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "self_hosted",
      },
      {
        id: this.currentMovieId++,
        title: "Elephant's Dream",
        description: "The first Blender Open Movie from 2006.",
        categoryId: dramaCategory.id,
        thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Elephants_Dream_Poster.jpg/640px-Elephants_Dream_Poster.jpg",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: "self_hosted",
      },
    ];

    mockMovies.forEach(movie => {
      this.movies.set(movie.id, movie);
    });

    // Create admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      isAdmin: true,
    });
  }

  // Movies
  async getMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values());
  }

  async getMovie(id: number): Promise<Movie | undefined> {
    return this.movies.get(id);
  }

  async createMovie(movie: InsertMovie): Promise<Movie> {
    const newMovie: Movie = { ...movie, id: this.currentMovieId++ };
    this.movies.set(newMovie.id, newMovie);
    return newMovie;
  }

  async updateMovie(id: number, movie: Partial<InsertMovie>): Promise<Movie | undefined> {
    const existing = this.movies.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...movie };
    this.movies.set(id, updated);
    return updated;
  }

  async deleteMovie(id: number): Promise<boolean> {
    return this.movies.delete(id);
  }

  async getMoviesByCategory(categoryId: number): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(
      (movie) => movie.categoryId === categoryId
    );
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory = { ...category, id: this.currentCategoryId++ };
    this.categories.set(newCategory.id, newCategory);
    return newCategory;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = { ...user, id: this.currentUserId++ };
    this.users.set(newUser.id, newUser);
    return newUser;
  }
}

export const storage = new MemStorage();