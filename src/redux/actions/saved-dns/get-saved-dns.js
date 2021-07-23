import sqlite3 from 'sqlite3'
const sqlite = sqlite3.verbose()

import {
    LOADING_SAVED_DNS,
    LOAD_SAVED_DNS
} from './types';

import {
    SUCCESS_ALERT,
    ERROR_ALERT,
    INFO_ALERT,
} from '../base/types'


export const loadSavedDns = () => (dispatch) => {
    dispatch({ type: LOADING_SAVED_DNS, payload: true })

    const db = new sqlite.Database('db.sqlite3')

    db.serialize(() => {
        db.run("CREATE TABLE if not exists saved_dns (id integer, name text, preferred_dns text, alternate_dns text)");
        db.all('SELECT * FROM saved_dns ORDER BY id LIMIT 100000', (err, rows) => {
            if (typeof rows === 'object' && rows) {
                dispatch({ type: LOAD_SAVED_DNS, payload: rows })
            }

            if (err) console.log(err)
        })

        db.close(() => dispatch({ type: LOADING_SAVED_DNS, payload: false }))
    })
}
