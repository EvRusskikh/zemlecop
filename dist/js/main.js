(function () {
    const spinbutton = document.querySelector('.spinbutton');
    const spinbuttonInput = spinbutton.querySelector('input');
    spinbutton.querySelectorAll('button').forEach(item => {
        item.addEventListener('click',()=>{
            let label = item.getAttribute('aria-label');
            if (label === 'next') {
                spinbuttonInput.value ++;
            } else if (label === 'prev' && spinbuttonInput.value > 0) {
                spinbuttonInput.value --;
            }
        });
    });
})();
