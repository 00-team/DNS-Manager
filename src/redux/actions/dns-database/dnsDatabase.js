import sqlite3 from 'sqlite3'
const sqlite = sqlite3.verbose()

import { LOAD_DNS_DATABASE, LOADING_DNS_DATABASE } from '../../reducers/dns-database/types'
import { ERROR_ALERT } from '../../reducers/base/types'

const CreateTable = 'CREATE TABLE if not exists DNS_DATABASE (id integer, dns_name text, dns1 text, dns2 text)'

const SendError = (dispatch, msg='Error ...') => dispatch({ type: ERROR_ALERT, payload: msg })
const Loading = (dispatch, isLoading=true) => dispatch({ type: LOADING_DNS_DATABASE, payload: isLoading })
    
export const LoadDatabase = () => (dispatch) => {
    Loading(dispatch)

    const db = new sqlite.Database('db.sqlite3')

    db.serialize(() => {
        db.run(CreateTable)
        db.all('SELECT * FROM DNS_DATABASE ORDER BY id LIMIT 10000', (err, rows) => {
            if (err) return SendError(dispatch, err.message)

            if (typeof rows === 'object' && rows) {

                dispatch({ type: LOAD_DNS_DATABASE, payload: rows.map((item, index) => {  
                    return {
                        id: item.id,
                        tabName: item.dns_name,
                        dns1: item.dns1,
                        dns2: item.dns2,
                        isSelected: !Boolean(index)
                    }
                }) })
            }
        })

        db.close(() => Loading(dispatch, false))
    })
}


export const AddDnsDatabase = (data) => (dispatch) => {
    Loading(dispatch)

    const db = new sqlite.Database('db.sqlite3')

    db.serialize(() => {
        let lastID = 1;

        db.run(CreateTable)

        db.all('SELECT * FROM DNS_DATABASE ORDER BY id DESC LIMIT 1', (err, rows) => {
            if (rows) {
                if (rows.length > 0) {
                    lastID = rows[0].id + 1
                }
            }

            Insert()
        })

        const Insert = () => {
            db.run(`INSERT INTO DNS_DATABASE VALUES (${lastID}, '${ data.dnsName || "No Name" }', '${ data.dns1 || "0.0.0.0" }', '${ data.dns2 || "0.0.0.0" }')`, (err) => {
                if (err) SendError(dispatch, err.message)
            })

            db.close(() => dispatch(LoadDatabase()))
        }
    })
}

export const UpdateDataBase = (data) => (dispatch) => {
    Loading(dispatch)

    data = {
        ...data,
        dnsName: data.dnsName || 'No Name',
        dns1: data.dns1 || '0.0.0.0',
        dns2: data.dns2 || '0.0.0.0',
    }

    const db = new sqlite.Database('db.sqlite3')

    db.serialize(() => {
        db.run(CreateTable)
        
        db.run(`UPDATE DNS_DATABASE SET dns_name = '${data.dnsName}', dns1 = '${data.dns1}', dns2 = '${data.dns2}' WHERE id = ${data.id}`, (err) => {
            if (err) SendError(dispatch, err.message)
        })

        db.close(() => dispatch(LoadDatabase()))
    })
}

export const DeleteDns = (id) => (dispatch) => {
    Loading(dispatch)

    const db = new sqlite.Database('db.sqlite3')

    db.serialize(() => {
        db.run(CreateTable)
        
        db.run(`DELETE FROM DNS_DATABASE WHERE id = ${id}`, (err) => {
            if (err) SendError(dispatch, err.message)
        })

        db.close(() => dispatch(LoadDatabase()))
    })
}
