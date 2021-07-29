import { combineReducers } from 'redux';

import sidebar from './sidebar/sidebar';

// Main
import dnsChanger from './dns-changer/dnsChanger';


export default combineReducers({
    sidebar,
    DnsChanger: dnsChanger,
});