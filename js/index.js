//popup "Как к вам обращаться"

const togglePopup = () => {
      const popup = document.querySelector('.popup-call'),
      popupBtn = document.querySelectorAll('.call-btn');

  //-----popup анимация-----

  let animateOpen, 
      animateClose,
      count = 0;   

      const animateFuncOpen = () => {
        animateOpen = requestAnimationFrame(animateFuncOpen);
        count += 0.05;
        if (count < 1) {
          popup.style.opacity = count;
        } else {
          cancelAnimationFrame(animateOpen);
        }
      };

      const animateFuncClose = () => {
        animateClose = requestAnimationFrame(animateFuncClose);
        count -= 0.05;
        if (count >= 0) {
          popup.style.opacity = count;
        } else {
          cancelAnimationFrame(animateClose);
          popup.style.display = 'none';
        }
      };

  //-----конец popup анимации-----

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      event.preventDefault();      
      popup.style.display = 'block';
      animateOpen = requestAnimationFrame(animateFuncOpen);

      if (window.innerWidth <= 768) {
        cancelAnimationFrame(animateClose); 
        popup.style.opacity = 1;        
      }
    })
  });


  
  popup.addEventListener('click', (event) => {    
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      animateClose = requestAnimationFrame(animateFuncClose);      
    } else {
      target = target.closest('.popup-content');  //возвращает ближайшего предка

      if (!target) {
        animateClose = requestAnimationFrame(animateFuncClose);
      }
    }
  })

};

togglePopup();


//send-ajax-form 

const sendForm = () => {
  const errorMessage = 'ошибка',
        loadMessage = 'идёт отправка',
        successMessage = 'отправлено';

  const mainForm = document.querySelector('.main-form'),
        captureForm = document.querySelector('.capture-form'),
        forms = [];

  forms.push(mainForm, captureForm);

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem;
                                 color: red;`;

  forms.forEach((item) => {
    let input = item.querySelectorAll('input');
    [...input].forEach((elem) => {
      elem.addEventListener('input', () => {
        if (elem.classList.contains('phone-user')) {
          elem.setAttribute('maxlength', 12);
          elem.value = elem.value.replace(/[^\+\d]/g, "");          
        } else {          
          elem.value = elem.value.replace(/[^А-Я]/gi, "");
        }
      })
    })  

  item.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = item.querySelectorAll('input');
    item.append(statusMessage);
    statusMessage.textContent = loadMessage;

    const formData = new FormData(item);
    let body = {};

    formData.forEach((val, key) => {
      body[key] = val;
    });

    postData(body).
    then((response) => {
      if (response.status !== 200){
        input.forEach((item) => {
          item.value = "";
        });
        throw new Error('status network not 200');              
      }
      statusMessage.textContent = successMessage;
      if (item.classList === 'main-form' || item.classList === 'capture-form') {
      setTimeout(() => statusMessage.textContent = '', 2000)
      }     
      
      input.forEach((item) => {
        item.value = "";
      });
    })

    .catch((error) => {
      statusMessage.textContent = errorMessage;
      setTimeout(() => statusMessage.textContent = '', 4000)
      console.error(error);
    });
  });

  const postData = (body) => {
    return fetch('./server.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'          
      },
      body: JSON.stringify(body)
    });
  };

});
};

sendForm();

//аккордеон (часто задаваемые вопросы)

const collapseQuestion = () =>{
const panel = document.querySelectorAll('.questions .panel-default'),
      panelHeading = document.querySelectorAll('.questions .panel-heading'),
      panelTitle = document.querySelectorAll('.questions .panel-title'),
      panelAlink = document.querySelectorAll('.questions a'),      
      panelCollapse = document.querySelectorAll('.questions .panel-collapse');


      for (let i = 0; i < panel.length; i++) {        
        panelHeading[i].addEventListener('click', () => {
          event.preventDefault();    
          let target = event.target;          
          if (target.classList.contains('collapsed')) {
            setTimeout(() => {
            panelCollapse[i].classList.add('in');  
          }, 300);         
            panelHeading[i].classList.remove('collapsed');
            panelTitle[i].classList.remove('collapsed');
            panelAlink[i].classList.remove('collapsed');                    

          }        
        })        
      }
      
      for (let i = 0; i  < panel.length; i++) {
        panelHeading[i].addEventListener('mouseup', () => {          
          for (let i = 0; i < panel.length; i++) { 
            if (!panelHeading[i].classList.contains('collapsed')) {
              setTimeout(() => {
              panelCollapse[i].classList.remove('in'); 
            }, 300);           
              panelHeading[i].classList.add('collapsed');
              panelTitle[i].classList.add('collapsed');
              panelAlink[i].classList.add('collapsed');
            
            }            
            
          }         
          
        })
      }
    };

    collapseQuestion();