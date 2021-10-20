import {
  FullHeightContent,
  Button,
  Avatar,
  Heading,
  Spacer,
} from "@alanmaranto/components";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { createTask, getAll, deleteTask } from "./api/tasks/tasks";

const Start = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery("tasks", getAll);

  const addTaskMutation = useMutation(createTask, {
    onSuccess: () => {
      // Query Invalidations
      queryClient.invalidateQueries("tasks");
    },
  });

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      // Query Invalidations
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleOnClick = () => {
    addTaskMutation.mutate({
      title: "New Task",
      author: "Alan",
    });
  };

  const handleRemove = (id) => {
    deleteTaskMutation.mutate(id);
  };

  // if (isLoading) return "Loading";
  // if (error) return error.message;

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
          {isLoading && <div>Loading</div>}
          {error && <div>Error {error.message}</div>}

          <button onClick={handleOnClick}>Toca para agregar la tarea</button>
          {data &&
            data.map((task) => (
              <div key={task.id}>
                <Heading>{task.id}</Heading>
                <Heading>{task.title}</Heading>
                <button onClick={() => handleRemove(task.id)}>x</button>
              </div>
            ))}
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
