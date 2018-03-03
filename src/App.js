import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';
import 'font-awesome/css/font-awesome.css';

class App extends Component {

  state = {
    top100Days: [],
    top100AllTime: [],
    current: true
  }

  getFCCData(url, statename){
    axios.get(url)
      .then( ({data}) => {
        this.setState({ [statename]: data})
        console.log(this.state.top100Days)
      });
  }

  pointChange(value) {
    if(this.state.current !==value){
      this.setState({current: value})
    }
  }

  componentDidMount(){
    this.getFCCData('http://fcctop100.herokuapp.com/api/fccusers/top/recent', 'top100Days');
    this.getFCCData('http://fcctop100.herokuapp.com/api/fccusers/top/alltime', 'top100AllTime');
  };

  render() {
    const {top100Days, top100AllTime, current} = this.state;

    return (
      <div className="App container">

      <Table striped bordered condensed hover className='colorBlack'>
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th onClick={(event) => this.pointChange(true)}>Points in 30 Days {current && (<i className='fa fa-caret-down'></i>)}</th>
            <th onClick={(event) => this.pointChange(false)}>All Time Points {current===false && (<i className='fa fa-caret-down'></i>)}</th>
          </tr>
        </thead>

        <tbody>
          {current===true && (top100Days.map((row, index) => (
            <tr key={row.username}>
            <td>{index+1}</td>
            <td>
              <a href={`http://www.freecodecamp.org/${row.username}`}>
              <Image src={row.img} className='imageHeight' circle />{row.username}
              </a>
            </td>
            <td>{row.recent}</td>
            <td>{row.alltime}</td>
            </tr>
          )
          ))};

          {current===false && (top100AllTime.map((row, index) => (
            <tr key={row.username}>
            <td>{index+1}</td>
            <td>
              <a href={`http://www.freecodecamp.org/${row.username}`}>
              <Image src={row.img} className='imageHeight' circle />{row.username}
              </a>
            </td>
            <td>{row.recent}</td>
            <td>{row.alltime}</td>
            </tr>
          )
          ))};

        </tbody>
      </Table>

      </div>
    );
  }
}

export default App;
