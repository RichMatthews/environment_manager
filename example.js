import React from 'react';
import ReactDOM from 'react-dom';
var firebase = require('firebase');
import { rootRef, firebase_init } from './firebase_config.js';
require('es6-promise').polyfill();
require('isomorphic-fetch');

var EnvManager = React.createClass({

  getInitialState: function() {
  return {
    envUsersArrayCp1: [],
    envUsersArrayCp2: [],
    envUsersArrayQa1: [],
    envUsersArrayQa2: []
  };
},

  componentDidMount: function(){
    this.retrieveEnvUsersCp1();
    this.retrieveEnvUsersCp2();
    this.retrieveEnvUsersQa1();
    this.retrieveEnvUsersQa2();
  },

  handleClickCp1: function(){
    var cpdev1 = ReactDOM.findDOMNode(this.refs.cpdev1).value;
    var name = ReactDOM.findDOMNode(this.refs.name).value;
    var pairName = ReactDOM.findDOMNode(this.refs.pair).value;
    this.writeData(cpdev1, name, pairName);
    this.retrieveEnvUsersCp1();
  },

  handleClickCp2: function(){
    var cpdev2 = ReactDOM.findDOMNode(this.refs.cpdev2).value;
    var name = ReactDOM.findDOMNode(this.refs.name).value;
    var pairName = ReactDOM.findDOMNode(this.refs.pair).value;
    this.writeData(cpdev2, name, pairName);
    this.retrieveEnvUsersCp2();
  },

  handleClickQa1: function(){
    var cpqa1 = ReactDOM.findDOMNode(this.refs.cpqa1).value;
    var name = ReactDOM.findDOMNode(this.refs.name).value;
    var pairName = ReactDOM.findDOMNode(this.refs.pair).value;
    this.writeData(cpqa1, name, pairName);
    this.retrieveEnvUsersQa1();
  },

  handleClickQa2: function(){
    var cpqa2 = ReactDOM.findDOMNode(this.refs.cpqa2).value;
    var name = ReactDOM.findDOMNode(this.refs.name).value;
    var pairName = ReactDOM.findDOMNode(this.refs.pair).value;
    this.writeData(cpqa2, name, pairName);
    this.retrieveEnvUsersQa2();
  },

  writeData: function(envName, name, pairName){
    var postData = {
      environmentName: envName,
      name: name,
      pairName: pairName
    };
    var cpdev1 = firebase.database().ref().child('environments').push().key;
    var updates = {};
    updates['/environments/' + envName + '/' + envName] = postData;

    return firebase.database().ref().update(updates)
  },

  pullFromDB: function(query){
  return new Promise((resolve, reject) => {
      firebase.database().ref(query).on('value', resolve);
    })
},

  retrieveEnvUsersCp1: function(){
    this.pullFromDB('environments/' + 'cp-dev1').then((env_users) => {
      var envUsersArrayCp1 = Object.keys(env_users.val()).map(function(key) {
        return env_users.val()[key];
      });
      this.setState({envUsersArrayCp1: envUsersArrayCp1});
    })
  },

  retrieveEnvUsersCp2: function(){
    this.pullFromDB('environments/' + 'cp-dev2').then((env_users) => {
      var envUsersArrayCp2 = Object.keys(env_users.val()).map(function(key) {
        return env_users.val()[key];
      });
      this.setState({envUsersArrayCp2: envUsersArrayCp2});
    })
  },

  retrieveEnvUsersQa1: function(){
    this.pullFromDB('environments/' + 'cp-qa1').then((env_users) => {
      var envUsersArrayQa1 = Object.keys(env_users.val()).map(function(key) {
        return env_users.val()[key];
      });
      this.setState({envUsersArrayQa1: envUsersArrayQa1});
    })
  },

  retrieveEnvUsersQa2: function(){
    this.pullFromDB('environments/' + 'cp-qa2').then((env_users) => {
      var envUsersArrayQa2 = Object.keys(env_users.val()).map(function(key) {
        return env_users.val()[key];
      });
      this.setState({envUsersArrayQa2: envUsersArrayQa2});
    })
  },

render: function(){
    return (
      <div>
        <h1 className="headings" id="heading"> Environment Manager </h1>
        <input type="text" className="nameInput" id="nameInput" placeholder="your name" ref="name" required/>
        <input type="text" className="nameInput" id="pairInput" placeholder="your pair" ref="pair" required/>
        <p className="envQues" id="envQues"> Which environment do you plan to use? </p>
        <input type="submit" className="nameInput" id="cpdev1" value="cp-dev1" onClick={this.handleClickCp1} ref="cpdev1" />
        <input type="submit" className="nameInput" id="cpdev2" value="cp-dev2" onClick={this.handleClickCp2} ref="cpdev2" />
        <input type="submit" className="nameInput" id="cpqa1" value="cp-qa1" onClick={this.handleClickQa1} ref="cpqa1"/>
        <input type="submit" className="nameInput" id="cpqa2" value="cp-qa2" onClick={this.handleClickQa2} ref="cpqa2"/>
        <h3 className="headings" id="heading"> Current Env Users </h3>
        <p className="headings" id="cp-dev1" ref="user">
        {this.state.envUsersArrayCp1.map(function(num, index){
          return <p key={ index }>Environment Name: {num.environmentName} <br /> Name: {num.name}  <br /> Pair Name: {num.pairName}</p>;
        }, this)}
        </p>
        <p className="headings" id="cp-dev2" ref="user">
        {this.state.envUsersArrayCp2.map(function(num, index){
          return <p key={ index }>Environment Name: {num.environmentName} <br /> Name: {num.name}  <br /> Pair Name: {num.pairName}</p>;
        }, this)}
        </p>
        <p className="headings" id="cp-qa1" ref="user">
        {this.state.envUsersArrayQa1.map(function(num, index){
          return <p key={ index }>Environment Name: {num.environmentName} <br /> Name: {num.name}  <br /> Pair Name: {num.pairName}</p>;
        }, this)}
        </p>
        <p className="headings" id="cp-qa2" ref="user">
        {this.state.envUsersArrayQa2.map(function(num, index){
          return <p key={ index }>Environment Name: {num.environmentName} <br /> Name: {num.name}  <br /> Pair Name: {num.pairName}</p>;
        }, this)}
        </p>
        <p className="headings" id="pairUser" ref="user" />
      </div>
    )
  }
});

ReactDOM.render(
  <EnvManager />, document.getElementById('content')
);
