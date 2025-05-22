import React, { useState } from "react";
const treeData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      {
        id: 2,
        label: "Citrus",
        children: [
          { id: 3, label: "Orange" },
          { id: 4, label: "Lemon" },
        ],
      },
      {
        id: 5,
        label: "Berries",
        children: [
          { id: 6, label: "Blueberry" },
          { id: 7, label: "Strawberry" },
        ],
      },
    ],
  },
  {
    id: 8,
    label: "Apple",
  },
];

const Checkboxes = ({ data, checked, setChecked }) => {
  const handlerchange = (isChecked, node) => {
    setChecked((pre) => {
      let newState = { ...pre, [node.id]: isChecked };
      const updateNestedChildre = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateNestedChildre(child);
        });
      };
      updateNestedChildre(node);

      const verfiyedCheckbox = (node) => {
        if (!node.children) return newState[node.id] || false;
        let AllChecked = node.children.every((child) =>
          verfiyedCheckbox(child)
        );
        newState[node.id] = AllChecked;
        return AllChecked
      };
      treeData.forEach((node) => {
        verfiyedCheckbox(node);
      });
      return newState;
    });
  };
  return (
    <div>
      {data.map((node) => (
        <div style={{ marginLeft: 20 }} key={node.id}>
          <input
            type="checkbox"
            checked={checked[node.id] || false}
            onChange={(e) => handlerchange(e.target.checked, node)}
          />
          <span>{node.label}</span>
          {node.children && (
            <Checkboxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const NestedCheckbox = () => {
  const [checked, setChecked] = useState({});
  return (
    <div>
      <Checkboxes data={treeData} checked={checked} setChecked={setChecked} />
    </div>
  );
};

export default NestedCheckbox;
