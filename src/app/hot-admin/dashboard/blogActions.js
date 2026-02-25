'use server';

import { prisma } from '../../../lib/prisma';
import { revalidatePath } from 'next/cache';

// Fetch all blogs
export async function getBlogs() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return blogs;
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return [];
    }
}

// Fetch a single blog by slug
export async function getBlogBySlug(slug) {
    try {
        const blog = await prisma.blog.findUnique({
            where: { slug }
        });
        return blog;
    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return null;
    }
}

// Fetch a single blog by id
export async function getBlogById(id) {
    try {
        const blog = await prisma.blog.findUnique({
            where: { id }
        });
        return blog;
    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return null;
    }
}

// Create a new blog
export async function createBlog(formData) {
    try {
        const title = formData.get('title');
        const slug = formData.get('slug');
        const content = formData.get('content');
        const imageUrl = formData.get('imageUrl');
        const published = formData.get('published') === 'on';

        if (!title || !slug || !content) {
            return { error: 'Title, slug, and content are required.' };
        }

        const blog = await prisma.blog.create({
            data: { title, slug, content, imageUrl, published }
        });

        revalidatePath('/hot-admin/dashboard/blogs');
        return { success: true, blog };
    } catch (error) {
        console.error("Failed to create blog:", error);
        if (error.code === 'P2002') {
            return { error: 'A blog with this slug already exists.' };
        }
        return { error: 'Failed to create blog.' };
    }
}

// Update an existing blog
export async function updateBlog(id, formData) {
    try {
        const title = formData.get('title');
        const slug = formData.get('slug');
        const content = formData.get('content');
        const imageUrl = formData.get('imageUrl');
        const published = formData.get('published') === 'on';

        if (!title || !slug || !content) {
            return { error: 'Title, slug, and content are required.' };
        }

        const blog = await prisma.blog.update({
            where: { id },
            data: { title, slug, content, imageUrl, published }
        });

        revalidatePath('/hot-admin/dashboard/blogs');
        revalidatePath(`/blog/${slug}`); // Assuming public blog route future integration
        return { success: true, blog };
    } catch (error) {
        console.error("Failed to update blog:", error);
        if (error.code === 'P2002') {
            return { error: 'A blog with this slug already exists.' };
        }
        return { error: 'Failed to update blog.' };
    }
}

// Delete a blog
export async function deleteBlog(formData) {
    try {
        const id = formData.get('id');
        if (!id) return { error: 'ID is required' };

        await prisma.blog.delete({
            where: { id }
        });

        revalidatePath('/hot-admin/dashboard/blogs');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete blog:", error);
        return { error: 'Failed to delete blog.' };
    }
}
