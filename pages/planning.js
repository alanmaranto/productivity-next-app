import { useState } from "react";
import {
  FullHeightContent,
  Button,
  Avatar,
  Heading,
  Spacer,
} from "@alanmaranto/components";

const Start = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <FullHeightContent
      content={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar src="https://placeimg.com/200/200/people" />
            <Spacer.Vertical size="xs" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Heading size="lg">Hola, Alan</Heading>
              <Heading size="md" color="primary">
                ¿Cómo quieres empezar?
              </Heading>
            </div>
          </div>
          <Heading size="lg">
            Ahora dime, ¿Cuál es la primera tarea en la que trabajarás hoy
          </Heading>
          <button></button>
        </div>
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
