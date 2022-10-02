export type Stack = {
  timestamp: TimeStamp;
  title: string;
  price: number;
  pages: number;
};

export type Book = {
  isbn: number;
  title: string;
};

export type AllBooks = {
  data: {
    books: Book[];
    allBooks: number;
  };
};
