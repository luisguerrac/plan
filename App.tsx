
import React, { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { PlannerForm } from './components/PlannerForm';
import { LessonPlan } from './components/LessonPlan';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generatePlan } from './services/geminiService';
import type { UserInputs, LessonPlanData } from './types';

function App() {
  const [lessonPlan, setLessonPlan] = useState<LessonPlanData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async (data: UserInputs) => {
    setIsLoading(true);
    setError(null);
    setLessonPlan(null);
    try {
      const plan = await generatePlan(data);
      setLessonPlan(plan);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Hero />
        <PlannerForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
        
        <div className="mt-8">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {lessonPlan && !isLoading && <LessonPlan plan={lessonPlan} />}
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Generado con IA. Revise el contenido antes de su uso.</p>
      </footer>
    </div>
  );
}

export default App;
