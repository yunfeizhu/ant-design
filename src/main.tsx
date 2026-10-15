import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Input } from 'antd';

const BUILD_LABEL = '复现（npm antd 6.6.6）';

const params = new URLSearchParams(location.search);
const length = Number(params.get('length') || 6);
const initial = params.get('initial') || '';
const digits = (value: string) => value.replace(/\D/g, '');

function App() {
  const [generation, setGeneration] = useState(0);
  const [changes, setChanges] = useState<string[]>([]);
  const [inputs, setInputs] = useState<string[][]>([]);
  const [value, setValue] = useState(initial);
  return (
    <ConfigProvider direction={params.has('rtl') ? 'rtl' : 'ltr'}>
      <main>
        <h1>Input.OTP 粘贴验证</h1>
        <p>{BUILD_LABEL}</p>
        <section>
          <h2>{params.get('title') || '含分隔符的验证码'}</h2>
          <p>粘贴内容：<code>{params.get('text') || '123 456'}</code></p>
          <p>预期：保留有效字符，最终不超过 {length} 位。</p>
          <div id="otp">
            <Input.OTP key={generation} length={length} defaultValue={initial}
              {...(params.has('controlled') ? { value } : {})}
              formatter={params.has('unformatted') ? undefined : digits}
              mask={params.has('mask')}
              onInput={(cells) => {
                setInputs((prev) => [...prev, cells]);
                if (params.has('controlled')) setValue(cells.join(''));
              }}
              onChange={(next) => setChanges((prev) => [...prev, next])} />
          </div>
          <p>onInput: <output id="inputs">{JSON.stringify(inputs)}</output></p>
          <p>onChange: <output id="changes">{JSON.stringify(changes)}</output></p>
          <button type="button" id="reset" onClick={() => {
            setGeneration((n) => n + 1); setChanges([]); setInputs([]); setValue(initial);
          }}>重置</button>
        </section>
      </main>
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
