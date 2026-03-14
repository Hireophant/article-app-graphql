
import Category from "../models/category.model";

export const resolversCategory = {
    Query: {
        getListCategory: async () => {
            const categories = await Category.find({ deleted: false });
            return categories;
        },
        getCategory: async (_: any, args) => {
            const { id } = args;
            const category = await Category.findOne({ _id: id, deleted: false });
            return category;
        },
    },
    Mutation: {
        createCategory: async (_: any, args) => {
            const { category } = args;
            const newCategory = new Category(category);
            await newCategory.save();
            return newCategory;
        },
        deleteCategory: async (_: any, args) => {
            const { id } = args;
            await Category.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
            return "Delete category successfully";
        },
        updateCategory: async (_: any, args) => {
            const { id, category } = args;
            await Category.updateOne({ _id: id, deleted: false }, category);
            const record = await Category.findOne({ _id: id });
            return record;
        },
    },
};