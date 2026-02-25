import api from "./api.ts"
import {Phase, Level, Chapter, Set, Lesson, StrapiDocIdx} from "../types"



export const getActivePhase = async (documentId: string): Promise<StrapiDocIdx|null> => {
    try {
        return await api.get<StrapiDocIdx>(`/courses/${documentId}/activePhase`);
    } catch (error) {
        console.warn("Could not fetch active phase:", error);
        return null; 
    }
}

export const getLevels = async (phaseId: number) => {
    
}

export const getLessonContent = async () => {
    
}