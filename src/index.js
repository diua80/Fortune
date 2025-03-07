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
            
            refs.container.children[i].classList.remove("emojiSmile", "emojiDevil");

            setTimeout(() => {
                if (item.value) {
                    refs.container.children[i].classList.add("emojiSmile");
                } else {
                    refs.container.children[i].classList.add("emojiDevil");
                }
            if (i === items.length - 1) {
                const instance = basicLightbox.create(`
                    <h1 style="color: rgb(236, 166, 228); font-size: 72px;">
                    ${isWinner ? "Winner!" : "Looser!"}
                    </h1>`);
            instance.show();
        }
                // refs.container.children[i].textContent = item.value || item.reason;                                
            }, 1000 * (i + 1));
        });
           
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
