export interface Category {
    id: number;
    name: string;
    description: string;
    slug: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    brand: string;
    quantity: number;
    unit: string;
    is_new: boolean;
    gender: 'man' | 'woman' | 'uni';
    category_id: string;
    volume_options: number[];
    scent: string[];
    image_url: string[];
    rating: string;
    discount: number;
    created_at: string;
    category: Category;
    reviews_count: string;
  }