import Dispatcher from './dispatcher'
import * as types from './action-types.js'

class Actions {
    dispatch(type, data = {}) {
        Dispatcher.dispatch(Object.assign({ type: type }, { data: data }))
    }

    cateogry() {
        this.dispatch(types.GET_CATEGORY);
    }

    format() {
        this.dispatch(types.GET_FORMAT);
    }
}
export default new Actions()