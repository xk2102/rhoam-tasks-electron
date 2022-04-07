import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useState, useContext } from 'react';
import { RiSaveLine } from 'react-icons/ri';
import { electron } from 'process';
import styles from './LoadSave.module.css';
import { GlobalContext } from 'renderer/contexts/GlobalContext';

export default function LoadSave() {
  // ---------------------------------------------
  // --STATE--------------------------------------
  // ---------------------------------------------
  const [expand, setExpand] = useState(false);
  const { plans, setPlans } = useContext(GlobalContext);

  function handleWriteToFile() {
    const fileInfo = {
      fileName: 'rhoamtasks.txt',
      fileData: JSON.stringify(plans),
    };
    window.electron.writeToFile.writeToFile(
      'App.js REQUESTED write to file.',
      fileInfo
    );
  }
  function handleReadFromFile() {
    const fileInfo = { fileName: 'rhoamtasks.txt' };
    window.electron.readFromFile.readFromFile(
      'App.js REQUESTED read from file.',
      fileInfo
    );
  }
  window.electron.writeToFile.on('writeToFileChannel', (arg) => {
    console.log(`App.js RECEIVED arg: ${arg}`);
    console.log(arg);
  });
  window.electron.readFromFile.on('readFromFileChannel', (arg, data) => {
    console.log(`App.js RECEIVED arg: ${arg}`);
    console.log(arg);
    console.log(data);

    setPlans(JSON.parse(data));
  });

  return (
    <div className={styles.loadSave}>
      <div className={styles.header} onClick={() => setExpand(!expand)}>
        <div className={styles.image}>
          <RiSaveLine />
        </div>
        <div className={styles.label}>Load/Save</div>
        <div className={styles.image}>
          {expand ? <MdExpandMore /> : <MdExpandLess />}
        </div>
      </div>
      {expand && (
        <div className={`animate ${styles.content}`}>
          <div className={styles.actions}>
            <button onClick={() => handleReadFromFile()}>LOAD</button>
            <button onClick={() => handleWriteToFile()}>SAVE</button>
          </div>
        </div>
      )}
    </div>
  );
}
