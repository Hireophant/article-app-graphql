"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const artilce_typeDefs_1 = require("./artilce.typeDefs");
const category_typeDefs_1 = require("./category.typeDefs");
exports.typeDefs = [
    artilce_typeDefs_1.typeDefsArticle,
    category_typeDefs_1.typeDefsCategory
];
