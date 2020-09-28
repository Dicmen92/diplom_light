//popup "Как к вам обращаться"

const togglePopup = () => {
  const popup = document.querySelector('.popup-call'),
  popupBtn = document.querySelectorAll('.contacts .call-btn');

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
  animateFuncOpen();

  if (window.innerWidth <= 768) {
    animateFuncClose();
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

const mainForm = document.querySelector('main .main-form'),
      captureForm = document.querySelector('.section-form .capture-form'),
      popupPontent = document.querySelector('.popup-content .capture-form'),
      popupСall = document.querySelector('.popup-call .capture-form'),
      popupConsultation = document.querySelector('.popup-consultation .capture-form'),
      popupCheck = document.querySelector('.popup-check .capture-form'),
      popupDiscount = document.querySelector('.popup-discount .capture-form'),      
      directorForm = document.querySelector('.director-form'),
      directorInput = document.querySelector('.director-input');
      
      forms = [];

forms.push(mainForm, captureForm, popupPontent, popupСall, popupConsultation, popupCheck, popupDiscount, directorForm);

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
    } else if (elem.classList.contains('director-input')){          
      elem.value = elem.value.replace(/[^А-Я0-9\s,\.!?;:=#$%№()-]/gi, "");          
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
  const directorInput = document.querySelector('.director-input');
  body[key] = val;
  if (directorInput.value !== '') {
    body[directorInput.getAttribute('name')] = directorInput.value;
  }
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
  setTimeout(() => statusMessage.textContent = '', 3000)
  }     
  
  input.forEach((item) => {
    item.value = "";
    setTimeout(() => statusMessage.textContent = '', 3000);
    directorInput.value = '';
  });  
})

.catch((error) => {
  statusMessage.textContent = errorMessage;
  setTimeout(() => statusMessage.textContent = '', 3000);
  directorInput.value = '';
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
      }, 200);          
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
        }, 200);                  
          panelHeading[i].classList.add('collapsed');
          panelTitle[i].classList.add('collapsed');
          panelAlink[i].classList.add('collapsed');
        
        }            
        
      }         
      
    })
  }
};

collapseQuestion();

//кнопка "Больше..."

const addBtnLarger = () => {
const addSentenceBtn = document.querySelector('.add-sentence-btn'),
      hiddenBlock = document.querySelectorAll('.hidden-block');


  addSentenceBtn.addEventListener('click', () => {
    addSentenceBtn.style.display = 'none';
    hiddenBlock.forEach((item,) => {
      if (item.classList.contains('hidden-block')){
        item.classList.remove('hidden');
        item.classList.remove('visible-sm-block');
      }
    });

  });   
};

  addBtnLarger();

  //кнопка "Заказать со скидкой", "Узнать цену со скидкой"

  const togglePopupDisc = () => {
    const discountBtn = document.querySelectorAll('.discount-btn'),
          popupDiscount = document.querySelector('.popup-discount');

    //-----popup анимация-----

    let animateOpen, 
      animateClose,
      count = 0;   

      const animateFuncOpen = () => {
        animateOpen = requestAnimationFrame(animateFuncOpen);
        count += 0.05;
        if (count < 1) {
          popupDiscount.style.opacity = count;
        } else {
          cancelAnimationFrame(animateOpen);
        }
      };

      const animateFuncClose = () => {
        animateClose = requestAnimationFrame(animateFuncClose);
        count -= 0.05;
        if (count >= 0) {
          popupDiscount.style.opacity = count;
        } else {
          cancelAnimationFrame(animateClose);
          popupDiscount.style.display = 'none';
        }
      };

    //-----конец popup анимации-----   
           
      discountBtn.forEach((item) => {
        item.addEventListener('click', (elem) => { 
        if (item.classList.contains('discount-btn')){          
          event.preventDefault();      
          popupDiscount.style.display = 'block';
          animateFuncOpen();

          if (window.innerWidth <= 768) {
            animateFuncClose();
            popupDiscount.style.opacity = 1;        
          }
        }
      });  
    });

    popupDiscount.addEventListener('click', (event) => {    
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

  togglePopupDisc();

  //кнопка "Получить чек-лист и скидку"  Закажите бесп.замер

  const togglePopupCheck = () => {
    const checkBtn = document.querySelector('.check-btn'),
          popupCheck = document.querySelector('.popup-check');

    //-----popup анимация-----

    let animateOpen, 
        animateClose,
        count = 0;   

      const animateFuncOpen = () => {
        animateOpen = requestAnimationFrame(animateFuncOpen);
        count += 0.05;
        if (count < 1) {
          popupCheck.style.opacity = count;
        } else {
          cancelAnimationFrame(animateOpen);
        }
      };

      const animateFuncClose = () => {
        animateClose = requestAnimationFrame(animateFuncClose);
        count -= 0.05;
        if (count >= 0) {
          popupCheck.style.opacity = count;
        } else {
          cancelAnimationFrame(animateClose);
          popupCheck.style.display = 'none';
        }
      };

    //-----конец popup анимации-----              
        
        checkBtn.addEventListener('click', (item) => { 
                 
          event.preventDefault();      
          popupCheck.style.display = 'block';
          animateFuncOpen();

          if (window.innerWidth <= 768) {
            animateFuncClose();
            popupCheck.style.opacity = 1;        
          }
        
      });    

    popupCheck.addEventListener('click', (event) => {    
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

  togglePopupCheck();

  //кнопка "Получить консультацию" Остались вопросы

  const togglePopupQuest = () => {
    const directorBtn = document.querySelector('.director-btn'),
    popupConsultation = document.querySelector('.popup-consultation');

    //-----popup анимация-----

    let animateOpen, 
        animateClose,
        count = 0;   

      const animateFuncOpen = () => {
        animateOpen = requestAnimationFrame(animateFuncOpen);
        count += 0.05;
        if (count < 1) {
          popupConsultation.style.opacity = count;
        } else {
          cancelAnimationFrame(animateOpen);
        }
      };

      const animateFuncClose = () => {
        animateClose = requestAnimationFrame(animateFuncClose);
        count -= 0.05;
        if (count >= 0) {
          popupConsultation.style.opacity = count;
        } else {
          cancelAnimationFrame(animateClose);
          popupConsultation.style.display = 'none';
        }
      };

    //-----конец popup анимации-----              
        
      directorBtn.addEventListener('click', (item) => {

          event.preventDefault();      
          popupConsultation.style.display = 'block';
          animateFuncOpen();

          if (window.innerWidth <= 768) {
            animateFuncClose();
            popupConsultation.style.opacity = 1;        
          }
        
      });    

      popupConsultation.addEventListener('click', (event) => {    
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

  togglePopupQuest();

  //конструктор-калькулятор в виде аккордеона

const constructorСalc = () =>{
  const panelGroup = document.querySelector('.constructor .panel-group'),
        constructBtn = panelGroup.querySelector('.construct-btn_button'),
        panelCollapse = panelGroup.querySelectorAll('.panel-collapse'),        
        panelDefault = panelGroup.querySelectorAll('.panel-default'),
        linkText = panelGroup.querySelectorAll('.link-text'), 
        popupDiscount =  document.querySelector('.popup-discount');
        
        //-----popup анимация-----

        let animateOpen, 
        animateClose,
        count = 0;     
        const animateFuncOpen = () => {
          animateOpen = requestAnimationFrame(animateFuncOpen);    
          count += 0.05;
          if (count < 1) {
            popupDiscount.style.opacity = count;
          } else {
            cancelAnimationFrame(animateOpen);
          }
        };

        const animateFuncClose = () => {
          animateClose = requestAnimationFrame(animateFuncClose);
          count -= 0.05;
          if (count >= 0) {
            popupDiscount.style.opacity = count;
          } else {
            cancelAnimationFrame(animateClose);
            popupDiscount.style.display = 'none';
          }
        };

        //-----конец popup анимации-----

        
        constructBtn.addEventListener('click', () => {  
        event.preventDefault();      
        popupDiscount.style.display = 'block';
        panelCollapse[panelDefault.length-1].classList.remove('in');
        panelCollapse[0].classList.add('in');
        animateFuncOpen();

        if (window.innerWidth <= 768) {
          animateFuncClose();
          popupDiscount.style.opacity = 1;        
        }
        })        

        popupDiscount.addEventListener('click', (event) => {  
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
          
          panelDefault.forEach((item, i) => {            
            item.addEventListener('click', (event) => {
                            
              let target = event.target;
              if (target.classList.contains('construct-btn') &&
              popupDiscount.style.display !== 'block'){                               
                panelCollapse[i].classList.remove('in');           
                panelCollapse[i+1].classList.add('in');                              
              } 
              
              if (target.classList.contains('link-text')){
                panelCollapse[i].classList.add('in');                                
              }              
            })
            item.addEventListener('mouseup', () => {                            
              linkText.forEach((item, i) => { 
                let target = event.target;
                if (!target.classList.contains('link-text')){
                                                      
                } else {
                  panelCollapse[i].classList.remove('in');
                }
              })
              
            })
            
          });         

      };
  
  constructorСalc();