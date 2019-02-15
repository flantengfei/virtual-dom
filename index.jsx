const view = count => {
  return <div className="container">123 <span>My Text</span></div>
}

const flatten = arr => [].concat.apply([], arr)

const h = (type, props, ...children) => {
  props = props || {}
  return {type, props, children: flatten(children)}
}

const createElement = node =>
  (typeof node === 'string') ? document.createTextNode(node) : document.createElement(node.type)


const render = el => {
  el.appendChild(createElement(view(0)))
}