import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IPerson{
  name: string;
}

interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  done?: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo';

  public people: IPerson[];
  public todos: ITodoItem[];
  public filter: boolean = true;
  public name: string = "";
  public addItem: ITodoItem;
  public changeItem: ITodoItem;
  public idDelete: number;


  constructor(private httpClient: HttpClient) { 
  }

  async getAllToDos() {
    this.todos = await this.httpClient.get<ITodoItem[]>('http://localhost:8080/api/todos').toPromise();
  }

  public getUndoneToDos() {
    if(this.filter){
      this.filter = false;
    }else{
      this.filter = true;
    }
  }

  public assignedPerson(value:string){
    this.name = value;
  }

  async getPerson(){
    this.people = await this.httpClient.get<IPerson[]>('http://localhost:8080/api/people').toPromise();;
  }

  public addTodoAssignedTo(value:string){
    this.addItem.assignedTo = value;
  }

  public addTodoDesc(value:string){
    this.addItem.description = value;
  }

  async addTodo() {
    await this.httpClient.patch(`http://localhost:8080/api/todos/}`,

      {
        "description": this.addItem.description,
        "assignedTo": this.addItem.assignedTo,

      }).toPromise();
  }

  public editCreateId(value:number){
    this.changeItem.id = value;
  }

  public editCreateAssignee(value:string){
    this.changeItem.assignedTo = value;
  }

  public editCreateDesc(value:string){
    this.changeItem.description = value;
  }

  public editCreateDone(value:boolean){
    this.changeItem.done = value;
  }

  //edit an existing todo
  async editTodo() {
    await this.httpClient.patch(`http://localhost:8080/api/todos/${this.changeItem.id}`,

      {
        "description": this.changeItem.description,
        "assignedTo": this.changeItem.assignedTo,
        "done": this.changeItem.done

      }).toPromise();
  }

  async deleteTodo() {
    this.todos = this.todos.filter(todo => 
            todo.id !== this.idDelete);
    console.log(this.idDelete);
    await this.httpClient.delete<ITodoItem>(`http://localhost:8080/api/todos/${this.idDelete}`).toPromise();
  }

  public changeDelete(value:number){
    this.idDelete = value;
  }
  /*
  publc add(value:string){
    this.todos.push();
  }*/
}

