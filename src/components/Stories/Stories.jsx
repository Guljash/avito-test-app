import React from 'react'
import styles from './Stories.module.css'
import { Link } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'

const Stories = (props) => {
    const getDate = (unixDate) => {
        const dateObject = new Date(unixDate * 1000)
        return dateObject.toLocaleString()
    }
    console.log(props.state.storiesData);

    return (
        <div>
            {props.isFetching ? <Preloader /> :
                <div className={styles.autors}>
                    <div className={styles.buttonWrapper}>
                        <button onClick={() => {props.reload()}}>Reload</button>
                        <button onClick={() => {props.onToggleNewsTypeClick(!props.state.newsType)}}>{props.state.newsType ? 'Get top stories' : 'Get new stories'}</button>
                    </div>
                    <ul>
                        {
                        props.state.storiesData.map(el => (
                            <Link key={el.id} to={`/${el.id}`}>
                                <li className={styles.li} >
                                    <div>{el.title}</div>
                                    <div>Rate: {el.score}</div>
                                    <div>By: {el.by}</div>
                                    <div>{getDate(el.time)}</div>
                                </li>
                            </Link>
                        ))
                        }
                    </ul>
                </div>}
        </div>
    )
}


export default Stories