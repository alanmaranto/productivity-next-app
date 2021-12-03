import { useState, useEffect } from "react";
import {
  FullHeightContent,
  Button,
  Avatar,
  Heading,
  Spacer,
  AddButton,
  Paragraph,
  Card,
  Icon,
  Task,
} from "@alanmaranto/components";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { createTask, getAll, deleteTask } from "./api/tasks/tasks";

export async function getStaticProps() {
  const tasks = await getAll();
  return { props: { tasks } };
}

const Planning = ({ tasks }) => {
  const [shouldStart, setShouldStart] = useState(false);
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

  const handleOnClick = (value) => {
    addTaskMutation.mutate({
      title: value,
      author: "Alan",
    });
  };

  const handleRemove = (id) => {
    deleteTaskMutation.mutate(id);
  };

  useEffect(() => {
    if (data?.length > 0) {
      setShouldStart(true);
    } else {
      setShouldStart(false);
    }
  }, [data]);

  const getTaskType = (index) => {
    if (index > 2) {
      return null;
    }
    return index === 0 ? "active" : "standby";
  };

  if (isLoading) return "Loading...";
  if (error) return `An error has ocurred ${error.message}`;

  const [firstTask, secondTask, thirdTask, ...backlogTasks] = data;
  const priorityTasks = [firstTask, secondTask, thirdTask];

  return (
    <>
      <FullHeightContent
        content={
          <>
            <div className="user-header">
              <Avatar src="https://placeimg.com/200/200/people" />
              <Spacer.Vertical size="sm" />
              <div className="text">
                <Heading size="lg">Hola, Alan</Heading>
                <Paragraph size="lg">Conoce la metodología RETO</Paragraph>
              </div>
            </div>
            <Spacer.Horizontal size="lg" />
            <Heading size="lg">
              Ahora dime, ¿Cuál es la primera tarea en la que trabajarás hoy
            </Heading>
            <Spacer.Horizontal size="md" />
            {/* {isLoading && <div>Loading</div>}
          {error && <div>Error {error.message}</div>} */}
            {priorityTasks?.map((task, idx) => (
              <>
                <Task
                  key={task.id}
                  onDelete={() => handleRemove(task.id)}
                  isPending
                  type={getTaskType(idx)}
                >
                  {task.title}
                </Task>
                <Spacer.Horizontal size="xs" />
              </>
            ))}
            <div style={{ height: 5, margin: "10px 0", background: "red" }} />
            {backlogTasks?.map((task, idx) => (
              <>
                <Task
                  key={task.id}
                  onDelete={() => handleRemove(task.id)}
                  isPending
                  type={getTaskType(idx)}
                >
                  {task.title}
                </Task>
                <Spacer.Horizontal size="xs" />
              </>
            ))}
            <Spacer.Horizontal size="md" />
            <AddButton
              onAdd={(value) => handleOnClick(value)}
              focusHelpText="Presiona enter"
              blurHelpText="Click para continuar"
            >
              Toca para agregar la tarea
            </AddButton>
          </>
        }
        footer={
          shouldStart ? (
            <>
              <Spacer.Horizontal size="lg" />
              <Paragraph size="sm">
                Basados en la matriz de Eisenhower priorizamos tus tareas
                evitando listas de pendientes saturadas.
              </Paragraph>
              <Spacer.Horizontal size="sm" />
              <Button type="primary">Empieza ahora</Button>
            </>
          ) : null
        }
      />
    </>
  );
};

export default Planning;
