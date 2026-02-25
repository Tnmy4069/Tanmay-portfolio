import { prisma } from './src/lib/prisma.js';
import { getBlogs, createBlog, getBlogBySlug, deleteBlog } from './src/app/hot-admin/dashboard/blogActions.js';

async function test() {
    console.log("Testing createBlog...");

    // Create a mock formData object
    const formData = new Map();
    formData.set('title', 'Test Blog');
    formData.set('slug', 'test-blog-123');
    formData.set('content', '# Hello World');
    formData.set('published', 'on');

    const mockFormData = {
        get: (key) => formData.get(key)
    };

    const result = await createBlog(mockFormData);
    if (result.error) {
        console.error("Failed to create blog:", result.error);
        return;
    }

    const blogId = result.blog.id;
    console.log("Success! Created Blog ID:", blogId);

    console.log("Testing getBlogs...");
    const blogs = await getBlogs();
    console.log(`Found ${blogs.length} blogs.`);

    console.log("Testing deleteBlog...");
    const deleteData = new Map();
    deleteData.set('id', blogId);
    await deleteBlog({ get: (key) => deleteData.get(key) });
    console.log("Deleted the test blog.");

    const blogsAfterDelete = await getBlogs();
    console.log(`Remaining blogs: ${blogsAfterDelete.length}`);
}

test()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
