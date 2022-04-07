import styles from './Plan.module.css';
import { plan } from '../../modules/types';
import { GlobalContext } from 'renderer/contexts/GlobalContext';
import { useContext } from 'react';
// --------------------------------------------------------------
// --TYPES-------------------------------------------------------
// --------------------------------------------------------------
type ColorProps = {
  selectedPlan: plan;
  color: string;
};
export default function Color({ selectedPlan, color }: ColorProps) {
  const _GlobalContext = useContext(GlobalContext);
  const { changePlanColor } = _GlobalContext!;
  return (
    <div
      className={
        color === selectedPlan.color
          ? `${styles.color} ${styles.selected}`
          : `${styles.color}`
      }
      style={{ backgroundColor: color }}
      onClick={() => changePlanColor(selectedPlan.id, color)}
    ></div>
  );
}
