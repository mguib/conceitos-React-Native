import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    //TODO - add new task

    setTasks(oldTasks => [...oldTasks ,newTask])
  }

  function handleToggleTaskDone(id: number) {
    //Criando modificação na task selecionada
    const updatedTasks = tasks.map(task => ({ ...task }))

    //Buscando task na lista de tasks nova
    const searchItem = updatedTasks.find(item => item.id === id);
    if(!searchItem){
      return
    }
    //Modificando propriedade
    searchItem.done = !searchItem.done;
    //Atualizando estado
    setTasks(updatedTasks);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id != id
    ))
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})