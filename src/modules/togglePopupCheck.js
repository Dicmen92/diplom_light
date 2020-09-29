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

export default togglePopupCheck;