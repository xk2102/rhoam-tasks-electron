import styles from './BoxRight.module.css';
import Plan from './BoxRight/Plan';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { emptyPlan } from 'renderer/modules/emptyPlan';
// --------------------------------------------------------------
// --TYPES-------------------------------------------------------
// --------------------------------------------------------------
function BoxRight() {
  // --------------------------------------------------------------
  // --STATE-------------------------------------------------------
  // --------------------------------------------------------------
  const _GlobalContext = useContext(GlobalContext);
  const { selectedPlan } = _GlobalContext!;
  // --------------------------------------------------------------
  // --HANDLERS----------------------------------------------------
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // --RENDERS-----------------------------------------------------
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // --RETURN------------------------------------------------------
  // --------------------------------------------------------------
  if (selectedPlan === emptyPlan) {
    return (
      <div className={styles.BoxRightEmpty}>
        <h1>RHOAM TASKS</h1>
        <span>Select a plan..!</span>
      </div>
    );
  } else {
    return (
      <div className={styles.BoxRight}>
        <Plan selectedPlan={selectedPlan} />
      </div>
    );
  }
}
export default BoxRight;
