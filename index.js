function trigger(){
    var allAnimatedElements = document.querySelectorAll('.slide_anim');

    for(var i = 0 ; i < allAnimatedElements.length ; i++){
        var windowHt = window.innerHeight;
        var distFromTop = allAnimatedElements[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (distFromTop < windowHt - elementVisible){
            allAnimatedElements[i].classList.add('slide');
        }
        else{
            allAnimatedElements[i].classList.remove('slide');
        }
    }
}


function animate(){
    setTimeout(trigger, 1200);
}

window.addEventListener('scroll', animate);