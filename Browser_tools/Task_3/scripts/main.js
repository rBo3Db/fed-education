const history = window.history;
document.getElementById('historyPosition').innerHTML = history.length;

document.getElementById('history').addEventListener('click', function(e) {
    e.stopPropagation(); // останавливаем всплытие
    if (e.target.innerText == 'previos') {
        history.go(-1);
    }
    if (e.target.innerText == 'next') {
        history.go(+1);
    }
    ; // получаем и записываем содержимое элемента вызвавшего событие
  }, false);