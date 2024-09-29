import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthenticationProvider from './Store/Context/Authentication.jsx'
import { LayoutDirectionProvider } from "./Store/Context/LayoutDirectionContext";
import BackDropProvider from './Store/Context/BackDrop.jsx'
import global_en from "../src/Translations/EN/global.json"
import global_ar from "../src/Translations/AR/global.json"
import i18next from "i18next";
import { initReactI18next, I18nextProvider  } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async'

const isRTL = JSON.parse(localStorage.getItem('isRTL')) || false;

const defaultLanguage = isRTL ? 'ar' : 'en';

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: defaultLanguage,
  resources: {
    en: {
      global: global_en,
    },
    ar: {
      global: global_ar,
    },
  },
  fallbackLng: "ar",
  debug: false,
});

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider context={helmetContext}>
    <AuthenticationProvider>
      <BackDropProvider>
        <BrowserRouter>
          <LayoutDirectionProvider>
            <I18nextProvider i18={i18next}>
              <App />
            </I18nextProvider>
          </LayoutDirectionProvider>
        </BrowserRouter>
      </BackDropProvider>
    </AuthenticationProvider>
  </HelmetProvider>,
)
