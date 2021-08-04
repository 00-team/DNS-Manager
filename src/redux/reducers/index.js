import { combineReducers } from 'redux';

import sidebar from './sidebar/sidebar';

// Main
import dnsChanger from './dns-changer/dnsChanger';
import dnsDatabase from './dns-database/dnsDatabase';
import settings from './settings/settings';

// base
import alerts from './base/alerts'

export default combineReducers({
    sidebar,
    alerts,
    DnsChanger: dnsChanger,
    DnsDatabase: dnsDatabase,
    Settings: settings
});