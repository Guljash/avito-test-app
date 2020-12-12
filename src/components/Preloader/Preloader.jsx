import React from 'react'
import styles from './Preloader.module.css'
import loader from './../../assets/loader.svg'

const Preloader = () => {
    return (
        <div className={styles.loader}>
            <img src={loader} alt="" />
        </div>
    )
}

export default Preloader