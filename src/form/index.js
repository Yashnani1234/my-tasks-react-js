import {Component} from 'react'
import {v4 as uuid} from 'uuid'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Form extends Component {
  state = {
    taskList: [],
    taskName: '',
    selectedId: tagsList[0].displayText,
    updatedList: [],
  }

  onChangeTaskName = event => {
    this.setState({taskName: event.target.value})
  }

  changeOption = event => {
    this.setState({selectedId: event.target.value})
  }

  clickTag = event => {
    console.log(event.currentTarget.id)
    const {taskList} = this.state
    console.log(taskList)
    const updated = taskList.filter(each => each.tag === event.currentTarget.id)
    this.setState({updatedList: updated})
  }

  addTask = () => {
    const {taskName, selectedId} = this.state

    const newTask = {
      id: uuid(),
      name: taskName,
      tag: selectedId,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      updatedList: [...prevState.taskList, newTask],
    }))
    this.setState({taskName: ''})
  }

  render() {
    const {taskName, selectedId, updatedList} = this.state
    return (
      <>
        <h1>Create a task!</h1>
        <>
          <label className="input-label" htmlFor="task">
            Task
          </label>
          <input
            type="text"
            id="task"
            className="username-input-field"
            value={taskName}
            onChange={this.onChangeTaskName}
            placeholder="Username"
          />
        </>
        <label className="input-label" htmlFor="tags">
          Tags
        </label>
        <select id="tags" value={selectedId} onChange={this.changeOption}>
          {tagsList.map(each => (
            <option key={each.optionId} value={each.displayText}>
              {each.displayText}
            </option>
          ))}
        </select>
        <button type="button" onClick={this.addTask}>
          Add Task
        </button>
        <div>
          <>
            <h1>Tags</h1>
            {tagsList.map(each => (
              <button
                key={each.optionId}
                id={each.displayText}
                onClick={this.clickTag}
                type="button"
              >
                {each.displayText}
              </button>
            ))}
          </>
          <>
            <h1>Tasks</h1>
            {updatedList.length === 0 ? (
              <p>No Tasks Added Yet</p>
            ) : (
              <ul>
                {updatedList.map(each => (
                  <li key={each.id}>
                    <p>{each.name}</p>
                    <p>{each.tag}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        </div>
      </>
    )
  }
}

export default Form
