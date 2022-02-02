import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    // buscando uma tastk no todo com mesmo title    
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)
    if (taskWithSameTitle) {
      return Alert.alert(`Task já encontrada`, `Voce não pode cadastrar uma task com o mesmo nome`)
    }


    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    //TODO - add new task

    setTasks(oldTasks => [...oldTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    //Criando modificação na task selecionada
    const updatedTasks = tasks.map(task => ({ ...task }))

    //Buscando task na lista de tasks nova
    const searchItem = updatedTasks.find(item => item.id === id);
    if (!searchItem) {
      return
    }
    //Modificando propriedade
    searchItem.done = !searchItem.done;
    //Atualizando estado
    setTasks(updatedTasks);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que deseja remover esse item?', [
      {
        style:'cancel',
        text:'Não',

      },
      {
        style:'destructive',
        text:'Sim',
        onPress: () => {
          // const updatedTask = tasks.filter(task => task.id !== id);
          // setTasks(updatedTask);
          setTasks(oldState => oldState.filter(
            task => task.id != id
          ))
          //TODO - remove task from state
        }
      }
    ])
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs){
    const updatedTasks = tasks.map(task => ({...task}))

    const searchToBeItem = updatedTasks.find(item => item.id === taskId);
    if(!searchToBeItem)
      return;
    
    searchToBeItem.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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