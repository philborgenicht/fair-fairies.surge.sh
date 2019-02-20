import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Messages from './component/Messages';
import Toolbar from './component/Toolbar';
import Composer from './component/Composer';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

class App extends Component {
  state = {}

  componentDidMount = async() => {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    let newState = {messages:[...messages]}
    newState.messages.forEach(message => message.selected = false)
    newState.isComposing = false
    this.setState(newState)
  }

  updateMessage = async(data) => {
    await fetch('http://localhost:8082/api/messages',{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    let response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    let newState = {messages:[...messages]}
    newState.messages = newState.messages.map(message => {const m = {...message}; m.selected = false; return m})
    this.setState(newState)
  }


  handleSubmit = async(e) => {
    e.preventDefault()
    if(!e.target.subject.value || !e.target.body.value){ return }
    await fetch('http://localhost:8082/api/messages',{
      method: 'POST',
      body: JSON.stringify({
        subject: e.target.subject.value,
        body: e.target.body.value,
        read: false,
        starred: false,
        selected: false,
        labels: [],
      }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    let response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    let newState = {messages:[...messages]}
    newState.isComposing = false
    this.setState(newState)
  }

  handleDelete = async() => {
    const selected = this.state.messages.filter(message=> message.selected)
    const messageIds = selected.map(message=>message.id)
    const response = await fetch('http://localhost:8082/api/messages',
        {
          method: 'PATCH',
          body: JSON.stringify({
            messageIds: [...messageIds],
            command: 'delete',
          }),
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
    const messages = await response.json()
    let newState = {messages:[...messages]}
    newState.messages.forEach(message => message['selected'] = false)
    this.setState(newState)
  }

  select = (e, id) => {
    let newMessages = [...this.state.messages]
    const idx = newMessages.findIndex(message => message.id === id)
    newMessages[idx]['selected'] = e.target.checked
    this.setState({messages: newMessages})
  }

  selectAll = () => {
    let newMessages = [...this.state.messages]
    newMessages.forEach(message => message['selected'] = true)
    this.setState({messages: newMessages})
  }

  unSelectAll = () => {
    let newMessages = [...this.state.messages]
    newMessages.forEach(message => message['selected'] = false)
    this.setState({messages: newMessages})
  }

  starred = async(id) => {
    let newMessages = [...this.state.messages]
    const idx = newMessages.findIndex(message => message.id === id)
    let isStarred = newMessages[idx]['starred'] || false
    isStarred? newMessages[idx]['starred'] = false : newMessages[idx]['starred'] = true
    await this.updateMessage({
      messageIds: [id],
      command: 'star',
      star: !isStarred
    })
  }

  read = async(id) => {
    let newMessages = [...this.state.messages]
    const idx = newMessages.findIndex(message => message.id === id)
    newMessages[idx]['read'] = true
    await this.updateMessage({
      messageIds: [id],
      command: 'read',
      read: newMessages[idx]['read']
    })
  }

  readSelected = () =>{
    this.state.messages.filter(message=> message.selected)
                       .forEach(async message=>{
                         let newMessages = [...this.state.messages]
                         const idx = newMessages.findIndex(m => m.id === message.id)
                         newMessages[idx]['read'] = true
                         await this.updateMessage({
                           messageIds: [message.id],
                           command: 'read',
                           read: true
                         })
                       })
  }

  unReadSelected = () =>{
    this.state.messages.filter(message=> message.selected)
                       .forEach( message=>{
                         let newMessages = [...this.state.messages]
                         const idx = newMessages.findIndex(m => m.id === message.id)
                         newMessages[idx]['read'] = false
                         this.updateMessage({
                           messageIds: [message.id],
                           command: 'read',
                           read: false
                         })
                       })
  }

  applyLabel = (e) =>{
      this.state.messages.filter(message=> message.selected)
                         .forEach(async message=>{
                           let newMessages = [...this.state.messages]
                           const idx = newMessages.findIndex(m => m.id === message.id)
                           let labels = newMessages[idx]['labels']
                           if (!labels.includes(e.target.value)){
                             await this.updateMessage({
                               messageIds: [message.id],
                               command: 'addLabel',
                               label: e.target.value
                             })
                           }
                         })
  }

  removeLabel = (e) =>{
      this.state.messages.filter(message=> message.selected)
                         .forEach(async message=>{
                           let newMessages = [...this.state.messages]
                           const idx = newMessages.findIndex(m => m.id === message.id)
                           let labels = newMessages[idx]['labels']
                           if (labels.includes(e.target.value)){
                             await this.updateMessage({
                               messageIds: [message.id],
                               command: 'removeLabel',
                               label: e.target.value
                             })
                           }
                         })
  }

  toggleComposer = () => {
    let composerToggle = !this.state.isComposing
    this.setState({isComposing: composerToggle})
  }


  render() {
    return (
      <Router>
        <div>
          <nav></nav>
          <div className="container" style={{background: "rgba(200, 200, 200, 0.8)"}}>
            <Toolbar toggleComposer={this.toggleComposer} isComposing={this.state.isComposing} messages={this.state.messages} unReadAll={this.unReadSelected} readAll={this.readSelected} selectAll={this.selectAll} unSelectAll={this.unSelectAll} applyLabel={this.applyLabel} removeLabel={this.removeLabel} handleDelete={this.handleDelete}/>
              <Route path="/composer" render={()=> (<Composer isComposing={this.state.isComposing} handleSubmit={this.handleSubmit}/>) }/>
              <Switch>
                <Route path="/messages" render={()=> (<Messages isComposing={this.state.isComposing} messages={this.state.messages} select={this.select} read={this.read} starred={this.starred}/>)}/>
                <Route exact path="/" render={()=> (<Messages isComposing={this.state.isComposing} messages={this.state.messages} select={this.select} read={this.read} starred={this.starred}/>)}/>
              </Switch>
          </div>
        </div>
      </Router>


    );
  }
}

export default App;
