'use client'

import { useRef, useState } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export const OTPInput = ({ length = 4, onComplete }: OTPInputProps) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const processInput = (e: React.ChangeEvent<HTMLInputElement>, slot: number) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);

    if (slot !== length - 1 && num) {
      inputs.current[slot + 1]?.focus();
    }

    if (newCode.every(num => num !== '')) {
      onComplete?.(newCode.join(''));
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.key === 'Backspace' && !code[slot] && slot !== 0) {
      inputs.current[slot - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-4">
      {code.map((num, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={num}
          autoFocus={!idx}
          onChange={e => processInput(e, idx)}
          onKeyUp={e => onKeyUp(e, idx)}
          ref={ref => { inputs.current[idx] = ref }}
          className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg 
                     focus:border-emerald-500 focus:outline-none transition-colors
                     bg-white border-gray-200"
        />
      ))}
    </div>
  );
}; 