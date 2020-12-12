import React from 'react'
import styles from './SubComment.module.css'

const SubComment = (props) => {
    return (
        <div>
            {props.SD.map(el => {
                if (el.parent === props.id) {
                    return (
                        <ul key={el.id} onClick={(e) => {
                            e.stopPropagation()
                            props.onCommentClick(el.id, el.type)
                        }} className={styles.subComment}>
                            <li dangerouslySetInnerHTML={{ __html: el.text }}></li>
                            <li>By:{el.by}</li>
                            {el.kids ? <li>Replies: {el.kids.length}</li> : null}
                            {el.kids ? <SubComment onCommentClick={props.onCommentClick} SD={props.SD} id={el.id} state={el} /> : null}
                        </ul>)
                }
                else {
                    return null
                }
            })}

        </div>
    )

}

export default SubComment