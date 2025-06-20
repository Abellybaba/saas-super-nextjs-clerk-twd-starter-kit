export interface User {
  id: string; // Clerk's user ID
  email: string;
  username: string;
  bio?: string;
  profilePhotoUrl?: string;
}

export interface Link {
  id: string;
  userId: string;
  title: string;
  url: string;
  isActive: boolean;
  orderIndex: number;
}