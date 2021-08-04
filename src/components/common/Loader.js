import React from 'react'

// base loader
import HashLoader from 'react-spinners/HashLoader';
import { css } from '@emotion/react';

// style
import './sass/loader.scss'

const Loader = ({ loading, customStyle }) => {
    return (
        <div className='loader-container' style={customStyle}>
            <HashLoader color='#782FEF' loading={loading} css={css`width:auto; height:auto;`} />
        </div>
    )
}

Loader.defaultProps = {
    loading: true,
    customStyle: {},
}

export default Loader
