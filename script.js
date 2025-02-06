// This script is embedded in the footer of every page

console.log('hello!')

let resumeH1 = document.getElementById('resume-title')
if(resumeH1) {
  let year = new Date().getFullYear()
  resumeH1.innerHTML = "Aaron-Gillespie-Résumé-" + year + ".txt"
}

function drop() {
  document.onmouseup = null
  document.onmousemove = null
}

function draggable(all, i) {
  let el = all[i]
  console.log('draggable', el)
  el.style.zIndex = i
  let maxZ = all.length - 1
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  el.onmousedown = bringToFront
  let dragbar = el.children[0]
  dragbar.onmousedown = handleDrag
  if(el.classList.contains('sticky')) {
    let closeBtn = dragbar.children[0]
    closeBtn.onmousedown = close
  } else {
    let closeBtn = dragbar.children[0].children[0]
    let miniBtn =  dragbar.children[0].children[1]
    closeBtn.onmousedown = close
    miniBtn.onmousedown = minimize
  }

  function handleDrag(e) {
    console.log('handle drag!')
    e = e || window.event
    e.preventDefault()
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = drop
    document.onmousemove = drag
  }

  function drag(e) {
    // console.log('drag!', el.offsetTop, e.clientY, el.offsetLeft, e.clientX)
    e = e || window.event
    e.preventDefault()
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    console.log('pos', pos1, pos2, pos3, pos4)
    pos3 = e.clientX
    pos4 = e.clientY
    el.style.top = (el.offsetTop - pos2) + "px"
    el.style.left = (el.offsetLeft - pos1) + "px"
  }

  function bringToFront() {
    for(let j = 0; j < all.length; j++) {
      if (all[j].style.zIndex > el.style.zIndex) {
        all[j].style.zIndex--
        all[j].classList.remove('front')
      }
    }
    el.style.zIndex = maxZ
    el.classList.add('front')
  }

  function close(e) {
    e.stopPropagation()
    console.log('close', e)
    el.parentNode.removeChild(el)
  }

  function minimize(e) {
    let tx = (window.innerWidth - el.offsetLeft)+ 'px'
    let ty = (window.innerHeight - el.offsetTop)+ 'px'
    el.style.transform = ` translateX(${tx}) translateY(${ty}) scale(0.01)`
  }

  function bigWindow() {
    console.log('bw!')
  }
}

let draggables = document.getElementsByClassName('draggable')
for(let z = 0; z < draggables.length; z++) {
  draggable(draggables, z)
}