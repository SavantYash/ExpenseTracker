export interface Transaction {
  id?: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  note?: string;
  date: any; // Firebase Timestamp
  month: string; // e.g. "2025-10"
  createdAt?: any; // Firebase Timestamp
}
