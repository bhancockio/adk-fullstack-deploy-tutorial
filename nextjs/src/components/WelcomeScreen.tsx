"use client";

import { InputForm } from "@/components/InputForm";
import { Target, ListChecks, CheckCircle } from "lucide-react";

interface WelcomeScreenProps {
  handleSubmit: (query: string) => void;
  isLoading: boolean;
}

export function WelcomeScreen({
  handleSubmit,
  isLoading,
}: WelcomeScreenProps): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-4xl w-full space-y-8">
        {/* Main header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <ListChecks className="w-6 h-6 text-blue-500" />
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">AI Goal Planner</h1>
          <p className="text-xl text-neutral-300">Powered by Google Gemini</p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Transform your goals into actionable plans with structured task
            breakdown, clear priorities, and step-by-step guidance to achieve
            success.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-green-400">Goal Planning</h3>
            <p className="text-sm text-neutral-400">
              Strategic breakdown and clear roadmap creation
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto">
              <ListChecks className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-blue-400">Task Breakdown</h3>
            <p className="text-sm text-neutral-400">
              Organized tasks and subtasks with priorities
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-purple-400">Achievement Path</h3>
            <p className="text-sm text-neutral-400">
              Clear steps and milestones to reach your goals
            </p>
          </div>
        </div>

        {/* Input form */}
        <div className="max-w-2xl mx-auto">
          <InputForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            context="homepage"
          />
        </div>

        {/* Example prompts */}
        <div className="space-y-4">
          <p className="text-neutral-400">Try asking about:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm transition-colors">
              Goal setting strategies
            </button>
            <button className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm transition-colors">
              Project planning methods
            </button>
            <button className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm transition-colors">
              Task prioritization
            </button>
            <button className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm transition-colors">
              Achievement milestones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
