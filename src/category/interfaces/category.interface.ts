interface IBook {
  id: string;
  name: string;
  description: string;
  banner: string;
  authorId: string;
}

export interface ICategory {
  id: string;
  name: string;
  Book: IBook[];
}
