export type Stack = {
  timestamp: TimeStamp;
  title: string;
  price: number;
  pages: number;
};

export type Book = {
  isbn: number;
  title: string;
  price: number | null;
  pages: number | null;
  publisher: string;
  has_image: boolean;
  authors: str[];
};

export type AllBooks = {
  data: {
    books: Book[];
    allBooks: number;
  };
};
