import {nextTick, onMounted, onUpdated, Ref} from "vue";

function checkBoxes(boxs: HTMLElement[]) {
    const triggerBottom = window.innerHeight / 5 * 4.5
    boxs.map(box => {
        const boxTop = box.getBoundingClientRect().top
        if (boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}


export function useScrollAnima(els: Ref<HTMLElement[]>) {
    window.addEventListener('scroll', () => {
        checkBoxes(els.value)
    })

    onUpdated(() => {
        checkBoxes(els.value)
    })
}

export function usePageScrollBottomEvent(el: Ref<HTMLElement>, cb: () => void) {
    onUpdated(() => {
        const dom = el.value
        el.value.addEventListener('scroll', function () {
            if (dom.scrollTop + dom.clientHeight >= dom.scrollHeight-3) {
                cb()
            }
        })
    })
}

export function usePageScrollAnima(container: Ref<HTMLElement>, els: Ref<HTMLElement[]>) {

    onUpdated(() => {
        checkBoxes(els.value)
        container.value.addEventListener('scroll', () => {
            checkBoxes(els.value)
        })
    })
}