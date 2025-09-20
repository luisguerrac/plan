import React from 'react';
import type { LessonPlanData } from '../types';
import { exportToPdf, exportToWord } from '../services/exportService';
import { Icon } from './Icon';

interface LessonPlanProps {
  plan: LessonPlanData;
}

const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <th className="p-2 border border-gray-300 bg-gray-100 font-bold text-gray-800 text-sm uppercase tracking-wider">{children}</th>
);

const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => (
    <td className={`p-2 border border-gray-300 align-top ${className || ''}`} {...props}>{children}</td>
);

const ListItems: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
);

export const LessonPlan: React.FC<LessonPlanProps> = ({ plan }) => {

  const handlePdfDownload = () => {
    exportToPdf('lesson-plan-content', `Planificacion-${plan.subject.replace(' ', '_')}`);
  };

  const handleWordDownload = async () => {
    await exportToWord('lesson-plan-content', `Planificacion-${plan.subject.replace(' ', '_')}.docx`);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 text-black">
      <div id="lesson-plan-content" className="overflow-x-auto">
        <h2 className="text-2xl font-bold text-center mb-4">PLANIFICACIÓN MICROCURRICULAR DE UNIDAD DIDÁCTICA</h2>
        
        <table id="informative-data-table" className="w-full border-collapse border border-gray-300 mb-6 text-sm text-black">
            <tbody>
                <tr>
                    <TableCell className="font-bold bg-gray-50 w-1/4">NOMBRE DE LA INSTITUCIÓN:</TableCell>
                    <TableCell>{plan.institution}</TableCell>
                    <TableCell className="font-bold bg-gray-50 w-1/6">FECHA:</TableCell>
                    <TableCell className='w-1/4'>{plan.date}</TableCell>
                </tr>
                 <tr>
                    <TableCell className="font-bold bg-gray-50">NOMBRE DEL DOCENTE:</TableCell>
                    <TableCell>{plan.teacher}</TableCell>
                    <TableCell className="font-bold bg-gray-50">AÑO LECTIVO:</TableCell>
                    <TableCell>{plan.academicYear}</TableCell>
                </tr>
                <tr>
                    <TableCell className="font-bold bg-gray-50">ÁREA:</TableCell>
                    <TableCell>{plan.subject}</TableCell>
                    <TableCell className="font-bold bg-gray-50">ASIGNATURA:</TableCell>
                    <TableCell>{plan.subject}</TableCell>
                </tr>
                 <tr>
                    <TableCell className="font-bold bg-gray-50">UNIDAD DIDÁCTICA:</TableCell>
                    <TableCell>{plan.unitNumber}. {plan.unitTitle}</TableCell>
                    <TableCell className="font-bold bg-gray-50">GRADO/CURSO:</TableCell>
                    <TableCell>{plan.grade}</TableCell>
                </tr>
                <tr>
                    <TableCell className="font-bold bg-gray-50">OBJETIVO DE UNIDAD:</TableCell>
                    <TableCell colSpan={3}>{plan.unitObjective}</TableCell>
                </tr>
                <tr>
                    <TableCell className="font-bold bg-gray-50">CRITERIO DE EVALUACIÓN:</TableCell>
                    <TableCell colSpan={3}>{plan.evaluationCriteria}</TableCell>
                </tr>
                 <tr>
                    <TableCell className="font-bold bg-gray-50">INSERCIONES CURRICULARES:</TableCell>
                    <TableCell colSpan={3}>{plan.curricularInsertions.join(', ')}</TableCell>
                </tr>
            </tbody>
        </table>

        {plan.weeklyPlans.map((weeklyPlan, index) => (
            <div key={weeklyPlan.week} className="mb-8">
                 <h3 className="text-lg font-bold mb-2">Semana {weeklyPlan.week}</h3>
                 <table id={`weekly-plan-table-${index}`} className="w-full border-collapse border border-gray-300 text-sm text-black">
                    <thead>
                        <tr>
                            <TableHeader>DESTREZAS CON CRITERIO DE DESEMPEÑO</TableHeader>
                            <TableHeader>ACTIVIDADES DE APRENDIZAJES (Estrategias Metodológicas)</TableHeader>
                            <TableHeader>RECURSOS</TableHeader>
                            <TableHeader>EVALUACIÓN</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <TableCell className="w-1/4">
                                <p className="font-semibold">{weeklyPlan.skill.code}</p>
                                <p>{weeklyPlan.skill.description}</p>
                            </TableCell>
                            <TableCell className="w-2/5">
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-bold">PRINCIPIO DUA DE REPRESENTACIÓN (Anticipación)</h4>
                                        <ListItems items={weeklyPlan.learningActivities.representation} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">PRINCIPIO DUA DE EXPRESIÓN Y ACCIÓN (Construcción)</h4>
                                        <ListItems items={weeklyPlan.learningActivities.expressionAndAction} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">PRINCIPIO DUA DE IMPLICACIÓN (Consolidación)</h4>
                                        <ListItems items={weeklyPlan.learningActivities.implication} />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="w-1/6">
                                <ListItems items={weeklyPlan.resources} />
                            </TableCell>
                            <TableCell className="w-1/4">
                                <p><span className="font-semibold">Indicador:</span> {weeklyPlan.evaluation.indicator}</p>
                                <p className="mt-2"><span className="font-semibold">Técnica:</span> {weeklyPlan.evaluation.technique}</p>
                                <p className="mt-2"><span className="font-semibold">Instrumento:</span> {weeklyPlan.evaluation.instrument}</p>
                            </TableCell>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))}

        {plan.curricularAdaptation && (
            <div className="mt-10">
                <h2 className="text-xl font-bold text-center mb-4">PLANIFICACIÓN DE ADAPTACIONES CURRICULARES</h2>
                <table id="adaptation-info-table" className="w-full border-collapse border border-gray-300 mb-6 text-sm text-black">
                    <tbody>
                        <tr>
                            <TableCell className="font-bold bg-gray-50 w-1/4">NECESIDAD EDUCATIVA ESPECÍFICA:</TableCell>
                            <TableCell colSpan={3}>{plan.curricularAdaptation.educationalNeed}</TableCell>
                        </tr>
                        <tr>
                            <TableCell className="font-bold bg-gray-50 w-1/4">GRADO DE ADAPTACIÓN:</TableCell>
                            <TableCell colSpan={3}>{plan.curricularAdaptation.adaptationGrade}</TableCell>
                        </tr>
                    </tbody>
                </table>

                <table id="adaptation-plan-table" className="w-full border-collapse border border-gray-300 text-sm text-black">
                    <thead>
                        <tr>
                            <TableHeader>DESTREZA CON CRITERIO DE DESEMPEÑO ADAPTADA</TableHeader>
                            <TableHeader>ACTIVIDADES DE APRENDIZAJES ADAPTADAS</TableHeader>
                            <TableHeader>RECURSOS ADAPTADOS</TableHeader>
                            <TableHeader>EVALUACIÓN ADAPTADA</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <TableCell className="w-1/4">{plan.curricularAdaptation.skillAdaptation}</TableCell>
                            <TableCell className="w-2/5">
                                <ListItems items={plan.curricularAdaptation.methodologyAdaptation} />
                            </TableCell>
                            <TableCell className="w-1/6">
                                <ListItems items={plan.curricularAdaptation.resourceAdaptation} />
                            </TableCell>
                            <TableCell className="w-1/4">{plan.curricularAdaptation.evaluationAdaptation}</TableCell>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handlePdfDownload}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Icon path="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75z M3 16.5a.75.75 0 01.75.75v2.25a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V17.25a.75.75 0 011.5 0v2.25a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 19.5V17.25a.75.75 0 01.75-.75z" className="w-5 h-5 mr-2 text-red-600" />
            Descargar PDF
          </button>
          <button
            onClick={handleWordDownload}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
             <Icon path="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75z M3 16.5a.75.75 0 01.75.75v2.25a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V17.25a.75.75 0 011.5 0v2.25a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 19.5V17.25a.75.75 0 01.75-.75z" className="w-5 h-5 mr-2 text-blue-600" />
            Descargar Word
          </button>
      </div>
    </div>
  );
};