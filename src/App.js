import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-responsive-modal';

const localizer = momentLocalizer(moment)

export default class App extends React.Component{
  constructor(props){
    super(props)
      this.state={
        events : '',
        selectedDate: '',
        SelectedEvents: '',
        myEventsList: [],
        openModal: false
      }
  }

  handleEvents=(e)=>{
    this.setState({
      openModal: true,
      events: e,
      selectedDate: e.start,
      SelectedEvents: e.title
    })
  }

  handleSelect=(e)=>{
    this.setState({
      openModal: true,
      selectedDate: e.start
    })
  }

  handleInput=(e)=>{
    this.setState({SelectedEvents: e.target.value})
  }

  handleCloseModal=(e)=>{
    this.setState({openModal: false,selectedDate: '', SelectedEvents: '', events: ''})
  }

  handleSubmit=(e)=>{
    let events;
    if(this.state.events !== ''){
      let start = this.state.events.start;
      this.state.myEventsList.map((value, index)=>{
        if(value.start === start){
          if(this.state.SelectedEvents !== ''){
            value.title = this.state.SelectedEvents
          }else{
            this.state.myEventsList.splice(index, 1)
          }
        }
      })
    }else{
      events = {title: this.state.SelectedEvents, start: this.state.selectedDate, end: this.state.selectedDate}
      if(this.state.SelectedEvents !== '')
        this.state.myEventsList.push(events)
    }
    this.setState({myEventsList: this.state.myEventsList, openModal: false, selectedDate: '', SelectedEvents: '', events: ''})
  }

  render(){
    return(
      <div className="container">
        <h1>Calendar Events</h1>
        <Calendar
            selectable={true}
            localizer={localizer}
            events={this.state.myEventsList}
            onSelectEvent={this.handleEvents}
            views={["month"]}
            style={{ height: 500 }}
            onSelectSlot={this.handleSelect}
            defaultDate={moment('2020/01/01').toDate()}
        />
        
        <Modal className="modalWidth" open={this.state.openModal} onClose={this.handleCloseModal} showCloseIcon={false}>
          <div >
            <div className="modal_header">
            <h3>Event Title</h3> 
            </div>
              <div className="modal-body table-responsive pb-0 suspend-m-body" style={{backgroundColor:'#c2c3c4'}}>
                <input type="text" name="events" value={this.state.SelectedEvents} onChange={this.handleInput} autofocus />
              </div>

              <div className="modal-button">
                <button className="btn" style={{backgroundColor: '#4CAF50'}} onClick={this.handleSubmit}>Ok</button>
                <button className="btn" style={{backgroundColor: '#f44336'}} onClick={this.handleCloseModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
