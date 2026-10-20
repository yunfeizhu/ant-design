import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Space, Tree } from 'antd';

const originalNodes = ['a', 'b', 'c', 'd'].map((key) => ({
  key,
  title: key.toUpperCase(),
  isLeaf: true,
}));

function App() {
  const [nodes, setNodes] = React.useState(originalNodes);
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
  const [selectedNodes, setSelectedNodes] = React.useState<React.Key[]>([]);
  const [instance, setInstance] = React.useState(0);

  return (
    <main>
      <h1>DirectoryTree · Shift 多选验证</h1>
      <section id="directory">
        <h2>DirectoryTree：失效的 Shift 多选起点</h2>
        <p>点击 B → 删除 B → 按住 Shift 点击 C。也可以重置后，第一次就 Shift 点击 C。</p>
        <Space wrap style={{ marginBottom: 16 }}>
          <Button
            id="remove-b"
            danger
            disabled={!nodes.some(({ key }) => key === 'b')}
            onClick={() => {
              setNodes((current) => current.filter(({ key }) => key !== 'b'));
              setSelectedKeys([]);
              setSelectedNodes([]);
            }}
          >
            删除 B 并清空选择
          </Button>
          <Button
            id="reset-directory"
            onClick={() => {
              setNodes(originalNodes);
              setSelectedKeys([]);
              setSelectedNodes([]);
              setInstance((current) => current + 1);
            }}
          >
            重置示例
          </Button>
        </Space>
        <Tree.DirectoryTree
          key={instance}
          multiple
          expandAction={false}
          treeData={nodes}
          selectedKeys={selectedKeys}
          onSelect={(keys, info) => {
            setSelectedKeys(keys);
            setSelectedNodes(info.selectedNodes.map(({ key }) => key));
          }}
        />
        <p>onSelect 的 keys：<output id="tree-keys">{JSON.stringify(selectedKeys)}</output></p>
        <p>onSelect 的 selectedNodes：<output id="tree-nodes">{JSON.stringify(selectedNodes)}</output></p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
