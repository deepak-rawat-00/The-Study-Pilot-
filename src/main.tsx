import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { StudyProvider } from './context/StudyContext';
import { TimerProvider } from './context/TimerContext';
import { ExamProvider } from './context/ExamContext';
import { RouterProvider } from './context/RouterContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <StudyProvider>
          <ExamProvider>
            <TimerProvider>
              <App />
            </TimerProvider>
          </ExamProvider>
        </StudyProvider>
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
