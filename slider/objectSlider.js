class Slider {
    constructor() {
        this.slides = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg', '6.jpg', '7.jpg'];
        this.activSlide = Math.floor(this.slides.length/2);
        this.oldActivSlide = this.activSlide;
    }

    init() {
        this.CreateRow();
        this.setSelector();
    }

    CreateRow() {     
        let right = document.getElementsByClassName('arrow-right');        
        for(let i = 0; i < this.slides.length; i++) {
            let slide = document.createElement('img');
            document.getElementById('container').insertBefore(slide, right[0])
            slide.setAttribute('src',this.slides[i]);
            slide.setAttribute('id',i);
        }
    };

    setSelector() {
        if (this.oldActivSlide != this.activSlide) {
            document.querySelector('.active').classList.remove('active');
        }
        document.getElementById(this.activSlide).setAttribute('class','active');
        this.setMain(this.slides[this.activSlide]);
    }
    setMain(image) {
        document.getElementById("dropBigImage").style.backgroundImage = "url("+image+")";
    }

    changeByClick(ev) {
        if ( ev.target.id == 'container') { //click on container
        } else {
            this.oldActivSlide = this.activSlide;
            if (ev.target.innerText == '<') {
                this.left();
            } else if (ev.target.innerText == '>') {
                this.right();
            } else {
                this.activSlide = ev.target.id; //click on picture
            }
            this.setSelector();
        }
    };

    left() {
        if (this.oldActivSlide === 0) {
            this.activSlide = this.slides.length;
        }
        --this.activSlide;   
    }

    right() {
        if (this.oldActivSlide === this.slides.length-1) {
            this.activSlide = -1;
        }
        ++this.activSlide;
    }
}

let slider = new Slider();
slider.init();
// setInterval(function() { // ставим пятисекундный интервал для перелистывания картинок
// 	slider.changeByClick(MouseEvent.target.className("arrow-right"));
// },50);