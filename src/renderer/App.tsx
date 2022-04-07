import styles from './App.module.css';
import './index.css';
import Box from './components/Box';
import { GlobalContextProvider } from './contexts/GlobalContext';

export default function App() {
  return (
    <div className={styles.app}>
      <GlobalContextProvider>
        <Box />
      </GlobalContextProvider>
    </div>
  );
}
