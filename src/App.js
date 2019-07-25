import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://jsonplaceholder.typicode.com';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      _page_limit: 5,
      currentPage: 0
    }
  }
  //Chamada da api
  componentDidMount() {
    const url = `${API_URL}/users/?_limit=5&_page=2`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ users: data })
      console.log(this.state.users)
     })
  }

  //Limitador de item por page
  limitPerPage (begin, end, increase) {
    axios(`${API_URL}/users/?_limit=5_start=${begin}&_end=${end}`).then((response) => {
      this.setState ({
        user: response.data,
        currentPage: this.state.currentPage + increase
      });
    });
  }
  
  //Paginação
  _renderLinks() {
    var cp = this.state.currentPage
    if (cp == 0) {
      // show only "Page 1" and "Next"
      return (
        <ul className="card-pagination">
          <li>Page 1</li>
          <li><a onClick={() => this.limitPerPage(10 , 20 , 1)}>Next</a></li>
        </ul>
      )
    } else if (cp < this.state._page_limit - 1) {
      // show "Back", "Page X" and "Next"
      return (
        <ul className="card-pagination">
          <li><a onClick={() => this.limitPerPage((cp-1) * 5, cp * 5) -1}>Back</a> </li>
          <li>Page {(cp + 1)}</li>
          <li><a onClick={() => this.limitPerPage((cp+1) * 5, (cp+2) * 5, 1)}>Next</a> </li>
        </ul>
      )
    } else {
      // show "Back", "Page X" and "Next"
      return (
        <ul className="card-pagination">
          <li><a onClick={() => this.limitPerPage((cp-1) * 5, cp * 5, -1)}>Back</a></li>
          <li>Page {(cp-1)}</li>
        </ul>
      )
    }
  }

//table users
  render() {
   let _page_limit = 5
    return (
       <div className="container">
<table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nome</th>
      <th scope="col">Sobrenome</th>
      <th scope="col">Email</th>
      <th scope="col">Idade</th>
    </tr>
  </thead>
  <tbody>
  {this.state.users.map((user) => (
    <tr>
      <th scope="row">{user.id}</th>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.age}</td>
    </tr>
      ))}
      {this._renderLinks()}
    </tbody>
    </table>
       </div>
    );
  }
}
export default App;
