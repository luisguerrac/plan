import React, { useState } from 'react';
import type { UserInputs } from '../types';
import { Icon } from './Icon';

interface PlannerFormProps {
  onSubmit: (data: UserInputs) => void;
  isLoading: boolean;
}

export const PlannerForm: React.FC<PlannerFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInputs>({
    institution: 'Unidad Educativa "Sagrados Corazones de Rumipamba"',
    teacher: 'Lic. Ana Sánchez',
    date: new Date().toLocaleDateString('es-EC'),
    academicYear: '2024-2025',
    subject: 'Matemáticas',
    grade: 'Cuarto EGB',
    unitTitle: 'Patrones y Sucesiones',
    topic: 'Sucesiones numéricas crecientes a partir de patrones de adición.',
    needsAdaptation: false,
    educationalNeed: 'Dificultades de Aprendizaje (DEA)',
    adaptationGrade: 'Grado 2',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Datos Informativos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Nombre de la Institución</label>
            <input
              type="text"
              name="institution"
              id="institution"
              value={formData.institution}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej: Unidad Educativa..."
              required
            />
          </div>
           <div>
            <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Nombre del Docente</label>
            <input
              type="text"
              name="teacher"
              id="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej: Lic. Juan Pérez"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="text"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej: 25/05/2024"
              required
            />
          </div>
           <div>
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">Año Lectivo</label>
            <input
              type="text"
              name="academicYear"
              id="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej: 2024-2025"
              required
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 pt-4">Datos de la Unidad Didáctica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Asignatura</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej: Matemáticas"
              required
            />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grado/Curso</label>
            <input
              type="text"
              name="grade"
              id="grade"
              value={formData.grade}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej: Cuarto EGB"
              required
            />
          </div>
          <div>
            <label htmlFor="unitTitle" className="block text-sm font-medium text-gray-700">Título de la Unidad</label>
            <input
              type="text"
              name="unitTitle"
              id="unitTitle"
              value={formData.unitTitle}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej: El mundo de los números"
              required
            />
          </div>
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Tema Principal</label>
            <input
              type="text"
              name="topic"
              id="topic"
              value={formData.topic}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej: Sucesiones numéricas"
              required
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 pt-4">Adaptaciones Curriculares</h2>
        <div className="space-y-4">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="needsAdaptation"
                        name="needsAdaptation"
                        type="checkbox"
                        checked={formData.needsAdaptation}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="needsAdaptation" className="font-medium text-gray-700">Generar adaptación curricular para un estudiante</label>
                    <p className="text-gray-500">Selecciona esta opción para crear una planificación adaptada.</p>
                </div>
            </div>

            {formData.needsAdaptation && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t mt-4">
                    <div>
                        <label htmlFor="educationalNeed" className="block text-sm font-medium text-gray-700">Tipo de Necesidad Educativa</label>
                        <select
                            id="educationalNeed"
                            name="educationalNeed"
                            value={formData.educationalNeed}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option>Dificultades de Aprendizaje (DEA)</option>
                            <option>Discapacidad Intelectual</option>
                            <option>Discapacidad Auditiva</option>
                            <option>Discapacidad Visual</option>
                            <option>Trastorno del Espectro Autista (TEA)</option>
                            <option>Trastorno por Déficit de Atención e Hiperactividad (TDAH)</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="adaptationGrade" className="block text-sm font-medium text-gray-700">Grado de Adaptación</label>
                        <select
                            id="adaptationGrade"
                            name="adaptationGrade"
                            value={formData.adaptationGrade}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="Grado 1">Grado 1 (Acceso al currículo)</option>
                            <option value="Grado 2">Grado 2 (Metodológica)</option>
                            <option value="Grado 3">Grado 3 (Contenidos)</option>
                        </select>
                    </div>
                </div>
            )}
        </div>


        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? 'Generando...' : 'Generar Planificación'}
            <Icon path="M9.814 6.106a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 11-1.06-1.06L13.5 12 9.814 7.166a.75.75 0 010-1.06z" className="w-5 h-5 ml-2 -mr-1" />
          </button>
        </div>
      </form>
    </div>
  );
};