
var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove",function(dets){
    crsr.style.left = dets.x + 20+"px"
    crsr.style.top = dets.y + 20+"px"
})
gsap.from(".nav",{
  y:-100,
  duration:.5,
  delay:0.2,
  opacity:0,
  filter:("blur 8px")
})
gsap.from(".center",{
  x:-100,
  duration:0.5,
  opacity:0,
  filter:("blur 8px")
})
gsap.from("h1 samp",{
  y:100,
  duration:0.5,
  delay:.3,
  opacity:0,
  filter:("blur 8px")
})
const card = document.querySelector(".card");
const glare = document.querySelector(".glare");

let cachedCardDomRect = null;

card.onmouseenter = (e) =>
  (cachedCardDomRect = e.target.getBoundingClientRect());

card.onmouseleave = (e) => {
  card.animate(
    { transform: "rotateX(0deg) rotateY(0deg)" },
    { duration: 10, fill: "forwards", delay: 5 }
  );
};

card.onmousemove = (e) => {
  if (!cachedCardDomRect) return;

  let xCoord = e.clientX - cachedCardDomRect.left;
  let yCoord = e.clientY - cachedCardDomRect.top;
  let xDegreesToRotate = (2 - 2 * (yCoord / cachedCardDomRect.height)) * -1;
  let yDegreesToRotate = 2 - 2 * (xCoord / cachedCardDomRect.width);

  card.animate(
    {
      transform: `rotateX(${xDegreesToRotate}deg) rotateY(${yDegreesToRotate}deg)`
    },
    { duration: 50, fill: "forwards", delay: 5 }
  );

  glare.animate(
    {
      transform: `translateX(${xCoord - 10}px) translateY(${yCoord - 10}px)`
    },
    { duration: 10, fill: "forwards" }
  );
};
gsap.from(".container",{
  scale:0,
  opacity:0,
  duration:0.5,
  filter:("blur 10px")
})


// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
gsap.to(".main",{
  backgroundColor:"#2E1832",
  
  scrollTrigger:{
      trigger:".center",
      scroller:".main",

      start:"top 0%",
      end:"top -95%",
     
   
      scrub:5
  }
})

gsap.from(".samp",{
 y:100,
 opacity:0,
 filter:("blur 8px"),
  
  scrollTrigger:{
      trigger:"samp",
      scroller:".main",

      start:"top 10%",
      end:"top 5%",
     
   
      scrub:5
  }
})
gsap.from(".slider",{
 scale:0,
 opacity:0,
  
  scrollTrigger:{
      trigger:"samp",
      scroller:".main",

      start:"top 10%",
      end:"top 5%",
     
   
      scrub:5
  }
})
let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthitems = items.length - 1;

next.onclick = function() {
    if (active + 1 > lengthitems) {
        active = 0;
    } else {
        active = active + 1;
    }
    reloadslider();
}

prev.onclick = function() {
    if (active - 1 < 0) {
        active = lengthitems;
    } else {
        active = active - 1;
    }
    reloadslider();
}

let autoslide = setInterval(() => { next.click(); }, 3000);

function reloadslider() {
    let checkleft = items[active].offsetLeft;
    list.style.left = -checkleft + 'px';

    let lastactiveDot = document.querySelector('.slider .dots li.active');
    if (lastactiveDot) lastactiveDot.classList.remove('active');
    dots[active].classList.add('active');
}

dots.forEach((li, key) => {
    li.addEventListener('click', function() {
        active = key;
        reloadslider();
    })
})

