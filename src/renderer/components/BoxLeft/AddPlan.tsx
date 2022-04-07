import { useState, useContext } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import styles from './AddPlan.module.css';
import { GlobalContext } from 'renderer/contexts/GlobalContext';

export default function AddPlan() {
  // ---------------------------------------------
  // --CONTEXT------------------------------------
  // ---------------------------------------------
  const _GlobalContext = useContext(GlobalContext);
  const { addPlan } = _GlobalContext!;
  // ---------------------------------------------
  // --STATE--------------------------------------
  // ---------------------------------------------
  const [addPlanExpand, setAddPlanExpand] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('#3689e6');
  const [planName, setPlanName] = useState<string>('');
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
  // ---------------------------------------------
  // --FUNCTIONS----------------------------------
  // ---------------------------------------------
  function onClick_handleReset(): void {
    setSelectedColor('#3689e6');
    setPlanName('');
  }
  function onClick_handleAdd(_planName: string, _selectedColor: string): void {
    addPlan(_planName, _selectedColor);
    onClick_handleReset();
  }
  return (
    <div className={styles.addPlan}>
      <div
        className={styles.header}
        onClick={() => setAddPlanExpand(!addPlanExpand)}
      >
        <div className={styles.image}>
          <BsPlusLg />
        </div>
        <div className={styles.label}>Add Plan</div>
        <div className={styles.image}>
          {addPlanExpand ? <MdExpandMore /> : <MdExpandLess />}
        </div>
      </div>
      {addPlanExpand && (
        <div className={`animate ${styles.content}`}>
          <div className={styles.colors}>
            {COLORS.map((color, index) => (
              <div
                key={index}
                className={
                  color === selectedColor
                    ? `${styles.color} ${styles.selected}`
                    : `${styles.color}`
                }
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
          {/* <form> */}
          <input
            placeholder="Plan name..."
            value={planName}
            onChange={(event) => setPlanName(event.target.value)}
          ></input>
          {/* </form> */}
          <div className={styles.actions}>
            <button onClick={() => onClick_handleReset()}>RESET</button>
            <button
              onClick={() =>
                planName !== '' && onClick_handleAdd(planName, selectedColor)
              }
            >
              ADD
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
