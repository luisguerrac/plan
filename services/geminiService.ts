import { GoogleGenAI, Type } from "@google/genai";
import type { UserInputs, LessonPlanData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        institution: { type: Type.STRING, description: "Un nombre de institución educativa ecuatoriana genérico." },
        teacher: { type: Type.STRING, description: "Un nombre de docente genérico." },
        subject: { type: Type.STRING },
        grade: { type: Type.STRING },
        date: { type: Type.STRING, description: "La fecha actual en formato DD/MM/AAAA." },
        academicYear: { type: Type.STRING, description: "El año académico actual, ej: 2024-2025." },
        unitNumber: { type: Type.INTEGER },
        unitTitle: { type: Type.STRING },
        unitObjective: { type: Type.STRING },
        evaluationCriteria: { type: Type.STRING, description: "El Criterio de Evaluación oficial del currículo ecuatoriano que se alinea con las destrezas generadas." },
        curricularInsertions: { type: Type.ARRAY, items: { type: Type.STRING } },
        weeklyPlans: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    week: { type: Type.INTEGER },
                    skill: {
                        type: Type.OBJECT,
                        properties: {
                            code: { type: Type.STRING, description: "Código oficial de la destreza del currículo ecuatoriano." },
                            description: { type: Type.STRING, description: "Descripción de la destreza, seguida por el nombre de su competencia clave (Comunicacionales, Matemáticas, Digitales o Socioemocionales)." }
                        },
                        required: ["code", "description"]
                    },
                    learningActivities: {
                        type: Type.OBJECT,
                        properties: {
                            representation: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actividades de Anticipación (PRINCIPIO DUA DE REPRESENTACIÓN)." },
                            expressionAndAction: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actividades de Construcción (PRINCIPIO DUA DE EXPRESIÓN Y ACCIÓN)." },
                            implication: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actividades de Consolidación (PRINCIPIO DUA DE IMPLICACIÓN)." }
                        },
                        required: ["representation", "expressionAndAction", "implication"]
                    },
                    resources: { type: Type.ARRAY, items: { type: Type.STRING } },
                    evaluation: {
                        type: Type.OBJECT,
                        properties: {
                            indicator: { type: Type.STRING, description: "El Indicador de Evaluación oficial del currículo ecuatoriano que se alinea con la destreza." },
                            technique: { type: Type.STRING },
                            instrument: { type: Type.STRING }
                        },
                        required: ["indicator", "technique", "instrument"]
                    }
                },
                required: ["week", "skill", "learningActivities", "resources", "evaluation"]
            }
        },
        curricularAdaptation: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
                educationalNeed: { type: Type.STRING },
                adaptationGrade: { type: Type.STRING },
                skillAdaptation: { type: Type.STRING, description: "La destreza adaptada según el grado. Grado 1 y 2 mantienen la destreza original. Grado 3 modifica la destreza, bajando la complejidad." },
                methodologyAdaptation: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actividades de aprendizaje específicas y adaptadas para el estudiante." },
                resourceAdaptation: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Recursos y materiales de apoyo específicos para el estudiante." },
                evaluationAdaptation: { type: Type.STRING, description: "Indicador, técnica e instrumento de evaluación adaptados." }
            }
        }
    },
    required: ["institution", "teacher", "subject", "grade", "date", "academicYear", "unitNumber", "unitTitle", "unitObjective", "evaluationCriteria", "curricularInsertions", "weeklyPlans"]
};

const getAdaptationPrompt = (inputs: UserInputs) => {
    if (!inputs.needsAdaptation) {
        return "";
    }

    return `
    **SECCIÓN DE ADAPTACIONES CURRICULARES:**
    Adicionalmente, genera una planificación de adaptación curricular para un estudiante con la siguiente necesidad:
    -   **Necesidad Educativa Específica:** ${inputs.educationalNeed}
    -   **Grado de Adaptación:** ${inputs.adaptationGrade}

    **Directrices para la Adaptación según el Grado (Ministerio de Educación de Ecuador):**
    -   **Grado 1 (Acceso al currículo):** No modifiques la destreza ni la evaluación. Adapta los recursos (materiales, espacios, tiempo) y las metodologías (estrategias de enseñanza).
    -   **Grado 2 (Metodológica):** No modifiques la destreza. Adapta la metodología, las actividades y la evaluación (indicadores, técnicas e instrumentos diferentes).
    -   **Grado 3 (Contenidos):** Modifica la destreza con criterio de desempeño, reduciendo su complejidad. Adapta la metodología y la evaluación de acuerdo a la nueva destreza.

    Crea un objeto \`curricularAdaptation\` con las adaptaciones correspondientes en la destreza (si es Grado 3), metodología, recursos y evaluación. Sé específico y práctico en las adaptaciones sugeridas.
    `;
}


export const generatePlan = async (inputs: UserInputs): Promise<LessonPlanData> => {
    const adaptationPrompt = getAdaptationPrompt(inputs);

    const prompt = `
    Actúa como un experto en diseño curricular para el sistema educativo de Ecuador. Tu tarea es crear una "Planificación Microcurricular de Unidad Didáctica" (PUD) completa y detallada.

    **REGLAS ESTRICTAS:**
    1.  **Currículo Ecuatoriano:** Todo el contenido debe basarse estrictamente en el currículo del Ministerio de Educación de Ecuador.
    2.  **Destrezas:** Genera 1 destreza con criterio de desempeño relevante para el tema. Debe incluir su código oficial (ej. M.2.1.3.). Al final de la descripción de la destreza, AÑADE el nombre de la competencia clave principal que desarrolla, eligiendo entre: "Comunicacionales", "Matemáticas", "Digitales", "Socioemocionales".
    3.  **Principios DUA:** Las actividades de aprendizaje deben estructurarse en tres momentos, correspondiendo a los principios del Diseño Universal para el Aprendizaje (DUA):
        -   **Anticipación (REPRESENTACIÓN):** ¿Qué van a aprender? Actividades para activar conocimientos previos.
        -   **Construcción (EXPRESIÓN Y ACCIÓN):** ¿Cómo van a aprender? Actividades para construir el nuevo conocimiento.
        -   **Consolidación (IMPLICACIÓN):** ¿Para qué van a aprender? Actividades para aplicar y transferir el conocimiento.
    4.  **Inserciones Curriculares:** Selecciona UNA inserción curricular relevante para el tema de la siguiente lista: "Educación Cívica, Ética e Integridad", "Educación para el Desarrollo Sostenible", "Educación socioemocional", "Educación Financiera", "Educación para la seguridad vial y Movilidad Sostenible".
    5.  **Formato:** Responde únicamente con el objeto JSON que se ajusta al esquema proporcionado. No incluyas texto adicional, explicaciones o markdown. Si no se solicita una adaptación curricular, el campo 'curricularAdaptation' debe ser nulo.

    **DATOS PARA LA PLANIFICACIÓN:**
    -   **Asignatura:** ${inputs.subject}
    -   **Grado/Curso:** ${inputs.grade}
    -   **Título de la Unidad:** ${inputs.unitTitle}
    -   **Tema Principal de la Semana 1:** ${inputs.topic}

    Genera una planificación para una sola semana.

    ${adaptationPrompt}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7
            },
        });
        
        const jsonText = response.text.trim();
        let planData = JSON.parse(jsonText) as LessonPlanData;
        
        // If no adaptation was requested but model sent an empty object, nullify it.
        if (!inputs.needsAdaptation) {
            planData.curricularAdaptation = undefined;
        } else if (planData.curricularAdaptation) {
             // Ensure the user's selected values are in the final object
            planData.curricularAdaptation.educationalNeed = inputs.educationalNeed;
            planData.curricularAdaptation.adaptationGrade = inputs.adaptationGrade;
        }


        // Ensure user inputs are reflected in the final plan
        planData.institution = inputs.institution;
        planData.teacher = inputs.teacher;
        planData.date = inputs.date;
        planData.academicYear = inputs.academicYear;
        planData.subject = inputs.subject;
        planData.grade = inputs.grade;
        planData.unitTitle = inputs.unitTitle;
        planData.unitNumber = 1; // Default to 1 for this generator

        return planData;
    } catch (error) {
        console.error("Error generating lesson plan:", error);
        let errorMessage = "An unknown error occurred while generating the plan.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(`Failed to generate lesson plan: ${errorMessage}. Please check your API key and network connection.`);
    }
};