"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookFilterAbleFields = exports.bookSearchAbleFields = void 0;
exports.bookSearchAbleFields = ['title', 'author', 'genre'];
exports.bookFilterAbleFields = [
    'searchTerm',
    'title',
    'author',
    'minPrice',
    'maxPrice',
    'genre',
    'publicationDate',
    'categoryId',
];
exports.bookRelationalFields = ['categoryId'];
exports.bookRelationalFieldsMapper = {
    categoryId: 'category',
};
