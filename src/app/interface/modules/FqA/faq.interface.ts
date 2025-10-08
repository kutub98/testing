
export interface FaQ {
  question: string; 
  answer: string;
}

export interface IFaQ {
  faq: FaQ[];
  status?: 'pending' | 'delete' | 'approved';
}
