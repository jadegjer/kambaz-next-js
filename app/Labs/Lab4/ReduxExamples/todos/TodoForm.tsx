import { Button, FormControl, ListGroupItem } from "react-bootstrap";

export default function TodoForm({ todo, setTodo, addTodo, updateTodo }: {
    todo: { id: string; title: string };
    setTodo: (todo: { id: string; title: string }) => void;
    addTodo: (todo: { id: string; title: string }) => void;
    updateTodo: (todo: { id: string; title: string }) => void;
  }) {
    return (
      <ListGroupItem>
        <Button onClick={() => addTodo(todo)}
                id="wd-add-todo-click"> Add </Button>
        <Button onClick={() => updateTodo(todo)}
                id="wd-update-todo-click"> Update </Button>
        <FormControl value={todo.title}
          onChange={ (e) => setTodo({ ...todo, title: e.target.value }) }/>
      </ListGroupItem>
  );}
  