import React from 'react'; 
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        description: '',
        state: '',
        priority: '',
        // completed: false,
      },
      // editing:false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  };

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...');

    fetch('http://localhost:8000/api/list/')
    // fetch('http://localhost:8000/api/task-list/')
    .then(res => res.json())
    .then(data =>
      this.setState({
        todoList:data
      })
    )
  }

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
        state:value,
        // priority:value
      }
    })
  }

  handleSelectChange = (event) => {
    const value = event.target.value;
    this.setState(prevState => ({
      activeItem: {
        ...prevState.activeItem,
        priority:value
      }
    }));
  }  

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
          id:null,
          title:'',
          description:'',
          state:'',
          priority:'',
          // completed:false
        }
      })
    }).catch(function(error) {
      console.log('ERROR:', error);
    })
  }

  render(){
    let tasks = this.state.todoList
    return(
      <div className='container'>

        <div id='task-container'>
          <div id='form-wrapper'>
            <form onSubmit={this.handleSubmit} id='form'>
              <div className='flex-wrapper'>

                <div style={{flex:6}}>
                  <input onChange={this.handleChange} className='form-control' id='title' type="text" name='title' placeholder='add task name'/>
                </div>

                <div style={{flex:6}}>
                  <input onChange={this.handleChange} className='form-control' id='title' type="text" name='description' placeholder='add a description'/>
                </div>

                <div style={{flex:6}}>
                  <select value={this.state.activeItem.state} onChange={this.handleChange}>
                    <option value="BACKLOG">BACKLOG</option>
                    <option value="TO DO">TO DO</option>
                    <option value="DOING">DOING</option>
                    <option value="TEST">TEST</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <div style={{flex:6}}>
                  <select value={this.state.activeItem.priority} onChange={this.handleSelectChange}>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                    
                  </select>
                </div>

                <div style={{flex: 1}}>
                  <input id='submit' className='btn btn-warning' type="submit" name='add'/>
                </div>
              </div>
            </form>
          </div>

          <div id='list-wrapper'> 
            {tasks.map(function(task, index){
              return(
                <div key={index} className='task-wrapper flex-wrapper'>
                  <div style={{flex:7}}>

                    {/* <span>{task.title}</span>                    */}
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                    <p>{task.state}</p>
                    <p>{task.priority}</p>
                    <p>{task.deliver_date}</p>
                    <p>{task.comment}</p>

                    <hr></hr>
                    
                  </div>

                  <div style={{flex:1}}>
                  <button className='btn btn-sm btn-outline-info'>Edit</button>
                    
                  </div>

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
}


export default App;
