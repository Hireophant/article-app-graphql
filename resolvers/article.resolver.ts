import Article from "../models/article.model";
import Category from "../models/category.model";


export const resolversArticle = {
    Query: {
        getListArticle: async () => {
            const articles = await Article.find({ deleted: false });
            return articles;
        },
        getArticle: async (_: any, args) => {
            const { id } = args;
            const article = await Article.findOne({ _id: id, deleted: false });
            return article;
        },
       
    },
    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;
            const category = await Category.findOne({ _id: categoryId });
            return category;
        },
    },
    Mutation: {
        createArticle: async (_: any, args) => {
            const { article } = args;
            const newArticle = new Article(article);
            await newArticle.save();
            return newArticle;
        },
        deleteArticle: async (_: any, args) => {
            const { id } = args;
            await Article.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
            return "Delete article successfully";
        },
        updateArticle: async (_: any, args) => {
            const { id, article } = args;
            await Article.updateOne({ _id: id, deleted: false }, article);
            const record = await Article.findOne({ _id: id });
            return record;
        },
    },
};