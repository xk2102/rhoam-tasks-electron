import React, { useState, useContext } from 'react';
import { GlobalContext } from 'renderer/contexts/GlobalContext';
import styles from './Plan.module.css';
import { plan } from '../../modules/types';
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdDeleteOutline,
} from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { GoKebabVertical } from 'react-icons/go';
import ConfigBox from './ConfigBox';
// --------------------------------------------------------------
// --TYPES-------------------------------------------------------
// --------------------------------------------------------------
type PlanProps = {
  selectedPlan: plan;
};

// --------------------------------------------------------------
// --RFC---------------------------------------------------------
// --------------------------------------------------------------

function Plan({ selectedPlan }: PlanProps) {
  // --------------------------------------------------------------
  // --STATE-------------------------------------------------------
  // --------------------------------------------------------------
  const _GlobalContext = useContext(GlobalContext);
  const { addTaskToAPlan, toggleTaskCompleted, deleteTaskFromAPlan } =
    _GlobalContext!;
  const [input, setInput] = useState<string>('');
  const [showConfigBox, setShowConfigBox] = useState<boolean>(false);
  // --------------------------------------------------------------
  // --HANDLERS----------------------------------------------------
  // --------------------------------------------------------------
  function onChange_handleInput(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setInput(event.target.value);
  }
  function onClick_handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedPlanId: string,
    taskDescription: string
  ): void {
    event.preventDefault();
    if (input !== '') {
      addTaskToAPlan(selectedPlanId, taskDescription);
      setInput('');
    }
  }
  return (
    <div className={styles.plan}>
      {/* HEADER */}
      <div className={styles.planHeader}>
        <div className={styles.image}>
          <div
            className={styles.color}
            style={{ backgroundColor: selectedPlan.color }}
          ></div>
        </div>
        <div className={styles.label}>{selectedPlan.name}</div>
        <div className={styles.config}>
          <div
            className={
              showConfigBox
                ? `${styles.reactIconContainer} ${styles.selected}`
                : `${styles.reactIconContainer}`
            }
            onClick={() => setShowConfigBox(!showConfigBox)}
          >
            <GoKebabVertical />
          </div>
          {showConfigBox && <ConfigBox selectedPlan={selectedPlan} />}
        </div>
      </div>
      {/* CONTENT */}
      <div className={styles.planContent}>
        {selectedPlan.tasks.map((task, index) => (
          <div className={styles.task} key={index}>
            <div
              className={styles.image}
              onClick={() => toggleTaskCompleted(selectedPlan.id, task.id)}
            >
              {task.completed ? (
                <MdOutlineCheckBox size={25} />
              ) : (
                <MdOutlineCheckBoxOutlineBlank size={25} />
              )}
            </div>
            {task.completed ? (
              <>
                <div
                  className={styles.description}
                  style={{ textDecoration: '2px line-through #f5f5f5' }}
                >
                  {task.description}
                </div>
              </>
            ) : (
              <div className={`${styles.description}`}>{task.description}</div>
            )}
            <div className={styles.delete}>
              {task.completed && (
                <MdDeleteOutline
                  onClick={() => deleteTaskFromAPlan(selectedPlan.id, task.id)}
                  className="animate"
                  size={20}
                  style={{ color: '#ff4d4d', cursor: 'pointer' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* FOOTER */}
      <form className={styles.planFooter}>
        <div className={styles.image}>
          <button
            type="submit"
            onClick={(event) =>
              onClick_handleSubmit(event, selectedPlan.id, input)
            }
          >
            <BsPlusLg />
          </button>
        </div>
        <div className={styles.input}>
          <input
            value={input}
            onChange={(event) => onChange_handleInput(event)}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default Plan;
