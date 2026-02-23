const orbit = document.querySelector(".orbit");
const dashes = document.querySelectorAll(".orbit-dash");

dashes.forEach(dash => {
  const angle = Math.random() * 360;
  const radius = 120 + Math.random() * 80;

  dash.style.left = "50%";
  dash.style.top = "50%";
  dash.style.transform =
    `rotate(${angle}deg) translateX(${radius}px)`;
});