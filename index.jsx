const view = count => {
  return <div className="container">123 <span>My Text</span></div>
}

const h = (type, props, ...children) => {

}

const createElement = node =>
  (typeof node === 'string') ? document.createTextNode(node) : document.createElement(node.type)


const render = el => {
  el.appendChild(createElement(view(0)))
}