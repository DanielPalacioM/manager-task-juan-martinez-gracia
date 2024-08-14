import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Task {
  title: string;
  description: string;
  Add: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public taskForm: FormGroup;
  public Result: Task[] = [];
  public showTaskList: boolean = false;
  public emptyListMessage: string = 'No hay tareas en la lista';

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Métodos de acceso a los controles del formulario
  get titleControl() {
    return this.taskForm.get('title');
  }

  get descriptionControl() {
    return this.taskForm.get('description');
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        Add: false,
      };
      this.Result.push(newTask);
      this.resetFields();
      this.checkEmptyListMessage(); // Verifica el mensaje después de agregar una tarea
      console.log('Task added:', this.Result); // Mostrar en consola
    }
  }

  resetFields() {
    this.taskForm.reset(); // Restablece el formulario
  }

  finishTasks() {
    this.showTaskList = true; // Mostrar las tareas en la tarjeta
    this.checkEmptyListMessage(); // Verifica el mensaje después de cambiar el estado
  }

  markAsDone(task: Task) {
    task.Add = true;
    console.log('Task marked as Done:', task);
    this.checkEmptyListMessage(); // Verifica el mensaje después de marcar una tarea como completa
  }

  private checkEmptyListMessage() {
    if (this.Result.length === 0) {
      this.emptyListMessage = 'No hay tareas en la lista';
    } else {
      this.emptyListMessage = ''; // Borra el mensaje si hay tareas en la lista
    }
  }
}

