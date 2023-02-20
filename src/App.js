import React from 'react'; 
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        title: '',
        description: '',
        state: '',
        priority: '',
        deliver_date: '',
        comment: '',
        
      },
      
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }; // Constructor

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...');

    fetch('http://localhost:8000/api/list/')
    .then(res => res.json())
    .then(data =>
      this.setState({
        todoList:data
      })
    )
  }

  // *********************************************************  State String's **********************************************

  handleChange(e){
    let name = e.target.name
    let value = e.target.value
    console.log('Name:', name);
    console.log('Value:', value);

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value,
        description:value,
        comment:value,
      }
    })
  }

  // ********************************************************** State Select 1 ***************************************************

  handleSelectChange2 = (e) => {
    let name = e.target.name
    let value = e.target.value
    console.log('Name:', name);
    console.log('Value:', value);
    
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        state:value,        
      }
    });
  }

  // ********************************************************** State Select 2 ***************************************************

  handleSelectChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    console.log('Name:', name);
    console.log('Value:', value);
    
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        priority:value,        
      }
    });
  }

  // ********************************************************** State Input Date ***************************************************
  
  handleDateChange = (deliver_date) => {
    let name = deliver_date.target.name
    let value = deliver_date.target.value
    console.log('Name:', name);
    console.log('Value:', value);

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        deliver_date: value,        
      }
    });
  }    

  // ********************************************************** State Submit *******************************************************

  handleSubmit(e){
    e.preventDefault()
    console.log('ITEM:', this.state.activeItem);
    
    let url = 'http://localhost:8000/api/list/'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((res) => {
      this.fetchTasks()
      this.setState({
        activeItem:{
          title:'',
          description:'',
          state:'',
          priority:'',
          deliver_date: '',
          comment: '',
          
        }
      })
    }).catch(function(error) {
      console.log('ERROR:', error);
    })

    // borrarForm()

  }
  
  // function borrarForm() {
    
  // }

  // *********************************************************************************************************************************
  // *******************************************************  RENDER  ****************************************************************
  // *********************************************************************************************************************************

  render(){
    let tasks = this.state.todoList
    return(
      <div className='container'>

        <div id='task-container'>
          <div id='form-wrapper'>
            <form onSubmit={this.handleSubmit} id='form'>
              <div className='flex-wrapper'>

                {/* Title */}

                <div style={{flex:6}}>
                  <input onChange={this.handleChange} className='form-control' id='title' type="text" name='title' placeholder='add task name'/>
                </div>

                {/* Description */}

                <div style={{flex:6}}>
                  <textarea name='description' className='form-control' onChange={this.handleChange} id='title' ></textarea>
                </div>

                {/* Select State */}

                <div style={{flex:6}}>
                  <select value={this.state.activeItem.state} onChange={this.handleSelectChange2} name="state">
                    <option value="BACKLOG">BACKLOG</option>
                    <option value="TO DO">TO DO</option>
                    <option value="DOING">DOING</option>
                    <option value="TEST">TEST</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                {/* Select Priority */}

                <div style={{flex:6}}>
                  <select value={this.state.activeItem.priority} onChange={this.handleSelectChange} name='priority'>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                    
                  </select>
                </div>

                {/* Deliver_Date */}

                <div style={{flex:6}}>
                  <input name='deliver_date' className='form-control' type='date' onChange={this.handleDateChange}/>                  
                </div>

                {/* Comment */}

                <div style={{flex:6}}>
                  <textarea name='comment' className='form-control' onChange={this.handleChange} id='title' ></textarea>
                </div>

                {/* SUBMIT */}

                <div style={{flex: 1}}>
                  <input id='submit' className='btn btn-warning' type="submit" name='add'/>
                </div>
              </div>
            </form>
          </div>

          {/* LIST */}

          <div id='list-wrapper'> 
            {tasks.map(function(task, index){
              return(
                <div key={index} className='task-wrapper flex-wrapper'>
                  <div style={{flex:7}}>

                    <p>{task.title}</p>
                    <p>{task.description}</p>
                    <p>{task.state}</p>
                    <p>{task.priority}</p>
                    <p>{task.deliver_date}</p>
                    <p>{task.comment}</p>

                    <hr></hr>
                    
                  </div>

                  {/* uPDATE */}

                  <div style={{flex:1}}>
                  <button className='btn btn-sm btn-outline-info'>Edit</button>
                    
                  </div>

                  {/* dELETE */}

                  <div style={{flex:1}}>
                  <button className='btn btn-sm btn-outline-danger delete'>Delete</button>
                    
                  </div>



                </div>
              )
            })}          
          </div>

        </div>
      </div>
    )
  }
} // Fin Clase App


export default App;
