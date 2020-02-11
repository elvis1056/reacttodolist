import React, { Component } from "react";
import Title from "./Title";
import Footer from "./Footer";

class Todolist extends Component {
    constructor() {
        super();
        this.state = {
            newTodo: "",
            todos: [],
            todoId: 1,
            allDone: false,
            todoChange: false
        };
    }

    componentDidMount() {
        const todolist = localStorage.getItem('todolist')
        if (todolist && (todolist !== '[]')) {
            const localtodos = JSON.parse(todolist)
            const lasttodo = JSON.parse(todolist).pop()
            const lastid = lasttodo.id
            this.setState({
                todos: localtodos,
                todoId: lastid
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.todos.length !== prevState.todos.length) {
            window.localStorage.setItem('todolist', JSON.stringify(this.state.todos));
        } else if (this.state.allDone) {
            window.localStorage.setItem('todolist', JSON.stringify(this.state.todos));
            this.setState({
                allDone: false,
            })
        } else if (this.state.todoChange) {
            window.localStorage.setItem('todolist', JSON.stringify(this.state.todos));
            this.setState({
                todoChange: false,
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.newTodo !== "") {
            const addtodo = {
                id: this.state.todoId,
                content: this.state.newTodo,
                done: false
            }
            const newArray = [...this.state.todos, addtodo]
            this.setState({
                newTodo: "",
                todos: newArray,
                todoId: this.state.todoId + 1
            })

        }
    }

    newTodoChanged = (event) => {
        this.setState({
            newTodo: event.target.value
        });
    }

    toggleTodoDone = (id) => {
        const newArray = this.state.todos.map(todo => {
            if (todo.id !== id) {
                return todo
            }
            return {
                ...todo,
                done: !todo.done
            }
        })
        this.setState({
            todos: newArray,
            todoChange: true
        })
    }

    removeTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    allDone = () => {
        const newArray = this.state.todos.map(todo => {
            return {
                ...todo,
                done: true
            };
        });
        this.setState({
            todos: newArray,
            allDone: true
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <Title allDone={this.allDone} />
                <form className="input-group" onSubmit={this.handleSubmit}>
                    <input className="form-control col-sm-9"
                        onChange={this.newTodoChanged}
                        id="newTodo"
                        value={this.state.newTodo}
                        placeholder="輸入待辦事項">
                    </input>
                    <div className="col-sm-1"></div>
                    <button className="btn btn-outline-success col-sm-2" type="submit">submit</button>
                </form>
                <br />
                {/* <button className="btn btn-outline-success col-sm-12" onClick={()=>this.allDone()}>All Done</button> */}
                <ul className="each_todo">
                    {this.state.todos.map((todo) => (
                        <li className="d-flex justify-content-between align-self-center margin-bottom-10" key={todo.id}>
                            <input className="align-self-center" onChange={() => this.toggleTodoDone(todo.id)} type="checkbox" checked={todo.done} />
                            <span className={todo.done ? "done align-self-center" : "align-self-center"}>{todo.content}</span>
                            <button className="btn btn-outline-dark btn_delete" onClick={() => this.removeTodo(todo.id)}>Remove</button>
                        </li>
                    )
                    )}
                </ul>
                <Footer />
            </div>
        );
    }
}

export default Todolist; 