export interface Movie {
  id?: string | number;
  title: string;
  genre: string;
  description: string;
}

export interface NewMovie {
  title: string;
  genre: string;
  description: string;
}
