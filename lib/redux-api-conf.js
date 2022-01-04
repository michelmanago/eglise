import _ from 'lodash';
import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import { Provider, connect } from 'react-redux';

const API_URL = 'http://localhost:3000'

export default reduxApi({

	// Simple endpoint description
	//oneKitten: '/api/kittens/:id',

	// Complex endpoint description

    menus: {        // nom de l'action, du reducer du state redux
        url: "/api/get-content/menus/:language",
        options: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        	method: 'GET'
        }
    },


})

.use('fetch', adapterFetch(fetch))
.use('rootUrl', API_URL)

  