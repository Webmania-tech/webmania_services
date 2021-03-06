/* Main Nav Animation on Mobile */
// Hamburger Animation
const hamburger = document.querySelector(".nav-toggle");
const body = document.body;
const html = document.documentElement;
const navLinks = document.querySelector(".main-nav");
const links = document.querySelectorAll(".main-nav div");
hamburger.addEventListener("click", () => {
  //Animate Links
  navLinks.classList.toggle("open");
  body.classList.toggle("overflow-hidden");
  html.classList.toggle("overflow-hidden");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
  //Hamburger Animation
  hamburger.classList.toggle("active-toggle");
});



/* Case studies carousel */
// Large carousel
$('.owl-carousel-lg').owlCarousel({
  loop:false,
  stagePadding: 15,
  margin:15,
  nav:true,
  navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
  responsive:{
      0:{
          items:1
      },
    600:{
          items: 2
      },
      1200:{
          items:3
      }
  }
})
// Small Carousel
$('.owl-carousel-sm').owlCarousel({
  loop:false,
  stagePadding: 15,
  margin:15,
  nav:true,
  navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
  responsive:{
      0:{
          items:1
      },
      600:{
        items: 1
    },
    1200:{
        items:1
    }
  }
})
// Carousel keyboard
jQuery(document.documentElement).keyup(function (event) {    

  var owl = jQuery(".owl-carousel-lg", ".owl-carousel-sm");

  // handle cursor keys
  if (event.keyCode == 37) {
     // go left
     owl.trigger('owl.prev');
  } else if (event.keyCode == 39) {
     // go right
     owl.trigger('owl.next');
  }

});


/* Case studies hover */
$(document).ready(function(){
	// Show zoom link on Mouseover
	$('.case-study-card').hover(function(){
			$(this).addClass('animate');
		 }, function(){
			$(this).removeClass('animate');			
	});	
});


/* Case studies modals */
const focusableSelector = "button, a, input, textarea";
let modal = null,
focusables = [],
previouslyFocusedElement = null;
const openModal = async function (e) {
    e.preventDefault();
    const o = e.target.getAttribute("href");
    (modal = o.startsWith("#")
    ? document.querySelector(o)
    : await loadModal(o)),
    (focusables = Array.from(
        modal.querySelectorAll(focusableSelector)
    )),
    (previouslyFocusedElement = document.querySelector(":focus")),
    (modal.style.display = null),
    focusables[0].focus(),
    modal.removeAttribute("aria-hidden"),
    modal.setAttribute("aria-modal", "true"),
    modal.addEventListener("click", closeModal),
    modal
        .querySelector(".js-modal-close")
        .addEventListener("click", closeModal),
    modal
        .querySelector(".js-modal-stop")
        .addEventListener("click", stopPropagation);
},
closeModal = function (e) {
    if (null === modal) return;
    null !== previouslyFocusedElement && previouslyFocusedElement.focus(),
    e.preventDefault(),
    modal.setAttribute("aria-hidden", "true"),
    modal.removeAttribute("aria-modal"),
    modal.removeEventListener("click", closeModal),
    modal
        .querySelector(".js-modal-close")
        .removeEventListener("click", closeModal),
    modal
        .querySelector(".js-modal-stop")
        .removeEventListener("click", stopPropagation);
    const o = function () {
    (modal.style.display = "none"),
        modal.removeEventListener("animationend", o),
        (modal = null);
    };
    modal.addEventListener("animationend", o);
},
stopPropagation = function (e) {
    e.stopPropagation();
},
focusInModal = function (e) {
    e.preventDefault();
    let o = focusables.findIndex(
    (e) => e === modal.querySelector(":focus")
    );
    !0 === e.shiftKey ? o-- : o++,
    o >= focusables.length && (o = 0),
    o < 0 && (o = focusables.length - 1),
    focusables[o].focus();
},
loadModal = async function (e) {
    const o = "#" + e.split("#")[1],
    t = document.querySelector(o);
    if (null !== t) return t;
    const l = await fetch(e).then((e) => e.text()),
    a = document
        .createRange()
        .createContextualFragment(l)
        .querySelector(o);
    if (null === a)
    throw `L'??l??ment ${o} n'a pas ??t?? trouv?? dans la page ${e}`;
    return document.body.append(a), a;
};
document.querySelectorAll(".js-modal").forEach((e) => {
e.addEventListener("click", openModal);
}),
window.addEventListener("keydown", function (e) {
    ("Escape" !== e.key && "Esc" !== e.key) || closeModal(e),
    "Tab" === e.key && null !== modal && focusInModal(e);
});


/* Blog filters */
filterSelection("all"); // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("blog-card");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}
// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}
// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("filters");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
