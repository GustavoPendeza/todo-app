"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Todo from "@/components/Todo";
import { MdDeleteOutline } from "react-icons/md";

export default function Home() {
  const [menuActive, setMenuActive] = useState<"all" | "active" | "completed">(
    "all"
  );
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  function handleChange(event: any) {
    setTodo(event.target.value);
  }

  function addTodo(event: any) {
    event.preventDefault();

    var item = {
      id: Math.random().toString() + todo,
      text: todo,
      checked: false,
    };

    setTodoList((prev) => {
      return [...prev, item];
    });

    setTodo("");
  }

  function deleteTodo(id: string) {
    const remainingItems = todoList.filter((item) => {
      return item.id !== id;
    });

    setTodoList(remainingItems);
  }

  function deleteCompleted() {
    const remainingItems = todoList.filter((item) => {
      return item.checked !== true;
    });

    setTodoList(remainingItems);
    setMenuActive("all");
  }

  useEffect(() => {}, [reload]);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>#todo</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.menu}>
          <div
            className={styles.menuOption}
            onClick={() => setMenuActive("all")}
          >
            <span>All</span>
            <div
              className={
                menuActive === "all" ? styles.underlineActive : styles.underline
              }
            ></div>
          </div>

          <div
            className={styles.menuOption}
            onClick={() => setMenuActive("active")}
          >
            <span>Active</span>
            <div
              className={
                menuActive === "active"
                  ? styles.underlineActive
                  : styles.underline
              }
            ></div>
          </div>

          <div
            className={styles.menuOption}
            onClick={() => setMenuActive("completed")}
          >
            <span>Completed</span>
            <div
              className={
                menuActive === "completed"
                  ? styles.underlineActive
                  : styles.underline
              }
            ></div>
          </div>
        </div>
        <hr className={styles.hr} />

        {/* INPUT CONTAINER */}
        {menuActive !== "completed" ? (
          <form onSubmit={addTodo}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="todo"
                placeholder="add details"
                className={styles.input}
                onChange={handleChange}
                value={todo}
              />

              <button
                type="submit"
                className={styles.addButton}
                disabled={todo ? false : true}
              >
                Add
              </button>
            </div>
          </form>
        ) : null}

        {/* TODO LIST */}
        {todoList
          ? todoList.map((item) => {
              if (menuActive === "completed" && !item.checked) {
                return;
              } else if (menuActive === "active" && item.checked) {
                return;
              }

              return (
                <Todo
                  key={item.id}
                  menuActive={menuActive}
                  todo={item}
                  reload={reload}
                  setReload={setReload}
                  deleteTodo={deleteTodo}
                />
              );
            })
          : null}

        {/* DELETE BUTTON */}
        {menuActive === "completed" ? (
          <div className={styles.deleteContainer}>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={deleteCompleted}
            >
              <MdDeleteOutline />

              <span>delete all</span>
            </button>
          </div>
        ) : null}
      </main>
    </>
  );
}
