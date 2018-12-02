import Vue from 'vue'
import Vuex from 'vuex'
import footer from './modules/footer'

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
	modules: {
		footer,
	},
	// strict: debug,
	// plugins: debug ? [createLogger()] : [],
});
export default store;