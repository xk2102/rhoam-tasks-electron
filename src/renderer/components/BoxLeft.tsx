import styles from './BoxLeft.module.css';
import { plan } from '../modules/types';
import { useContext } from 'react';
import { GlobalContext } from 'renderer/contexts/GlobalContext';
import AddPlan from './BoxLeft/AddPlan';
import { emptyPlan } from 'renderer/modules/emptyPlan';
import LoadSave from './BoxLeft/LoadSave';

function BoxLeft() {
  // --------------------------------------------------------------
  // --STATE-------------------------------------------------------
  // --------------------------------------------------------------
  const _GlobalContext = useContext(GlobalContext);
  const { selectedPlan, setSelectedPlan, plans } = _GlobalContext!;
  // --------------------------------------------------------------
  // --HANDLERS----------------------------------------------------
  // --------------------------------------------------------------
  function onClick_handleSelectedList(plan: plan) {
    if (selectedPlan === plan) {
      setSelectedPlan(emptyPlan);
    } else {
      setSelectedPlan(plan);
    }
  }
  // --------------------------------------------------------------
  // --RETURN------------------------------------------------------
  // --------------------------------------------------------------
  return (
    <div className={styles.BoxLeft}>
      <div className={styles.top}>
        <div className={styles.category}>
          <div className={styles.image}>🌎</div>
          <div className={styles.label}>LOCAL</div>
        </div>
        {plans.map((plan, index) => (
          <div
            className={styles.plan}
            key={index}
            onClick={() => onClick_handleSelectedList(plan)}
          >
            <div className={styles.image}>
              <div
                className={styles.color}
                style={{ backgroundColor: plan.color }}
              ></div>
            </div>
            <div className={styles.label}>{plan?.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <AddPlan />
        <LoadSave />
      </div>
    </div>
  );
}
export default BoxLeft;
