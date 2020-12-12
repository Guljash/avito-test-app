import { connect } from 'react-redux'
import Story from './Story'
import React from 'react'
import { toggleIsFetchingAC, setStoryAC, setCommentsAC } from '../../redux/reducers/storiesReducer'

class StoryContainer extends React.Component {

  getNewComments = async (id, parentType) => {
    if (!parentType) {
      this.props.toggleIsFetching(true)
      parentType = 'story'
    }
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    try {
      const response = await fetch(url)
      if (response.ok === false) {
        throw new Error("Response Error:" + response.text)
      }
      const json = await response.json()
      if (json.kids !== undefined) {
        const promises = json.kids
          .map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              response => response.json()
            )
          )
        const result = await Promise.all(promises)
        this.props.setComments(result, parentType)
      }
      this.props.toggleIsFetching(false)
    } catch (err) {
      console.error(err);
    }
  }

  getStory = async (id) => {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
    try {
      const response = await fetch(url)
      if (response.ok === false) {
        throw new Error("Response Error:" + response.text)
      }
      const json = await response.json()
      this.props.setStory(json)
      this.props.toggleIsFetching(false)
    } catch (err) {
      console.error(err);
    }
  }

  _tick = (id) => {
    this.getNewComments(id, true)
  }

  componentDidMount() {
    let id = this.props.location.pathname.slice(1)
    this.getNewComments(id);
    this.getStory(id)
    this.timer = setInterval(() => { this._tick(this.props.state.storyData.id) }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <Story isFetching={this.props.isFetching} state={this.props.state} updateComments={this.getNewComments} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    state: state.storiesPage,
    isFetching: state.storiesPage.isFetching,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    setComments: (comments, parentType) => { dispatch(setCommentsAC(comments, parentType)) },
    setStory: (story) => { dispatch(setStoryAC(story)) },
    toggleIsFetching: (isFetching) => { dispatch(toggleIsFetchingAC(isFetching)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
