import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Table, Typography } from 'antd';

const columns = [{ title: 'Name', dataIndex: 'name' }];
const treeData = [{
  key: 'parent', name: 'Parent', children: [
    { key: 'child-a', name: 'Child A (initially selected)' },
    { key: 'child-b', name: 'Child B (initially unselected)' },
  ],
}];
const pageData = [
  { key: 'normal', name: 'Normal row (page 1)' },
  { key: 'disabled', name: 'Disabled row (page 2, initially selected)', disabled: true },
];

function App() {
  const [treeKeys, setTreeKeys] = useState(['child-a']);
  const [pageKeys, setPageKeys] = useState(['normal', 'disabled']);
  const [current, setCurrent] = useState(1);
  return <main style={{ maxWidth: 920, margin: '24px auto', padding: '0 16px' }}>
    <Typography.Title level={2}>Table selection menu reproduction</Typography.Title>
    <Typography.Paragraph id="build-label">
      {typeof BUILD_LABEL === 'undefined' ? 'Published antd 6.6.6' : BUILD_LABEL}
    </Typography.Paragraph>
    <section id="tree">
      <Typography.Title level={3}>1. Invert current page: tree descendants</Typography.Title>
      <Typography.Paragraph>
        Open the header selection menu and choose “Invert current page”.
        Expected: Parent and Child B selected; Child A unselected.
      </Typography.Paragraph>
      <Button onClick={() => setTreeKeys(['child-a'])}>Reset tree selection</Button>
      <Table columns={columns} dataSource={treeData} pagination={false}
        expandable={{ defaultExpandAllRows: true }}
        rowSelection={{ selectedRowKeys: treeKeys, onChange: setTreeKeys,
          selections: [Table.SELECTION_INVERT] }} />
      <Typography.Paragraph>Selected keys: <code id="tree-keys">{JSON.stringify(treeKeys)}</code></Typography.Paragraph>
    </section>
    <section id="pages">
      <Typography.Title level={3}>2. Clear all data: disabled rows on another page</Typography.Title>
      <Typography.Paragraph>
        On page 1 choose “Clear all data”, then inspect page 2. Reset and repeat from page 2.
        The disabled row should remain selected in both cases.
      </Typography.Paragraph>
      <Button onClick={() => { setPageKeys(['normal', 'disabled']); setCurrent(1); }}>Reset paged selection</Button>
      <Table columns={columns} dataSource={pageData}
        pagination={{ pageSize: 1, current, onChange: setCurrent }}
        rowSelection={{ selectedRowKeys: pageKeys, onChange: setPageKeys,
          getCheckboxProps: (record) => ({ disabled: record.disabled }),
          selections: [Table.SELECTION_NONE] }} />
      <Typography.Paragraph>Selected keys: <code id="page-keys">{JSON.stringify(pageKeys)}</code></Typography.Paragraph>
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
