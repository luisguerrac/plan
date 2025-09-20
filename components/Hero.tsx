
import React from 'react';

export const Hero: React.FC = () => (
    <div className="text-center py-12 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Generador de Planificaciones PUD
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Crea planificaciones microcurriculares para Ecuador de forma automática. Ingresa los datos de tu unidad y deja que la IA haga el resto.
        </p>
    </div>
);
