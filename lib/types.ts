export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  modified?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  tags?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  author: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
