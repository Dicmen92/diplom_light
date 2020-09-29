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
        directorInput = document.querySelector('.director-input'),
        calcResult = document.getElementById('calc-result'),
        onoffSwitchOne = document.getElementById('myonoffswitch'),
        onoffSwitchTwo = document.getElementById('myonoffswitch-two'),
        calcItem = document.getElementById('calc-item'),
        controlOne = document.getElementById('control-one'),
        controlTwo = document.getElementById('control-two'),
        controlThree = document.getElementById('control-three'),        
        controlFour = document.getElementById('control-four'),      
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
  let date = {};
  
  let target = event.target;
  if(target.classList.contains('modal-calc')){  
      date.controlOne = controlOne.value;
      date.controlTwo = controlTwo.value;
      date.controlThree = controlThree.value;
      date.controlFour = controlFour.value;
      date.calcResult = calcResult.value;
      date.onoffSwitchOne = onoffSwitchOne.value;
      date.onoffSwitchTwo = onoffSwitchTwo.value;
      date.calcItem = calcItem.value;         
  }
  
  formData.forEach((val, key) => {
    const directorInput = document.querySelector('.director-input');
    body[key] = val;
  
    if (directorInput.value !== '') {
      body[directorInput.getAttribute('name')] = directorInput.value;
    }
  
  });
  
  let obj = Object.assign(body, date);
  
  postData(obj).
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
  
  const postData = (obj) => { 
  return fetch('./server.php',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'          
    },
    body: JSON.stringify(obj)  
  });
  };
  
  });
  };

  export default sendForm;
