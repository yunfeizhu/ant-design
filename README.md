# DirectoryTree Shift selection reproduction

Minimal reproduction using published `antd@6.6.7` and React `19.2.5`.
The action buttons use Ant Design. The reproduction intentionally preserves the bug.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` builds a standalone production bundle.

## Reproduce

1. Click **B**.
2. Click **删除 B 并清空选择** (Remove B and clear selection).
3. Hold **Shift** and click **C**.
4. The callback keys are `["b","c","d"]`, including the removed B, while `selectedNodes` contains C and D.
5. Expected: only C is selected, and both callback arrays contain only `"c"`.

Also click **重置示例** (Reset), then hold Shift and click C as the first selection.
The published version reports empty selection; it should select C and establish a new range anchor.

## Screenshots

The before/after screenshots show the same steps above at 1100 px and 390 px.
Before uses the published package; after uses the proposed DirectoryTree source change
at [d4a4819](https://github.com/yunfeizhu/ant-design/commit/d4a48195abd5265f2fe4ff36bb651efe20120901), with the same pinned runtime.
Screenshots of the proposed fix do not indicate that a release already contains it.
