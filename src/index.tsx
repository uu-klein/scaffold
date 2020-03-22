import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.less'
import {textFun} from '@/common/common'
// import aa from '@/assets/a.png';

textFun(0);

ReactDOM.render(
    <div className={styles.div1}>
        Hello000000React
        {/*<img src={aa} alt={''}/>*/}
    </div>,
    document.getElementById('root'),
);

