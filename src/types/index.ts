export interface BaseItem {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  image: string;
}

export interface LostItem extends BaseItem {
  status: 'pending' | 'found';
}

export interface FoundItem extends BaseItem {
  status: 'unclaimed' | 'claimed';
}