const collapseQuestion = () =>{
  const panel = document.querySelectorAll('.questions .panel-default'),
    panelHeading = document.querySelectorAll('.questions .panel-heading'),
    panelTitle = document.querySelectorAll('.questions .panel-title'),
    panelAlink = document.querySelectorAll('.questions a'),      
    panelCollapse = document.querySelectorAll('.questions .panel-collapse');  
  
    for (let i = 0; i < panel.length; i++) {        
      panelHeading[i].addEventListener('click', (event) => {
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
      panelHeading[i].addEventListener('mouseup', (event) => { 
        event.preventDefault();       
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

  export default collapseQuestion;
