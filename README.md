### dynamic-list

##### dynamic-list is a web-based list component that implements features similar to React Native's FlatList, allowing you to reorder items via drag and drop.

### Installation

**npm**

```bash
npm install @realzero_cha/dynamic-list --save
```


### Example

```js
import React from "react";
import { DynamicList } from "@realzero_cha/dynamic-list";

export default function DynamicListSample() {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = (item) => (
    <div>
      <p>{item.title}</Text>
    </div>
  );

  return (
    <DynamicList
      items={data}
      getKey={(item) => item.id}
      renderItem={(item) => <Item item={item}
    />
  );
}
```


### Common API
| Name         | Type | Description | Required
| ------------ | ------- | ----------- | --------
| Items | T | An array of items to render | True
| renderItem | (item: T) => React.ReactNode | Takes an item from data and renders it | True
| getKey | boolean | Used to extract a unique key for a given item at the specified index | false
| horizontal | boolean  | horizontally instead of stacked vertically | false
| flexWrap | boolean | Add flex-wrap: wrap to the list. | false
| uniformSize | boolean  | Make list items the same size if their size isn't specified separately. | false
| staticMove | boolean | Static list. The list order doesn't change until the item is dropped. | false
| onDragStart | (list: T[], index: number) => void | Callback event on drag start. | false
| onDragMove | (list: T[], index: number) => void | Callback event while dragging (mouse move). | false
| onDragEnd | (list: T[], index: number) => void | Callback event after drop. | false
| containerStyle | React.CSSProperties | List styles | false
| itemStyle | React.CSSProperties | Render item styles | false
| targetItemStyle | React.CSSProperties | Drag target item styles | false








