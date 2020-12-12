import React from 'react'
import styles from './Story.module.css'
import Preloader from '../Preloader/Preloader'
import SubComment from './SubComment/SubComment'
import { Link } from 'react-router-dom'

const Story = (props) => {
    const getDate = (unixDate) => {
        const dateObject = new Date(unixDate * 1000)
        return dateObject.toLocaleString()
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <ul>
                    <li className={styles.title}>{props.state.storyData.title}</li>
                    <li><a href={props.state.storyData.url} rel="noreferrer" target='_blank'>{props.state.storyData.url}</a></li>
                    <li>{getDate(props.state.storyData.time)}</li>
                    <li>By: {props.state.storyData.by}</li>
                    {props.state.storyData.kids ? <li>Comments:  {props.state.commentsData.length}</li> : null}
                    <li><button onClick={() => {props.updateComments(props.state.storyData.id)}}>Update comments</button></li>
                    <li><Link to='/'><button>Back</button></Link></li>
                </ul>
                {props.isFetching ? <Preloader /> :

                    <ul>{
                        props.state.commentsData.map((el) => (
                            <li onClick={() => { props.updateComments(el.id, el.type) }} className={styles.rootComment} key={el.id}>
                                <div dangerouslySetInnerHTML={{ __html: el.text }}></div>
                                <div>By: {el.by}</div>
                                <div>{getDate(el.time)}</div>
                                {el.kids ? <div>Replies: {el.kids.length}</div> : null}
                                {el.kids ? <SubComment onCommentClick={props.updateComments} SD={props.state.subCommentsData} id={el.id} state={el} /> : null} 
                            </li>
                        ))}
                    </ul>

                }
            </div>
        </div >
    )
}


export default Story