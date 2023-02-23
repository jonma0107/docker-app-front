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
        deliver_date: '',
        comment: '',
        
      },
      editing: false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleChange3 = this.handleChange3.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.startEdit = this.startEdit.bind(this)
  }; // Constructor

  // ***********************************************  The CSRF middleware  ************************************************* 

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  } // Fin de getCookie
  // https://docs.djangoproject.com/en/3.0/ref/csrf/


  componentWillMount(){
    this.fetchTasks()
  }

  // ******************************************************  FETCH  *********************************************************

  fetchTasks(){
    console.log('Fetching...');

    const URL = process.env.REACT_APP_URL

    fetch(URL)
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
        
      }
    })
  }


  handleChange2(e){
    let name = e.target.name
    let value = e.target.value
    console.log('Name:', name);
    console.log('Value:', value);

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        description:value,        
      }
    })
  }

  handleChange3(e){
    let name = e.target.name
    let value = e.target.value
    console.log('Name:', name);
    console.log('Value:', value);

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        comment:value,
      }
    })
  }




  // ********************************************************** State Select 1 ***************************************************

  handleSelectChange = (e) => {
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

  handleSelectChange2 = (e) => {
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

  // ******************************************************** State Input Date *****************************************************
  
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

    let crsftoken = this.getCookie('crsftoken')
    
    let url = process.env.REACT_APP_URL

    // Editing ....
    // if (this.state.editing == true) {
    //   url = `http://localhost:8000/api/list/${this.state.activeItem.id}`
    //   this.setState({
    //     editing:true
    //   })
    // }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'X-CSRFToken' : crsftoken
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((res) => {
      this.fetchTasks()
      this.setState({
        activeItem:{
          id: null,
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

  }  

  //*******************************************************  EDIT  *******************************************************************/

  startEdit(task){
    let url = process.env.REACT_APP_URL

    url = `process.env.REACT_APP_URL${this.state.activeItem.id}`
    this.setState({
      activeItem:task,
      editing: true

    })
  }

    
  // *********************************************************************************************************************************
  // *******************************************************  RENDER  ****************************************************************
  // *********************************************************************************************************************************

  render(){
    let tasks = this.state.todoList
    let self = this
    return(
      <div className='container-fluid'>
        
        <h1 className='display-1 text-white text-center mt-5'>Mini Trello</h1>

        <div id='task-container'>
          <div id='form-wrapper'>
            <form onSubmit={this.handleSubmit} id='form'>
              <div className='flex-wrapper gap-5'>
                

                {/* Title */}

                <div className='text-center' style={{flex:20}}>
                  <label>Task Name or Requeriment:</label>
                  <input onChange={this.handleChange} className='form-control' id='title' type="text" name='title' value={this.state.activeItem.title} placeholder='add a task name' />
                </div>

                {/* Description */}

                <div className='text-center' style={{flex:20}}>
                <label>Description:</label>
                  <textarea name='description' className='form-control' onChange={this.handleChange2} id='title' value={this.state.activeItem.description} placeholder='add a description of task'></textarea>
                </div>

                {/* Select State */}

                <div className='text-center' style={{flex:7}}>
                <label>State:</label>
                  <select value={this.state.activeItem.state} onChange={this.handleSelectChange} name="state">
                    <option value="" selected disabled>Select a State</option>
                    <option value="BACKLOG">BACKLOG</option>
                    <option value="TO DO">TO DO</option>
                    <option value="DOING">DOING</option>
                    <option value="TEST">TEST</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                {/* Select Priority */}

                <div className='text-center' style={{flex:7}}>
                <label>Priority:</label>
                  <select value={this.state.activeItem.priority} onChange={this.handleSelectChange2} name='priority'>
                    <option value="" selected disabled>Selecet a Priority</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                    
                  </select>
                </div>

                {/* Deliver_Date */}

                <div className='text-center' style={{flex:8}}>
                <label>Deliver Date:</label>
                  <input name='deliver_date' className='form-control' type='date' onChange={this.handleDateChange} value={this.state.activeItem.deliver_date}/>                  
                </div>

                {/* Comment */}

                <div className='text-center' style={{flex:20}}>
                <label>Comment:</label>
                  <textarea name='comment' className='form-control' onChange={this.handleChange3} id='title' value={this.state.activeItem.comment} placeholder='add a comment' ></textarea>
                </div>

                {/* SUBMIT */}

                <div style={{flex: 1}}>
                  <input id='submit' className='btn btn-warning' type="submit" name='add' value={this.state.editing ? 'Update' : 'Create'}/>
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
                    <span className='text-primary'>Task Name or Requeriment:</span>
                    <p>{task.title}</p>
                    <span className='text-primary'>Description:</span>
                    <p>{task.description}</p>
                    <span className='text-primary'>State:</span>
                    <p>{task.state}</p>
                    <span className='text-primary'>Priority:</span>
                    <p>{task.priority}</p>
                    <span className='text-primary'>Deliver date:</span>
                    <p>{task.deliver_date}</p>
                    <span className='text-primary'>Comment:</span>
                    <p>{task.comment}</p>

                    <hr></hr>
                    
                  </div>

                  {/* uPDATE */}

                  <div style={{flex:0.4}}>
                  <button onClick={() => self.startEdit(task)} className='btn btn-sm btn-outline-info'>Edit</button>
                    
                  </div>

                  {/* dELETE */}

                  <div style={{flex:0.4}}>
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
