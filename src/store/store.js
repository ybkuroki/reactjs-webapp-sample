import EventEmitter from 'events'
import Dispatcher from './dispatcher'

import Ajax from 'lib/ajax.js'
import * as types from './action-types.js'

class Store extends EventEmitter {
  constructor(opts) {
    super(opts)
    this.categories = []
    this.formats = []
    this.dispatcherToken = Dispatcher.register(this.action.bind(this))
  }

  action(action) {
    switch (action.type) {
      case types.GET_CATEGORY:
        return this.category()
      case types.GET_FORMAT:
        return this.format()
    }
  }

  setCategory(datas) {
    this.categories = Array.from(datas).map((v) => v)
  }

  setFormat(datas) {
    this.formats = Array.from(datas).map((v) => v)
  }

  category() {
    var self = this;
    Ajax.get('/api/master/category',
      {},
      (body) => {
        self.setCategory(body)
        self.emit('success')
      })
  }

  format() {
    var self = this;
    Ajax.get('/api/master/format',
      {},
      (body) => {
        self.setFormat(body)
        self.emit('success')
      })
  }

  addSuccessListener(callback) {
    this.on('success', callback)
  }
  removeSuccessListener(callback) {
    this.removeListener('success', callback)
  }

  getCategory() {
    return this.categories
  }

  getFormat() {
    return this.formats
  }
}
export default new Store()