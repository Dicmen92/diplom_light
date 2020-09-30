const constructorСalc = () =>{
  const panelGroup = document.querySelector('.constructor .panel-group'),
        constructBtn = panelGroup.querySelector('.construct-btn_button'),
        panelCollapse = panelGroup.querySelectorAll('.panel-collapse'),        
        panelDefault = panelGroup.querySelectorAll('.panel-default'),
        linkText = panelGroup.querySelectorAll('.link-text'), 
        popupDiscount =  document.querySelector('.popup-discount'),
        popUp = document.querySelector('.popup-discount .capture-form');
        
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
            //popUp.classList.remove('modal-calc');
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

        popupDiscount.addEventListener('click', () => {  
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
            item.addEventListener('click', () => {
              //event.preventDefault();                          
              let target = event.target; 
              if (target.classList.contains('construct-btn') &&
              popupDiscount.style.display !== 'block'){                               
                panelCollapse[i].classList.remove('in');           
                panelCollapse[i+1].classList.add('in');                              
              } 
              
              if (target.classList.contains('link-text')){
                panelCollapse[i].classList.add('in');                           
              }
              
              /*
              if (target.classList.contains('onoffswitch-inner') ||
              target.classList.contains('onoffswitch-switch')) {
                checkedInput.setAttribute('name') ;
                console.log('получается')
              }  
              */

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

export default constructorСalc;