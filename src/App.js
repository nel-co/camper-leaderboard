import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

let url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      allTime: false
    }
  }
  componentDidMount() {
    axios.get(url)
      .then(response => {
        this.setState({
          users: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  sortByAlltime = () => {
    url = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    axios.get(url)
      .then(response => {
        this.setState({
          users: response.data,
          allTime: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  sortRecent = () => {
    url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    axios.get(url)
      .then(response => {
        this.setState({
          users: response.data,
          allTime: false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    const table = this.state.users.map((c,index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td><a href={`https://www.freecodecamp.com/${c.username}`} target="_blank">{ c.username}</a></td>
          <td>{ c.recent }</td>
					<td>{ c.alltime }</td>
        </tr>
      )
    });
    return (
      <table cellSpacing="0">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Camper Name</th>
					<th id="recent" className={!this.state.allTime ? 'sort green' : 'sort'} onClick={this.sortRecent}>Points in past 30 days</th>
					<th id="alltime" className={this.state.allTime ? 'sort green' : 'sort'} onClick={this.sortByAlltime}>Points Alltime</th>
				</tr>
			</thead>
	    <tbody>{table}</tbody>

		</table>
    )
  }
}
export default App;
