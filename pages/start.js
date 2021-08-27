import { FullHeightContent, Button } from "@alanmaranto/components";

const Start = () => {
  return (
    <FullHeightContent
      content={
        <div style={{ height: 200, background: "tomato", width: "100%" }}></div>
      }
      footer={
        <div>
          <p>Basados en la matriz de Eisenhower priorizamos tus tareas</p>
          <Button type="primary">Empieza ahora</Button>
        </div>
      }
    ></FullHeightContent>
  );
};

export default Start;
