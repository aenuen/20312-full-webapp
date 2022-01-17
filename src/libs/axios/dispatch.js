import { dispatchRequest } from './dispatchRequest'

class Dispatch {
  constructor (url) {
    this.url = url
  }

  use (todo, dataset) {
    const args = this.url[todo]
    if (!args) {
      throw new Error('参数正确，请检查API方法定义')
    }
    if (args.length > 2) {
      args.splice(-1, 1, dataset)
    } else {
      args.push(dataset)
    }
    return dispatchRequest.apply(this, args)
  }
}

export default Dispatch
