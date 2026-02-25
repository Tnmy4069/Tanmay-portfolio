'use server';

import { prisma } from '../../../lib/prisma';
import { revalidatePath } from 'next/cache';

async function touchVersion() {
    try {
        const existing = await prisma.about.findFirst();
        if (existing) {
            await prisma.about.update({
                where: { id: existing.id },
                data: { updatedAt: new Date() }
            });
        }
    } catch (e) { }
}

// --- ABOUT & HERO & CONTACT ---
export async function getAbout() {
    return await prisma.about.findFirst() || {
        name: 'TANMAY HIRODKAR',
        tagline: '',
        subtitle: '',
        bio: '',
        email: 'tnmy.web@gmail.com',
        phone: '+91 83800 66588',
        github: '',
        linkedin: '',
        portfolio: '',
        theme: 'cyan'
    };
}

export async function updateAbout(formData) {
    const name = formData.get('name');
    const tagline = formData.get('tagline');
    const subtitle = formData.get('subtitle');
    const bio = formData.get('bio');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const github = formData.get('github');
    const linkedin = formData.get('linkedin');
    const portfolio = formData.get('portfolio');
    const theme = formData.get('theme');

    const data = { name, tagline, subtitle, bio, email, phone, github, linkedin, portfolio, theme };

    const existing = await prisma.about.findFirst();
    if (existing) {
        await prisma.about.update({ where: { id: existing.id }, data });
    } else {
        await prisma.about.create({ data });
    }
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

// --- SKILLS ---
export async function getSkills() {
    return await prisma.skill.findMany({ orderBy: { category: 'asc' } });
}

export async function addSkill(formData) {
    const category = formData.get('category');
    const name = formData.get('name');
    try {
        await prisma.skill.create({ data: { category, name } });
        revalidatePath('/');
        revalidatePath('/hot-admin/dashboard');
    } catch (error) {
        return { error: 'Failed' }
    }
}

export async function deleteSkill(formData) {
    const id = formData.get('id');
    await prisma.skill.delete({ where: { id } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

// --- EXPERIENCE ---
export async function getExperience() {
    return await prisma.experience.findMany({ orderBy: { id: 'desc' } });
}

export async function addExperience(formData) {
    const role = formData.get('role');
    const company = formData.get('company');
    const duration = formData.get('duration');
    const description = formData.get('description');
    await prisma.experience.create({ data: { role, company, duration, description } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

export async function deleteExperience(formData) {
    const id = formData.get('id');
    await prisma.experience.delete({ where: { id } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

// --- EDUCATION ---
export async function getEducation() {
    return await prisma.education.findMany({ orderBy: { id: 'desc' } });
}

export async function addEducation(formData) {
    const degree = formData.get('degree');
    const institution = formData.get('institution');
    const year = formData.get('year');
    await prisma.education.create({ data: { degree, institution, year } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

export async function deleteEducation(formData) {
    const id = formData.get('id');
    await prisma.education.delete({ where: { id } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

// --- PROJECTS ---
export async function getProjects() {
    return await prisma.project.findMany({ orderBy: { id: 'desc' } });
}

export async function addProject(formData) {
    const title = formData.get('title');
    const desc = formData.get('desc');
    const link = formData.get('link');
    const linkLabel = formData.get('linkLabel');
    const span = formData.get('span') === 'on';
    const tags = formData.get('tags');
    await prisma.project.create({ data: { title, desc, link, linkLabel, span, tags } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

export async function deleteProject(formData) {
    const id = formData.get('id');
    await prisma.project.delete({ where: { id } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

// --- ACHIEVEMENTS ---
export async function getAchievements() {
    return await prisma.achievement.findMany({ orderBy: { id: 'desc' } });
}

export async function addAchievement(formData) {
    const number = formData.get('number');
    const label = formData.get('label');
    const span = formData.get('span') === 'on';
    await prisma.achievement.create({ data: { number, label, span } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

export async function deleteAchievement(formData) {
    const id = formData.get('id');
    await prisma.achievement.delete({ where: { id } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

// --- LEADERSHIP ---
export async function getLeadership() {
    return await prisma.leadership.findMany({ orderBy: { id: 'desc' } });
}

export async function addLeadership(formData) {
    const role = formData.get('role');
    const org = formData.get('org');
    const period = formData.get('period');
    const points = formData.get('points');
    await prisma.leadership.create({ data: { role, org, period, points } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}

export async function deleteLeadership(formData) {
    const id = formData.get('id');
    await prisma.leadership.delete({ where: { id } });
    await touchVersion();
    revalidatePath('/');
    revalidatePath('/hot-admin/dashboard');
}
