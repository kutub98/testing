
export interface IOffer {
  img: string;
  amount: number;
  dailyGift: number;
  dayLength: number;
  status?: 'pending' | 'delete' | 'approved';
}
