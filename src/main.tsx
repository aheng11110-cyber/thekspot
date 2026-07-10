import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { PAYPAL_CONFIG } from './lib/paypal'
import App from './App.tsx'
import './index.css'

const PayPalWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useLanguage();
  
  const localeMap: Record<string, string> = {
    EN: 'en_US',
    KO: 'ko_KR',
    JP: 'ja_JP',
    CN: 'zh_CN',
    VN: 'vi_VN'
  };

  const paypalOptions = {
    clientId: PAYPAL_CONFIG.clientId,
    currency: PAYPAL_CONFIG.currency,
    intent: PAYPAL_CONFIG.intent,
    locale: localeMap[lang] || 'en_US',
  };

  // key={lang} ensures the script reloads when language changes
  return (
    <PayPalScriptProvider options={paypalOptions} key={lang}>
      {children}
    </PayPalScriptProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <PayPalWrapper>
          <App />
        </PayPalWrapper>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)
