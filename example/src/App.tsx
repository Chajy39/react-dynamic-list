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
  {
    title: "테스트6",
    description: "테스트6입니다.",
  },
  {
    title: "테스트777777",
    description: "테스트777입니다.",
  },
  {
    title: "테스트888",
    description: "테스8888입니다.",
  },
  {
    title: "테스트999999",
    description: "9999999999999999.",
  },
  {
    title: "테스트10100101001010",
    description: "테스트101001010101010010101010100입니다.",
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
    <div style={{ width: "70vw", height: "100vh" }}>
      <DynamicList
        items={list}
        renderItem={(item) => <ListItem item={item} />}
        getKey={(item) => item.title}
        type={"grid"}
        cols={4}
        staticMove
        onDragEnd={(item) => setList(item)}
        containerStyle={{ width: "70%", gap: "3vw" }}
      />
    </div>
  );
}

export default App;
