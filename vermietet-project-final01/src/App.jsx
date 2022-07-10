import logo from "./logo.jpeg";
import { useGetTodos } from "./http";
import { Header, Todo } from "./components";
import "./App.css";
import React, { useEffect } from "react";
var config = require("./config.json");

const getSortingStrategy = ({ sortValue }) => {   //Fucntion to sort the array
  switch (sortValue) {
    case "completed":
      return (todos) => {
        return todos.sort((a, b) => {
          return a.completed ? -1 : 1;
        });
      };
    default:
      return (todos) => {
        return todos
      }
  }
};

export default function App() {
  const { data, error, isLoading, refetch } = useGetTodos(); //save the fetched data on load more
  const [todos, setTodos] = React.useState([]); //Curent todos from api call
  const [totalTodos, setTotalTodos] = React.useState([]); //set the total todos list
  const [sortValue, setSortValue] = React.useState("");  //store the sorting type value

  React.useEffect(() => { //set the total and current data of api
    if (!data) return;
    setTotalTodos([...totalTodos, ...data.results]);
    setTodos(data.results);
    console.log('call', todos)
  }, [data]);

  useEffect(() => {  //Reftach the data on load more
    refetch();
  }, []);

  const sortedTodos = React.useMemo(() => { //built-in hook use to memorize the function and to avoid calling on every render
    return getSortingStrategy({ sortValue })([...totalTodos]);
  }, [totalTodos, sortValue,]);

  if (isLoading) {  //Check If api call in process
    return <div>Loading...</div>;
  }

  if (error) { //Check If error in api call
    return <div>Error</div>;
  }

  return (
    <div className="app">
      <img src={logo} height="100" />
      <Header
        todos={totalTodos}
        data={data}
        config={config}
        sortValue={sortValue}
        onSortChange={setSortValue}
        onToggleAll={(areAllTodosCompleted, event) => {
          setTotalTodos(
            totalTodos.map((todo) => ({
              ...todo,
              completed: event.target.checked,
            }))
          );
        }}
      />

      <div className="grid">
        {sortedTodos.map((todo, idx) => (
          <Todo
            key={todo.id.value + todo.name.title + todo.name.first}
            todo={todo}
            config={config}
            isCompleted={todo.completed}
            onChange={() => {
              setTotalTodos((curr) => {
                return curr.map((item, i) => (i === idx ? { ...item, completed: !item.completed } : item));
              });
            }}
          />
        ))}
      </div>


      <div className="btnDiv">
        <button className="btnLoad" onClick={() => {
          config.results = 10;
          refetch();
        }
        }>Load More</button>
      </div>
    </div>
  );
}
