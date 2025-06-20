"use client";

import { User, Link } from "@/app/types";
import { v4 as uuidv4 } from "uuid";

const USERS_KEY = "vlink_users";
const LINKS_KEY = "vlink_links";

// --- Initialize with mock data if localStorage is empty ---
const initializeData = () => {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(USERS_KEY)) {
    const mockUsers: User[] = [
      {
        id: "user_2jBq1sA2tY3dE4fG5hI6jK7lM8n", // Sample Clerk ID
        username: "sampleuser",
        email: "sample@test.com",
        bio: "This is a sample bio. Edit me in the dashboard!",
        profilePhotoUrl: "https://avatar.vercel.sh/sampleuser.png",
      },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  }

  if (!localStorage.getItem(LINKS_KEY)) {
    const mockLinks: Link[] = [
      {
        id: uuidv4(),
        userId: "user_2jBq1sA2tY3dE4fG5hI6jK7lM8n",
        title: "My First Link",
        url: "https://example.com",
        isActive: true,
        orderIndex: 0,
      },
    ];
    localStorage.setItem(LINKS_KEY, JSON.stringify(mockLinks));
  }
};

// Initialize data on script load
initializeData();

// --- Data Service Functions ---
export const localDataService = {
  // Get a user's public profile by their username
  async getProfileByUsername(
    username: string
  ): Promise<{ user: User; links: Link[] } | null> {
    const usersStr = localStorage.getItem(USERS_KEY);
    const linksStr = localStorage.getItem(LINKS_KEY);
    if (!usersStr || !linksStr) return null;

    const users: User[] = JSON.parse(usersStr);
    const links: Link[] = JSON.parse(linksStr);

    const user = users.find((u) => u.username === username);
    if (!user) return null;

    const userLinks = links
      .filter((link) => link.userId === user.id && link.isActive)
      .sort((a, b) => a.orderIndex - b.orderIndex);

    return { user, links: userLinks };
  },

  // Get all links for a specific user (for the dashboard)
  async getLinks(userId: string): Promise<Link[]> {
    const linksStr = localStorage.getItem(LINKS_KEY);
    if (!linksStr) return [];
    const allLinks: Link[] = JSON.parse(linksStr);
    return allLinks
      .filter((link) => link.userId === userId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  },

  // Create a new link
  async createLink(
    userId: string,
    data: { title: string; url: string }
  ): Promise<Link> {
    const allLinksStr = localStorage.getItem(LINKS_KEY) || "[]";
    const allLinks: Link[] = JSON.parse(allLinksStr);

    const userLinks = allLinks.filter((l) => l.userId === userId);
    const newLink: Link = {
      id: uuidv4(),
      userId,
      title: data.title,
      url: data.url,
      isActive: true,
      orderIndex:
        userLinks.length > 0
          ? Math.max(...userLinks.map((l) => l.orderIndex)) + 1
          : 0,
    };

    const updatedLinks = [...allLinks, newLink];
    localStorage.setItem(LINKS_KEY, JSON.stringify(updatedLinks));
    return newLink;
  },

  // Delete a link
  async deleteLink(linkId: string): Promise<{ success: boolean }> {
    const allLinksStr = localStorage.getItem(LINKS_KEY) || "[]";
    const allLinks: Link[] = JSON.parse(allLinksStr);
    const updatedLinks = allLinks.filter((link) => link.id !== linkId);
    localStorage.setItem(LINKS_KEY, JSON.stringify(updatedLinks));
    return { success: true };
  },
};
