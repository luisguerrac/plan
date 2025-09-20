
import React, { useState, useEffect } from 'react';

const loadingMessages = [
    "Analizando el currículo ecuatoriano...",
    "Consultando directrices del Ministerio de Educación...",
    "Generando destrezas con criterio de desempeño...",
    "Integrando principios de Diseño Universal para el Aprendizaje (DUA)...",
    "Alineando con competencias clave...",
    "Elaborando actividades de aprendizaje...",
    "Finalizando la planificación..."
];

export const LoadingSpinner: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-md border border-gray-200">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-gray-700 text-center transition-opacity duration-500">
                {loadingMessages[messageIndex]}
            </p>
        </div>
    );
};
