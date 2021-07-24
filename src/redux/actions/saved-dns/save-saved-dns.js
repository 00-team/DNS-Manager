import sqlite3 from 'sqlite3'
const sqlite = sqlite3.verbose()

import { loadSavedDns } from './get-saved-dns'

import {
    SUCCESS_ALERT,
    ERROR_ALERT,
    INFO_ALERT,
} from '../base/types'


export const SaveSavedDns = (dnsName, dns1, dns2) => (dispatch) => {
    const db = new sqlite.Database('db.sqlite3')

    if (!dns1 || !dns2 || !dnsName) return dispatch({ type: ERROR_ALERT, payload: 'Please fill in all fields' })
    if (dns1.length < 6 || dns1.length < 6 || dnsName.length < 1) {
        return dispatch({ type: ERROR_ALERT, payload: 'Please fill in all fields' })
    }
    
    db.serialize(() => {
        let lastID = 1;

        db.run("CREATE TABLE if not exists saved_dns (id integer, name text, preferred_dns text, alternate_dns text)");

        db.all('SELECT * FROM saved_dns ORDER BY id DESC LIMIT 1', (err, rows) => {
            if (rows) if (rows.length > 0) lastID = rows[0].id + 1
        })

        db.run(`INSERT INTO saved_dns VALUES (${lastID}, '${dnsName}', '${dns1}', '${dns2}')`, (err) => {
            if (err) console.log(err)
        })

        db.close(() => dispatch(loadSavedDns()))
    })

}
