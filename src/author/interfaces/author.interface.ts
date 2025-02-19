interface IBook {
  id: string;
  name: string;
  description: string;
  banner: string;
  categoryId: string;
}

export interface IAuthor {
  id: string;
  name: string;
  avatar: string;
  Book: IBook[];
}
