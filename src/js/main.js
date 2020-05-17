(function () {
    // SPINBUTTON
    const spinbutton = document.querySelector('.spinbutton');
    if (spinbutton) {
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
    }

    // SELECT CUSTOM
    let x, i, j, selElmnt, a, b, c;
    let selectBody = "custom-select__body";
    let selectActive = "custom-select--active";
    let selectDropdown = "custom-select__dropdown";
    let selectDropdownHide = selectDropdown + "--hide";
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        selElmnt.style.display = 'none';
        a = document.createElement("div");
        a.setAttribute("class", "uk-select " + selectBody);
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("div");
        b.setAttribute("class", selectDropdown + " " + selectDropdownHide);
        for (j = 0; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("div");
            if (selElmnt.options[j].getAttribute("selected") === "selected") {
                c.classList.add("checked");
            }
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("checked");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "checked");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle(selectDropdownHide);
            this.parentElement.classList.toggle(selectActive);
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName(selectDropdown);
        y = document.getElementsByClassName(selectBody);
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].parentElement.classList.remove(selectActive);
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add(selectDropdownHide);
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
})();
