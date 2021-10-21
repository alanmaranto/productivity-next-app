import {
  FullHeightContent,
  Button,
  Avatar,
  Heading,
  Spacer,
  AddButton,
} from "@alanmaranto/components";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { createTask, getAll, deleteTask } from "./api/tasks/tasks";

export async function getStaticProps() {
  const tasks = await getAll();
  return { props: { tasks } };
}

const Planning = ({ tasks }) => {
  const queryClient = useQueryClient();

  // client side rendering
  // const { isLoading, error, data } = useQuery("tasks", getAll);

  // server side rendering
  const { isLoading, error, data } = useQuery("tasks", getAll, {
    initialData: tasks,
  });

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
          <AddButton onAdd={handleOnClick}>
            Toca para agregar la tarea
          </AddButton>
          {isLoading && <div>Loading</div>}
          {error && <div>Error {error.message}</div>}
          {data &&
            data.map((task) => (
              <div key={task.id} style={{ display: "flex" }}>
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

export default Planning;
