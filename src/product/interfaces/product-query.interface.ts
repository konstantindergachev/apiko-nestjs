export interface IProductAllQuery {
  offset: string;
  limit: string;
  sortBy: string;
}

export interface IProductByIdsQuery {
  ids: string;
}

export interface IProductSearch {
  keywords: string;
  offset: string;
  limit: string;
}

export interface IProductFavorites {
  offset: string;
  limit: string;
}
