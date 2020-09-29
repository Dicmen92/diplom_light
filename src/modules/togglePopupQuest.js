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

export default togglePopupQuest;