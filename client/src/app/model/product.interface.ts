export interface Product {
  id: number;
  name: string;
  price: number;
  short_description: string | null;
  long_description: string | null;
  thumbnail_url: string | null;
  on_hand: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
