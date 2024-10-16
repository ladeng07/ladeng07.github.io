

const bk = document.querySelector('#web_bg')



function throttle(fn, delay) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            fn.apply(this, args)
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
            }, delay);
        }
    }
}


function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay);
    }
}

var isScrolling = false

function handlerScroll() {
    if(!isScrolling){
        bk.style.filter = 'blur(3px)'
        isScrolling = true
    }

}

function removeBlur(){
    bk.style.filter = 'blur(0)'
    isScrolling = false
}
    
document.addEventListener('scroll', debounce(removeBlur, 500))
document.addEventListener('scroll', throttle(handlerScroll, 400))