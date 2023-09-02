export const bookSearchAbleFields: string[] = ['title', 'author', 'genre'];

export const bookFilterAbleFields: string[] = [
  'searchTerm',
  'title',
  'author',
  'minPrice',
  'maxPrice',
  'genre',
  'publicationDate',
  'categoryId',
];
export const bookRelationalFields: string[] = ['categoryId'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
