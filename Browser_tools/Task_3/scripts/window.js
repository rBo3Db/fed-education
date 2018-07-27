const createWindowForm = document.forms['create-new-window'];

createWindowForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let width = createWindowForm.elements["height"].value
  let height = createWindowForm.elements["width"].value;
  width = "width="+width;
  height = "height="+height;
  let size = width +','+ height;

  var newWin = window.open('newWindow.html', 'example', size);
  // newWin.onload = function content() {
  //   console.log('aaaaa');
  //   var div = newWin.document.createElement('div');
  //   body = newWin.document.body;
  
  //   div.innerHTML = 'Добро пожаловать!';
  //   div.style.fontSize = '30px';
    
  //   }
  //   body.insertBefore(div, body.firstChild);
  }
);


// вставить первым элементом в body нового окна
