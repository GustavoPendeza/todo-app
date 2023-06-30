import React, { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  menuActive: string;
  todo: Todo;
  reload: boolean;
  setReload: (value: boolean) => void;
  deleteTodo: (id: string) => void;
}

export default function Todo({ menuActive, todo, reload, setReload, deleteTodo }: Props) {
  const [teste, setTeste] = useState<boolean>(todo.checked);

  function handleCheckbox(event: any) {
    setTeste(event.target.checked);
    todo.checked = event.target.checked;
    
    setReload(!reload);
  }

  useEffect(() => {}, [teste, todo.checked]);

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todo}>
        <input
          type="checkbox"
          name="checkbox"
          id={todo.id}
          className={styles.checkbox}
          onChange={handleCheckbox}
          checked={todo.checked}
        />

        <label htmlFor={todo.id} className={styles.label}>
          {todo.text}
        </label>
      </div>

      {menuActive === "completed" ? (
        <MdDeleteOutline className={styles.deleteIcon} onClick={() => deleteTodo(todo.id)} />
      ) : null}
    </div>
  );
}
