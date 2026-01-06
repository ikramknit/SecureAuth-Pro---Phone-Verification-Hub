
import React, { useEffect, useRef } from 'react';

interface PhoneWidgetProps {
  clientId: string;
  onSuccess: (url: string) => void;
}

export const PhoneWidget: React.FC<PhoneWidgetProps> = ({ clientId, onSuccess }) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define the global listener
    window.phoneEmailListener = (userObj) => {
      onSuccess(userObj.user_json_url);
    };

    // Load the script
    const script = document.createElement('script');
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      delete window.phoneEmailListener;
      const existingScript = document.querySelector('script[src="https://www.phone.email/sign_in_button_v1.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [onSuccess]);

  return (
    <div className="flex flex-col items-center justify-center p-8 glass rounded-2xl shadow-2xl space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white">Secure Phone Verification</h3>
        <p className="text-slate-400 text-sm">Verify your identity instantly using Phone.email</p>
      </div>
      
      {/* The actual button container from user code */}
      <div 
        ref={widgetRef}
        className="pe_signin_button" 
        data-client-id={clientId}
      ></div>

      <div className="mt-6 flex items-center space-x-2 text-xs text-slate-500">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m14.562 10.84A11.954 11.954 0 0112 21.232a11.954 11.954 0 01-8.944-7.352" />
        </svg>
        <span>End-to-End Encrypted Verification</span>
      </div>
    </div>
  );
};
