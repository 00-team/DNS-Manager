import { combineReducers } from 'redux';

import sidebar from './sidebar/sidebar';

// Main
import dnsChanger from './dns-changer/dnsChanger';
import dnsDatabase from './dns-database/dnsDatabase';
import settings from './settings/settings';


export default combineReducers({
    sidebar,
    DnsChanger: dnsChanger,
    DnsDatabase: dnsDatabase,
    Settings: settings
});