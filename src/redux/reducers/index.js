import { combineReducers } from 'redux';

import adapters from './adapter/adapters';
import adapterDns from './dns/adapter-dns';
import alerts from './base/alerts';

export default combineReducers({
    adapters,
    adapterDns,
    alerts,
});