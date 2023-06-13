export class MouseTrailer{
    #sizeDefault = 20;
    constructor(){
        this.$trailer = null;
        this.$i = null;
        this.$text = null;

        this.icons = {
            arrow : "fa-solid fa-arrow-right",
            play : "fa-solid fa-play"
        }
    }//constructor

    /**
     * 🍒
     * 마우스 트레일러 작동 시작
     */
    init(){
        this.make_trailer();
        this.add_mouse_move();        
    }//init_mouse_move

    /**
     * 🍒
     * 마우스 트레일러 개체 만들기
     */
    make_trailer(){
        this.$trailer = document.createElement('DIV');
        this.$trailer.id = "trailer";
        this.$trailer.style.width = `${this.#sizeDefault}px`;
        this.$trailer.style.height = `${this.#sizeDefault}px`;

        this.$i = document.createElement('I');
        this.$trailer.appendChild(this.$i);

        this.$text = document.createElement('SPAN');
        this.$trailer.appendChild(this.$text);

        document.body.appendChild(this.$trailer);
    }

    /**
     * 🍒
     * 마우스 움직임 이벤트 추가
     * @url https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
     */
    add_mouse_move(){
        window.addEventListener('mousemove', e =>{
            const $interactable = e.target.closest(".interactable");
            const interacting = $interactable !== null;
            this.switch_i($interactable);
            this.animate_trailer(e, interacting);
        });
    }//add_mouse_move

    /**
     * 🍌
     * 커서의 위치와 크기를 조절하는 애니메이션
     * @param {Event} e 
     * @param {Boolean} interacting 
     * @url https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
     */
    animate_trailer(e,interacting){
        const {clientX, clientY} = e;

        const sizeHalf = this.$trailer.offsetWidth / (interacting ? 1.5 : 2);

        /* old way */
        // this.$trailer.style.transform = `translate(${clientX - sizeHalf}px, ${clientY - sizeHalf}px)`;
        
        // const keyframes = [{
        //     transform : `translate(
        //         ${clientX - sizeHalf}px, ${clientY - sizeHalf}px)
        //         scale(${interacting ? 8 : 1})
        //     `,
        // }];
        const keyframes = [{
            transform : `translate(${clientX - sizeHalf}px, ${clientY - sizeHalf}px)`,
            width : `${interacting ? this.#sizeDefault * 8 : this.#sizeDefault}px`,
            height : `${interacting ? this.#sizeDefault * 8 : this.#sizeDefault}px`,
        }];
        const options = {
            duration : 800,
            fill : "forwards"
        };
        this.$trailer.animate(keyframes,options);
    }//animate_trailer

    /**
     * 🍌 커서 안의 아이콘과 텍스트 내용을 바꿈
     * @param {DOM} $interactable e.target.closest(.interactable)
     */
    switch_i($interactable){
        const dataType = $interactable?.dataset?.type;
        let clssName = ""

        switch(dataType){
            case "link" : {
                clssName = this.icons.arrow;
                this.$text.textContent = "VISIT";
            }break;
            
            case "video" : {
                clssName = this.icons.play;
                this.$text.textContent = "WATCH";
            }break;
            
            default : {
                this.$text.textContent = "";
            }break;
        }//switch

        this.$i.className = clssName;
    }//switch_i
}//class-MouseTrailer