import { useState, useContext } from 'react';
import { GlobalContext } from 'renderer/contexts/GlobalContext';
import styles from './Plan.module.css';
import { plan } from '../../modules/types';
import Color from './Color';
// --------------------------------------------------------------
// --TYPES-------------------------------------------------------
// --------------------------------------------------------------
type ConfigBoxProps = {
  selectedPlan: plan;
};
export default function ConfigBox({ selectedPlan }: ConfigBoxProps) {
  // --------------------------------------------------------------
  // --STATE-------------------------------------------------------
  // --------------------------------------------------------------
  const _GlobalContext = useContext(GlobalContext);
  const [newPlanName, setNewPlanName] = useState<string>('');
  const COLORS = [
    '#3689e6',
    '#28bca3',
    '#68b723',
    '#f9c440',
    '#ffa154',
    '#ed5353',
    '#de3e80',
    '#a56de2',
    '#8a715e',
    '#667885',
  ];
  // --------------------------------------------------------------
  // --HANDLERS----------------------------------------------------
  // --------------------------------------------------------------
  function onClick_handleChangeName(planId: string, newPlanName: string): void {
    setNewPlanName('');
    _GlobalContext!.changePlanName(planId, newPlanName);
  }
  return (
    <div className={`animate ${styles.configBox}`}>
      <div className={styles.colors}>
        {COLORS.map((color, index) => (
          <Color key={index} selectedPlan={selectedPlan} color={color} />
        ))}
      </div>
      <span id={styles.newPlanName}>New name: </span>
      <input
        placeholder="Plan name.."
        value={newPlanName}
        onChange={(event) => setNewPlanName(event.target.value)}
      ></input>
      <button
        onClick={() =>
          newPlanName !== '' &&
          onClick_handleChangeName(selectedPlan.id, newPlanName)
        }
      >
        CHANGE
      </button>
    </div>
  );
}
