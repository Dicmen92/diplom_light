const calc = () => {
  const accordion = document.getElementById('accordion'),            
      onoffSwitchOne = document.getElementById('myonoffswitch'),
      onoffSwitchTwo = document.getElementById('myonoffswitch-two'),
      twoWell = document.getElementById('two-well'),
      twoWellBox = document.getElementById('two-well-box'),
      twoWellBoxTwo = document.getElementById('two-well-box-two'),
      calcResult = document.getElementById('calc-result'),
      calcItem = document.getElementById('calc-item'),
      controlOne = document.getElementById('control-one'),
      controlTwo = document.getElementById('control-two'),
      controlThree = document.getElementById('control-three'),
      controlFour = document.getElementById('control-four'),
      discountBtn = document.getElementById('discount-btn'),
      popUp = document.querySelector('.popup-discount .capture-form');

          twoWell.style.display = 'none';
          twoWellBox.style.display = 'none';
          twoWellBoxTwo.style.display = 'none';
          calcResult.value = '10000'; 
     
      // Функция подсчета
      const countSum = () => {
          let total = 0,
              totam = 0,
              swithOne = 0,
              bottom = 0,
              valueControlOne = 0,
              valueControlTwo = 0,
              valueControlThree = 0,
              valueControlFour = 0;

              
          // Блок тип септика
          if(onoffSwitchOne.checked){
              swithOne += 10000;
              twoWell.style.display = 'none';
              twoWellBox.style.display = 'none';
              twoWellBoxTwo.style.display = 'none';   
          }else{
              swithOne += 15000;
              twoWell.style.display = 'inline-block';
              twoWellBox.style.display = 'inline-block';
              twoWellBoxTwo.style.display = 'inline-block'; 
          }
         
          //Блок первый колодец
        if(controlOne.value && controlOne.value == 2){
          valueControlOne += (swithOne * 0.2);
      }
      //Блок второй колодец
      if(controlTwo.value && controlTwo.value == 2){
          valueControlTwo += (valueControlOne + swithOne) * 0.3;              
      }else if(controlTwo.value && controlTwo.value == 3){
          valueControlTwo += (valueControlOne + swithOne) * 0.5;
      }
      //Блок третий колодец
      if(controlThree.value && controlThree.value == 2){
          valueControlThree += (swithOne / 100 )* 20;
      }
      //Блок четвертый колодец
      if(controlFour.value && controlFour.value == 2){
          valueControlFour += (swithOne / 100 )* 20;
      }else if(controlFour.value && controlFour.value == 3){
          valueControlFour += (swithOne / 100 )* 40;
      }
      
      //Блок днище колодца
      if(onoffSwitchTwo.checked && onoffSwitchOne.checked){
          totam = valueControlOne + valueControlTwo + swithOne;
          bottom += totam * 0.1;
      }else if(onoffSwitchTwo.checked && onoffSwitchOne.checked === false) {
        totam = valueControlOne + valueControlTwo + swithOne;
        bottom += totam * 0.2;
      }
      //Подсчет результата
      total =  valueControlOne + valueControlTwo + valueControlThree + valueControlFour + swithOne + bottom;

      //Вывод результата в input
      calcResult.value = total;  

      calcItem.addEventListener('input', function () {
          this.value = this.value.replace(/[^0-9\.]/, '');
      });
  };
         
  accordion.addEventListener('input', countSum);
  
  discountBtn.addEventListener('click', () => {
      
      popUp.classList.add('modal-calc');
       
  });    
};

export default calc;