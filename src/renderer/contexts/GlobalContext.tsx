import React, { useState, createContext } from 'react';
import { plan } from '../modules/types';
import { uid } from 'uid';
import { defaultPlan } from 'renderer/modules/defaultPlan';
import { emptyPlan } from 'renderer/modules/emptyPlan';

type GlobalContextProviderProps = {
  children: React.ReactNode;
};
type GlobalContextType = {
  plans: plan[];
  setPlans: React.Dispatch<React.SetStateAction<plan[]>>;
  selectedPlan: plan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<plan>>;
  addTaskToAPlan: (selectedPlanId: string, taskDescription: string) => void;
  toggleTaskCompleted: (planId: string, taskId: string) => void;
  addPlan: (planName: string, planColor: string) => void;
  changePlanColor: (planId: string, planNewColor: string) => void;
  changePlanName: (planId: string, planNewName: string) => void;
  deleteTaskFromAPlan: (selectedPlanId: string, taskId: string) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  // ---------------------------------------------
  // --STATE--------------------------------------
  // ---------------------------------------------
  const [plans, setPlans] = useState<plan[]>([defaultPlan]);

  const [selectedPlan, setSelectedPlan] = useState<plan>(emptyPlan);
  // ---------------------------------------------
  // --FUNCTIONS----------------------------------
  // ---------------------------------------------
  function addTaskToAPlan(
    selectedPlanId: string,
    taskDescription: string
  ): void {
    let _plans: plan[] = plans;
    _plans.forEach((obj) => {
      if (obj.id === selectedPlanId) {
        obj.tasks.push({
          id: uid(),
          description: taskDescription,
          due: 'datetime',
          completed: false,
        });
      }
    });
    setPlans([..._plans]);
  }
  function deleteTaskFromAPlan(selectedPlanId: string, taskId: string): void {
    let _plans: plan[] = plans;
    _plans.forEach((obj) => {
      if (obj.id === selectedPlanId) {
        obj.tasks = obj.tasks.filter((task) => task.id !== taskId);
      }
    });
    setPlans([..._plans]);
  }
  function addPlan(planName: string, planColor: string): void {
    let _plans: plan[] = plans;
    _plans.push({
      name: planName,
      id: uid(),
      color: planColor,
      tasks: [],
    });
    setPlans([..._plans]);
  }
  function toggleTaskCompleted(planId: string, taskId: string): void {
    let _plans: plan[] = plans;
    _plans.forEach((obj) => {
      if (obj.id === planId) {
        obj.tasks.forEach((task, index) => {
          if (task.id === taskId) {
            obj.tasks[index].completed = !obj.tasks[index].completed;
          }
        });
      }
    });
    setPlans([..._plans]);
  }
  function changePlanColor(planId: string, planNewColor: string): void {
    let _plans: plan[] = plans;
    _plans.forEach((obj) => {
      if (obj.id === planId) {
        obj.color = planNewColor;
      }
    });
    setPlans([..._plans]);
  }
  function changePlanName(planId: string, planNewName: string): void {
    let _plans: plan[] = plans;
    _plans.forEach((obj) => {
      if (obj.id === planId) {
        obj.name = planNewName;
      }
    });
    setPlans([..._plans]);
  }

  return (
    <GlobalContext.Provider
      value={{
        plans,
        setPlans,
        selectedPlan,
        setSelectedPlan,
        addTaskToAPlan,
        toggleTaskCompleted,
        addPlan,
        changePlanColor,
        changePlanName,
        deleteTaskFromAPlan,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
