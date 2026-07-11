'use server'

import dbConnect from '../lib/db';
import Syllabus from '../lib/models/Syllabus';
import { isAuthenticated } from '../lib/auth';

/**
 * Returns ALL syllabi with their course populated.
 * Used by the admin list and legacy callers.
 */
export async function getSyllabi() {
    try {
        await dbConnect();
        const syllabi = await Syllabus.find({}).populate('course');
        return JSON.parse(JSON.stringify(syllabi));
    } catch (error) {
        console.error('Failed to fetch syllabi:', error);
        throw new Error('Failed to fetch syllabi');
    }
}

/**
 * Returns a nested map used by the public SyllabusBrowser component:
 *   {
 *     BTech: { "2015": { S1: "https://...", S2: "https://..." }, "2019": { ... } },
 *     MTech: { ... },
 *     PhD:   { ... },
 *   }
 * Only documents that have a `programme` field are included.
 */
export async function getSyllabusMap() {
    try {
        await dbConnect();
        const syllabi = await Syllabus.find(
            { programme: { $exists: true, $ne: null } },
            'programme yearOfScheme sem pdfUrl'   // projection — no populate needed
        ).lean();

        const map = {};
        for (const s of syllabi) {
            const { programme, yearOfScheme, sem, pdfUrl } = s;
            if (!map[programme]) map[programme] = {};
            if (!map[programme][yearOfScheme]) map[programme][yearOfScheme] = {};
            map[programme][yearOfScheme][sem] = pdfUrl;
        }
        return map; // plain object, safe to pass from Server → Client Component
    } catch (error) {
        console.error('Failed to build syllabus map:', error);
        // Return empty map so the UI renders gracefully with "No syllabi uploaded yet"
        return {};
    }
}

export async function createSyllabus({ course, programme, sem, yearOfScheme, pdfUrl }) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();

        const newSyllabus = new Syllabus({ course, programme, sem, yearOfScheme, pdfUrl });
        await newSyllabus.save();
        return { message: "Success" };
    } catch (error) {
        console.error('Failed to create syllabus:', error);
        throw new Error('Failed to create syllabus: ' + error.message);
    }
}

export async function deleteSyllabus(id) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deleted = await Syllabus.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error('Syllabus not found');
        }
        return { message: 'Syllabus deleted successfully' };
    } catch (error) {
        console.error('Failed to delete syllabus:', error);
        throw new Error('Failed to delete syllabus');
    }
}
