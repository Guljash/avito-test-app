import { connect } from 'react-redux';
import Stories from './Stories';
import { toggleIsFetchingAC, toggleNewsTypeAC, setStoriesAC } from '../../redux/reducers/storiesReducer'
import React from 'react'


class StoriesContainer extends React.Component {
  getNewStories = async (blockIsFetching = false, newsTypeBool=this.props.state.newsType) => {
    if (!blockIsFetching) {
      this.props.toggleIsFetching(true)
    }
    let newsType
    if (newsTypeBool) {
      newsType = "top"
    }
    else {
      newsType = "new"
    }
    const url = `https://hacker-news.firebaseio.com/v0/${newsType}stories.json`;
    try {
      const response = await fetch(url);
      if (response.ok === false) {
        throw new Error("Response Error:" + response.text);
      }
      const json = await response.json();
      console.log(json);
      const promises = json
        .slice(0, 100)
        .map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            response => response.json()
          )
        );
      const result = await Promise.all(promises);
      result.forEach((el, i) => {
        if (el === null){
          result.splice(i, 1)
        }
      })
      this.props.setStories(result);
      console.log(result);
      this.props.toggleIsFetching(false)
    } catch (err) {
      console.error(err);
    }
  }

  onToggleNewsTypeClick = (newsTypeBool) => {
    this.props.toggleNewsType()
    this.getNewStories(false, newsTypeBool)
  }

  _tick = () => {
    this.getNewStories(true)
  }

  componentDidMount() {
    this.getNewStories();
    this.timer = setInterval(this._tick, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <Stories onToggleNewsTypeClick={this.onToggleNewsTypeClick} reload={this.getNewStories} isFetching={this.props.isFetching} state={this.props.state} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    state: state.storiesPage,
    isFetching: state.storiesPage.isFetching
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    setStories: (stories) => { dispatch(setStoriesAC(stories)) },
    toggleIsFetching: (isFetching) => { dispatch(toggleIsFetchingAC(isFetching)) },
    toggleNewsType: () => { dispatch(toggleNewsTypeAC()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StoriesContainer);

