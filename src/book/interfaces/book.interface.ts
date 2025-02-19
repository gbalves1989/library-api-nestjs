interface ICategory {
  id: string;
  name: string;
}

interface IAuthor {
  id: string;
  name: string;
  avatar: string;
}

export interface IBook {
  id: string;
  name: string;
  description: string;
  banner: string;
  category: ICategory;
  author: IAuthor;
}
