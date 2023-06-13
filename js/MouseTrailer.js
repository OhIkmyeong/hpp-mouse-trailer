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

    init(){
        this.make_trailer();
        this.add_mouse_move();        
    }//init_mouse_move

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

    add_mouse_move(){
        window.addEventListener('mousemove', e =>{
            const interactable = e.target.closest(".interactable");
            const interacting = interactable !== null;
            this.switch_i(interactable);
            this.animate_trailer(e, interacting);
        });
    }//add_mouse_move

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

    switch_i(interactable){
        const dataType = interactable?.dataset?.type;
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
        }

        this.$i.className = clssName;
    }//switch_i
}//class-MouseTrailer