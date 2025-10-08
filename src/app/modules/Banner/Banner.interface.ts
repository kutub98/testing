export type IBanner = {
  id?: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  status: 'approved' | 'pending' | 'delete';
};
