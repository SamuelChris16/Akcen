import api from "./api.ts"
import {Phase, Level, Chapter, Set, Lesson, StrapiDocIdx, StrapiResponse} from "../types"



export const getActivePhase = async (documentId: string): Promise<StrapiDocIdx|null> => {
    try {
        return await api.get<StrapiDocIdx>(`/courses/${documentId}/activePhase`);
    } catch (error) {
        console.warn("Could not fetch active phase:", error);
        return null; 
    }
}

export const getRegisteredCourses = async (documentId: string): Promise<StrapiDocIdx|null> => {
    try{
        return await api.get<StrapiDocIdx>('/courses/registeredCourses');
    } catch(error){
        console.warn("Could not fetch registered course: ", error)
        return null;
    }
}

/**
 * When logged in and if the user has chosen a course, that means that
 * the front-end has fetched the active phase documentId. This fetch would then
 * be used when opening the worksheet page which will fetch all contents
 * except for the lessons inside the sets.
 */
export const getWorksheet = async (activePhaseDocumentId: string): Promise<Level[]|null> => {
    try {
        return (await api.get<StrapiResponse<Level[]>>(`/curriculum/worksheet?phaseId=${activePhaseDocumentId}`)).data;

    } catch(error){
        console.warn("Could not fetch worksheet content for this phase:", error);
        return null; 
    }

}

export const getLessonContent = async (lessonDocumentId: string): Promise<Lesson|null> => {
    try {
        return (await api.get<StrapiResponse<Lesson>>(`/lessons/${lessonDocumentId}`)).data;
    } catch(error){
        console.warn("Could not fetch lesson content: ", error);
        return null;
    }
}