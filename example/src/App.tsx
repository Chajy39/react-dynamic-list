import "./App.css";
import { DynamicList } from "../../src/";
import { useState } from "react";

const items = [
  {
    title: "테스트1",
    description: "테스트1입니다.",
  },
  {
    title: "테스트2222",
    description: "테스트22222입니다.",
  },
  {
    title: "테스트333",
    description: "테스트3333입니다.",
  },
  {
    title: "테스트44444444",
    description: "4444444444444444444.",
  },
  {
    title: "테스트555555",
    description: "테스트55입니다.",
  },
];

function App() {
  const [list, setList] = useState(items);

  const ListItem = ({
    item,
  }: {
    item: { title: string; description: string };
  }) => {
    return (
      <div style={{ padding: "10px", borderRadius: "5px", border: "1px" }}>
        <h2>{item.title}</h2>
        <h5>{item.description}</h5>
      </div>
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DynamicList
        items={list}
        renderItem={(item) => <ListItem item={item} />}
        getKey={(item) => item.title}
        horizontal
        uniformSize
        onDragEnd={(item) => setList(item)}
        containerStyle={{ width: "70%", gap: "5vw" }}
      />
    </div>
  );
}

export default App;
