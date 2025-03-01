import { users, type User, type InsertUser } from "@shared/schema";
import { z } from "zod";

export const contactMessageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  createdAt: z.date()
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type InsertContactMessage = Omit<ContactMessage, "id" | "createdAt">;

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMessages(): Promise<ContactMessage[]>;
  createMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, ContactMessage>;
  currentId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.currentId = 1;
    this.currentMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMessages(): Promise<ContactMessage[]> {
    return Array.from(this.messages.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();