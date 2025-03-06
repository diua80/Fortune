import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
    start: document.querySelector(".js-start"),
    container: document.querySelector(".js-container"),
};
refs.start.addEventListener("click", startGame);

function startGame() {
    const promises = [...refs.container.children].map(() => createPromise());
    Promise.allSettled(promises).then((items) => {
        const isWinner =
            items.every(item => item.status === "fulfilled") ||
            items.every(item => item.status === "rejected");
        items.forEach((item, i) => {
            setTimeout(() => {
                refs.container.children[i].textContent = item.value || item.reason;
           }, 1000 * (i + 1))
        });
        console.log(isWinner);
    })
 }

function createPromise(){
    return new Promise((res, rej) => {
        const rand = Math.random();
        if (rand > 0.5) {
            res("🤑");
        } else {
            rej("😈");
        }
    })
}
