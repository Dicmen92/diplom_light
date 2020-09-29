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

export default togglePopup;

