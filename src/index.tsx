import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.less'
import {textFun} from '@/common/common'
import styles1 from './index1.less'
// import aa from '@/assets/a.png';

textFun(0);

ReactDOM.render(
    <div
        className={styles.div1}
    >
        Hello000000React
        {/*<img src={aa} alt={''}/>*/}
        <div
            className={styles1.div1111}
        >
            Hello000000React
            <img src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} alt={''}/>
        </div>
    </div>,
    document.getElementById('root'),
);

