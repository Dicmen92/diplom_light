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

  export default addBtnLarger;

