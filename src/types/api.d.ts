export type Stack = {
  timestamp: TimeStamp;
  title: string;
  price: number | null;
  pages: number | null;
  c_code: string | null;
};

export type Book = {
  isbn: number;
  title: string;
  price: number | null;
  pages: number | null;
  c_code: string | null;
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

type Author = {
  PersonName: {
    content: string;
  }
}

export type BookInfoType = {
  onix: {
    DescriptiveDetail: {
      TitleDetail: {
        TitleElement: {
          TitleText: {
            content: string;
          };
        };
      },
      Contributor: Author[]
      
    },
    PublishingDetail: {
      Imprint: {
        ImprintName: string
      }
    }
  };
};
