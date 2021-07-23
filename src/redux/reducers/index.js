import { combineReducers } from 'redux';

import adapters from './adapter/adapters';
import adapterDns from './dns/adapter-dns';
import alerts from './base/alerts';
import savedDns from './saved-dns/saved-dns';

export default combineReducers({
    adapters,
    adapterDns,
    alerts,
    savedDns,
});