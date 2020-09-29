const togglePopupDisc = () => {
  const discountBtn = document.querySelectorAll('.discount-btn'),
        popupDiscount = document.querySelector('.popup-discount'),
        popupDiscountForm = popupDiscount.querySelector('.capture-form');

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
        popupDiscountForm.classList.remove('modal-calc');
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

export default togglePopupDisc;