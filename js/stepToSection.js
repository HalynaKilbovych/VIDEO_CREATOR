document.querySelector('.scroll-button-down').addEventListener('click', function() {

    const nextSection = document.querySelector('.next-section');

    nextSection.scrollIntoView({ behavior: 'smooth' });

    });

document.querySelector('.scroll-button-up').addEventListener('click', function() {

   const nextSection = document.querySelector('.prev-section');

    nextSection.scrollIntoView({ behavior: 'smooth' });

    });

    document.querySelector('.scroll-button-down--desk').addEventListener('click', function() {

        const nextSection = document.querySelector('.next-section');
    
        nextSection.scrollIntoView({ behavior: 'smooth' });
    
        });
    
    document.querySelector('.scroll-button-up--desk').addEventListener('click', function() {
    
       const nextSection = document.querySelector('.prev-section');
    
        nextSection.scrollIntoView({ behavior: 'smooth' });
    
        });
        
