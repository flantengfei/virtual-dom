const view = count => {
  return <div className="container">123
  <span>My Text</span>
    <div className='div1'>div1</div>
    <div className='div2'>div2</div>
    <div className='div3'>div3</div>
  </div>
}

const flatten = arr => [].concat.apply([], arr)

const h = (type, props, ...children) => {
  props = props || {}
  return { type, props, children }
}

const createElement = node => {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  }
  const el = document.createElement(node.type)
  node.children.map(createElement).forEach(
    element => {
      el.appendChild(element)
    }
  )
  return el
}


const render = el => {
  el.appendChild(createElement(view(0)))
}