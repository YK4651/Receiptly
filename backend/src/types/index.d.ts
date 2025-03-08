// src/types/index.d.ts

interface User {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

interface Receipt {
  _id: string;
  userId: string;
  imageUrl: string;
  amount: number;
  vendor?: string;
  receiptDate?: Date;
  tax?: number;
  categoryId?: string;
  tags?: string[];
  createdAt: Date;
}

interface Category {
  _id: string;
  name: string;
  userId?: string;
}

interface Tag {
  _id: string;
  name: string;
}

interface Report {
  _id: string;
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  receiptIds?: string[];
  createdAt: Date;
}