import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Switch, Transfer } from 'antd';
import 'antd/dist/reset.css';

const dataSource = [
  { key: 'a', title: 'A' },
  { key: 'b', title: 'B' },
];

function App() {
  const [oneWay, setOneWay] = useState(false);
  const [targetKeys, setTargetKeys] = useState(['b']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectionEvents, setSelectionEvents] = useState(0);

  return (
    <main style={{ padding: 24, maxWidth: 900 }}>
      <h2>Transfer: one-way removal leaves controlled selection behind</h2>
      <ol>
        <li>Check B in the right list.</li>
        <li>Turn on one-way mode below.</li>
        <li>Click the Remove icon next to B.</li>
      </ol>
      <p>Expected: B moves left and is deselected; onSelectChange reports an empty target selection.</p>
      <p>Actual in antd 6.6.5: B moves left but stays checked, and onSelectChange is not called for removal.</p>
      <label>One-way mode: <Switch checked={oneWay} onChange={setOneWay} /></label>
      <p data-testid="target-keys">targetKeys: {JSON.stringify(targetKeys)}</p>
      <p data-testid="selected-keys">selectedKeys: {JSON.stringify(selectedKeys)}</p>
      <p data-testid="selection-events">onSelectChange calls: {selectionEvents}</p>
      <Transfer
        dataSource={dataSource}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        oneWay={oneWay}
        render={(item) => item.title}
        onChange={(nextKeys) => setTargetKeys(nextKeys)}
        onSelectChange={(sourceKeys, targetSelectedKeys) => {
          setSelectedKeys([...sourceKeys, ...targetSelectedKeys]);
          setSelectionEvents((count) => count + 1);
        }}
      />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
