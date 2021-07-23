import sqlite3 from 'sqlite3'
const sqlite = sqlite3.verbose()

import { loadSavedDns } from './get-saved-dns'

import {
    SUCCESS_ALERT,
    ERROR_ALERT,
    INFO_ALERT,
} from '../base/types'


export const SaveSavedDns = (name, dns1, dns2) => (dispatch) => {
    const db = new sqlite.Database('db.sqlite3')

    db.serialize(() => {
        let lastID = 1;

        db.run("CREATE TABLE if not exists saved_dns (id integer, name text, preferred_dns text, alternate_dns text)");

        db.all('SELECT * FROM saved_dns ORDER BY id DESC LIMIT 1', (err, rows) => {
            if (rows) if (rows.length > 0) lastID = rows[0].id + 1
        })

        db.run(`INSERT INTO saved_dns VALUES (${lastID}, '${name}', '${dns1}', '${dns2}')`, (err) => {
            if (err) console.log(err)
        })

        db.close(() => dispatch(loadSavedDns()))
    })
}
