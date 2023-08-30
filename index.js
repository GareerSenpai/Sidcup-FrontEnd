const crsr = document.querySelector(".cursor");
const blurCrsr = document.querySelector(".blur-cursor");
const navHeaders = Array.from(document.querySelectorAll(".nav span"));    // Page - 1
const navbar = document.querySelector(".nav");                // Page - 1
const logo = document.querySelector(".logo");

const cards = Array.from(document.querySelectorAll(".card"));             // All cards on the page

const reviews = document.querySelectorAll(".quote .review p");            // Page - 7
const footerH3 = document.querySelectorAll(".page-9 .topic-list h3");
const footerSpans = Array.from(document.querySelectorAll(".page-9 .footer-bottom span"));

const cursorChanger = Array.from(footerH3);
cursorChanger.push(document.querySelector(".page-9 .contacts h4"), ...navHeaders, ...cards, logo, ...footerSpans);

const foodImage1 = document.querySelector(".food-img.img-1")    // Page - 5
const foodImage2 = document.querySelector(".food-img.img-2")    // Page - 5
const foodImage3 = document.querySelector(".food-img.img-3")    // Page - 5

const button1 = document.querySelector(".buttons .btn-1");      // Page - 5
const button2 = document.querySelector(".buttons .btn-2");      // Page - 5
const button3 = document.querySelector(".buttons .btn-3");      // Page - 5

const buttons = [button1, button2, button3];
const foodImages = [foodImage1, foodImage2, foodImage3];
const buttonBorders = document.querySelectorAll(".btn-border");  // Page - 5

const food = document.querySelector(".page-5 .image");
let activeImage = 0;
// let nextImage = 1;

food.onpointerdown = function(e) {
  food.setPointerCapture(e.pointerId);
  const width = food.offsetWidth;
  const initialPos = e.clientX;

  food.onpointerup = function(e) {
    const finalPos = e.clientX;
    const percentage = (finalPos - initialPos) / width;

    if(percentage <= -0.5)   activeImage = activeImage + 1 >= 3 ? 0: activeImage + 1;
    else if (percentage >= 0.5) activeImage = activeImage - 1 < 0 ? 2 : activeImage - 1;

    foodImages.forEach((foodImage, index) => {
      foodImage.style.opacity = index === activeImage ? "1" : "0";
      buttons[index].style.backgroundColor = index === activeImage ? "#95C11E" : "#fff";
      buttonBorders[index].style.scale = index === activeImage ? "1.3" : "0";
    })
    foodImages[activeImage].style.opacity = 1;
  }
}

const reviewBox = document.querySelector(".page-7 .review");
const reviewList = Array.from(document.querySelectorAll(".page-7 .review p"));
let activeReview = 0;
// let nextReview = 1;

reviewBox.onpointerdown = function(e) {
  reviewBox.setPointerCapture(e.pointerId);
  const width = reviewBox.offsetWidth;
  const initialPos = e.clientX;

  reviewBox.onpointerup = function(e) {
    const finalPos = e.clientX;
    const percentage = (finalPos - initialPos) / width;

    if(percentage <= -0.5)   activeReview = activeReview + 1 >= 3 ? 0: activeReview + 1;
    else if (percentage >= 0.5) activeReview = activeReview - 1 < 0 ? 2 : activeReview - 1;

    reviewList.forEach((review, index) => {
      review.style.opacity = index === activeReview ? "1" : "0";
    })
    reviewList[activeReview].style.opacity = 1;
  }
}

function handleButtonClick(clickedIndex) {
  buttons.forEach((button, index) => {
    foodImages[index].style.opacity = index === clickedIndex ? "1" : "0";
    buttonBorders[index].style.scale = index === clickedIndex ? "1.3" : "0";
    button.style.backgroundColor = index === clickedIndex ? "#95C11E" : "#fff";
  });
  // food.setAttribute("src", foodImages[clickedIndex]);
}

buttons.forEach((button, index) => {
  button.onclick = () => handleButtonClick(index);
});

document.onmousemove = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const midX = window.innerWidth/2;
  const midY = window.innerHeight/2;
  crsr.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
  crsr.style.transition = "transform 150ms linear";
  blurCrsr.style.transform = `translate(${x - 130}px, ${y - 130}px)`;
  blurCrsr.style.transition = "transform 1000ms cubic-bezier(0.05, 0.03, 0.09, 0.32)";
  reviews.forEach((review) => review.style.transform = `translate(${(midX - x)/25}px, ${(midY - y)/25}px)`)
}

cursorChanger.forEach((element) => {
  element.onmouseenter = () => crsr.style.animation = "active 550ms forwards";
  element.onmouseleave = () => crsr.style.animation = "inactive 550ms forwards";
})

const page8Cards = Array.from(document.querySelectorAll(".page-8 .card"));
page8Cards.forEach((card) => {
  card.onmouseenter = () => document.querySelector(".page-8 .floating").style.webkitTextStroke = "1px #A1CD2B";
  card.onmouseleave = () => document.querySelector(".page-8 .floating").style.webkitTextStroke = "1px #fff";
})



/*  -------------- SCROLL ANIMATIONS ------------------ */

gsap.to(".nav", {
  backgroundColor: "#000",
  height: 100,
  paddingBottom: 80,
  paddingTop: 10,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".nav",
    scroller: ".main",
    // markers: true,
    start: "top -5%",
    end: "top 5",
    onEnter: () => document.querySelector(".nav").classList.add("nav-active"),
    onLeaveBack: () => document.querySelector(".nav").classList.remove("nav-active"),
    // toggleActions: "play none reverse"
    scrub: 1
  },
})

gsap.to(".main", {
  backgroundColor: "#000",
  // duration: 10,
  scrollTrigger: {
    trigger: ".main",
    scroller: ".main",
    // markers: true,
    start: "90 30",
    end: "90% 0",
    scrub: 1
  },
})

gsap.to(".left-dquote", {
  x: 25,
  y: 25,
  scrollTrigger: {
    trigger: ".left-dquote",
    scroller: ".main",
    // markers: true,
    start: "top bottom",
    end: "420 top",
    toggleActions: "play reverse restart reverse",
  }
})

gsap.to(".right-dquote", {
  x: -25,
  y: -25,
  scrollTrigger: {
    trigger: ".left-dquote",
    scroller: ".main",
    // markers: true,
    start: "top bottom",
    end: "420 top",
    toggleActions: "play reverse restart reverse",
              //onEnter  onLeave  onEnterBack  onLeaveBack
  }
})

gsap.to(".floating", {
  y: -100,
  scrollTrigger: {
    trigger: ".page-8",
    scroller: ".main",
    // markers: true,
    start: "top bottom",
    end: "100 bottom",
    toggleActions: "play none none reset",
  }
})