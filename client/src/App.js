import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    newuserInput: "",
    editing: null,
    editUserInput: ""
  };

  componentDidMount() {
    this.getAllUsers();
  }

  toggleEditing = id => {
    if (this.state.editing !== id) {
      this.setState({
        editing: id
      });
    } else {
      this.setState({
        editing: null
      });
    }
  };

  getAllUsers = () => {
    axios.get("/users").then(res => {
      console.log(res.data.users);
      this.setState({
        users: res.data.users,
        editing: null
      });
    });
  };

  handleChange = e => {
    this.setState({
      newuserInput: e.target.value
    });
  };

  handleEditChange = e => {
    this.setState({
      editUserInput: e.target.value
    });
  };

  handleClick = id => {
    axios.delete(`/users/${id}`).then(() => {
      this.getAllUsers();
      // let newUsers = this.state.users.filter(user => {
      //   if (id === user.id) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // });
      //
      // this.setState({
      //   users: newUsers
      // });
    });
  };

  handleEditSubmit = (e, id) => {
    e.preventDefault();
    axios
      .patch(`/users/${id}`, { username: this.state.editUserInput })
      .then(() => {
        this.getAllUsers();
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/users", { username: this.state.newuserInput })
      .then(res => {
        // let username = this.state.newuserInput;
        this.setState({
          newuserInput: ""
          // users: [
          //   ...this.state.users,
          //   {
          //     id: this.state.users[this.state.users.length - 1].id + 1,
          //     username: username
          //   }
          // ]
        });
      })
      .then(() => {
        this.getAllUsers();
      });
  };

  render() {
    const { users, newuserInput, editing, editUserInput } = this.state;

    let myUsers = users.map(user => {
      if (user.id === editing) {
        return (
          <li key={user.id}>
            <form
              onSubmit={e => {
                this.handleEditSubmit(e, user.id);
              }}
            >
              <input
                type="text"
                onChange={this.handleEditChange}
                value={editUserInput}
              />
              <button type="submit">Submit Edit</button>
              <button
                onClick={() => {
                  this.toggleEditing(user.id);
                }}
              >
                Cancel
              </button>
            </form>
          </li>
        );
      }
      return (
        <li key={user.id}>
          {user.username}{" "}
          <button
            onClick={() => {
              this.handleClick(user.id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              this.toggleEditing(user.id);
            }}
          >
            Edit
          </button>
        </li>
      );
    });

    return (
      <div className="App">
        <ul>{myUsers}</ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={newuserInput}
          />
          <button type="submit">New User</button>
        </form>
      </div>
    );
  }
}

export default App;
