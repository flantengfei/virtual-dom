const flatten = arr => [].concat.apply([], arr)

const h = (type, props, ...children) => {
  props = props || {}
  return { type, props, children }
}

const setProp = (target, name, value) => {
  if (name === 'className') {
    return target.setAttribute('class', value)
  }
  target.setAttribute(name, value)
}

const setProps = (target, props) => {
  if (props) {
    Object.entries(props).forEach(
      ([name, value]) => {
        setProp(target, name, value)
      }
    )
  }
}

const createElement = node => {
  if (typeof node === 'string') {
    return document.createTextNode(node)
  }
  const el = document.createElement(node.type)
  setProps(el, node.props)

  if (node.children) {
    node.children.map(createElement).forEach(
      element => {
        el.appendChild(element)
      }
    )
  }
  return el
}

const changed = (node1, node2) => {
  return typeof node1 !== typeof node2 || 
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}

const diffChildren = (newNode, oldNode) => {
  const patches = []
  const patchesLength = Math.max(
    newNode.children.length,
    oldNode.children.length
  )
  for (let i = 0; i < patchesLength; i++) {
    patches[i] = diff(newNode.children[i], oldNode.children[i])
  }
  return patches
}

const diff = (newNode, oldNode) => {
  if (!oldNode) {
    return {type: 'CREATE', newNode}
  }
  if (!newNode) {
    return {type: 'REMOVE'}
  }
  if (changed(newNode, oldNode)) {
    return {type: 'REPLACE', newNode}
  }
  if (newNode.type) {
    return {
      type: 'UPDATE', 
      children: diffChildren(newNode, oldNode),
    }
  }
}

const patche = (parent, patches, index = 0) => {
  if (!patches) { return }
  const el = parent.childNodes[index]
  switch (patches.type) {
    case 'CREATE': {
      const { newNode } = patches
      const newEl = createElement(newNode)
      return parent.appendChild(newEl)
    }
    case 'REMOVE': {
      return parent.removeChild(el)
    }
    case 'REPLACE': {
      const { newNode } = patches
      const newEl = createElement(newNode)
      return parent.replaceChild(newEl, el)
    }
    case 'UPDATE': {

    }
  }
}

const view = count => {
  const r = [...Array(count).keys()]
  return <ul id="cool" className={`my-class-${count % 3}`}>
  { r.map(n => <li>item {(count * n).toString()}</li>) }
  </ul>
}

const tick = (el, count) => {
  const patches = diff(view(count + 1), view(count))
  patche(el, patches)
  console.log(count, patches)
  if(count > 20) {
    return
  }
  setTimeout(() => tick(el, count + 1), 500)
}

const render = el => {
  el.appendChild(createElement(view(0)))
  setTimeout(() => tick(el, 0), 500)
}