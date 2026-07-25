export interface Category {
  id: string;
  title: string;
  image: string;
  _count: { products: number };
}
