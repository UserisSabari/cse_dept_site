'use server';

import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { isAuthenticated } from '@/lib/auth';

export async function getBlogs() {
    try {
        await dbConnect();
        const blogs = await Blog.find({}).lean();
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        throw new Error('Failed to fetch blogs');
    }
}

export async function getBlogById(id) {
    try {
        if (!id) return null;
        await dbConnect();
        if (mongoose.Types.ObjectId.isValid(id)) {
            const blog = await Blog.findById(id).lean();
            if (blog) {
                return JSON.parse(JSON.stringify(blog));
            }
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch blog by id:', error);
        return null;
    }
}

export async function createBlog({
    name,
    authorName,
    type,
    authorPosition,
    authorImage,
    authorLinkedin,
}) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const newBlog = new Blog({
            name,
            authorName,
            type,
            authorPosition,
            authorImage,
            authorLinkedin,
        });
        await newBlog.save();
        return {
            message: 'Blog created successfully',
        };
    } catch (error) {
        console.error('Failed to create blog:', error);
        throw new Error('Failed to create blog');
    }
}

export async function deleteBlog(blogId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            throw new Error('Blog not found');
        }
        return { message: 'Blog deleted successfully' };
    } catch (error) {
        console.error('Failed to delete blog:', error);
        throw new Error('Failed to delete blog');
    }
}
