// var slider = {
// 	slides:['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg', '6.jpg'],
// 	frame:0, // текущий кадр для отбражения - индекс картинки из массива
// 	set: function(image) { // установка нужного фона слайдеру
// 		document.getElementById("scr").style.backgroundImage = "url("+image+")";
// 	},
// 	init: function() { // запуск слайдера с картинкой с нулевым индексом
// 		this.set(this.slides[this.frame]);
// 		this.photoline();
// 	},
// 	left: function() { // крутим на один кадр влево
// 		this.frame--;
// 		if(this.frame < 0) this.frame = this.slides.length-1;
// 		this.set(this.slides[this.frame]);
// 	},
// 	right: function() { // крутим на один кадр вправо
// 		this.frame++;
// 		if(this.frame == this.slides.length) this.frame = 0;
// 		this.set(this.slides[this.frame]);		
// 	},
	
// };
// window.onload = function() { // запуск слайдера после загрузки документа
// 	slider.init();
// 	setInterval(function() { // ставим пятисекундный интервал для перелистывания картинок
// 		slider.right();
// 	},5000);
// };


///////////////////////////////////////////////////////////////////////////////////////////////

let bigEmg = document.querySelector('.dropBigImage img'),
    arrSmallImg = document.querySelectorAll('.container img'),
    arrowLeft = document.querySelector('.arrow-left'),
    arrowRight = document.querySelector('.arrow-right');


function clickOnImage() {
    for(let i = 0; i < arrSmallImg.length; i++) {

        arrSmallImg[i].onclick = function() {
            let active = document.querySelector('.active');
            active.classList.remove('active');
            arrSmallImg[i].classList.add('active');
            bigImg();
        };
    }
};

function bigImg() {
    let act = document.querySelector('.active');
    let srcImg = act.getAttribute('src');
    bigEmg.setAttribute('src', srcImg);
};

function clickOnArrowLeft() {
    arrowLeft.onclick = function() {
        let active = document.querySelector('.active');
        if(active.previousElementSibling.previousElementSibling === null) {
           active.classList.remove('active');  
           let prev = arrSmallImg[arrSmallImg.length - 1];
           prev.classList.add('active');
        } else {
            active.classList.remove('active');

            let prev = active.previousElementSibling;
            prev.classList.add('active');            
        }
        bigImg();
    };
};

function clickOnArrowRight() {
    arrowRight.onclick = function() {
        let active = document.querySelector('.active');
        if(active.nextElementSibling.nextElementSibling === null) {
            active.classList.remove('active');
            let next = arrSmallImg[0];
            next.classList.add('active');
        } else {
            active.classList.remove('active');
            let next = active.nextElementSibling;
            next.classList.add('active');
        }
        bigImg();
    };
};


clickOnImage();
bigImg();
clickOnArrowLeft();
clickOnArrowRight();

