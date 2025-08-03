
let scrollPosition = 0;
const carousel = document.getElementById("carousel");
const imageWidth = 200 + 10; // Image width + margin
const totalImages = document.querySelectorAll(".carousel img").length;
const maxScroll = -(imageWidth * (totalImages - 3)); // Adjust based on visible images

function updateCarousel() {
    carousel.style.transition = "transform 0.4s ease-out"; // Smooth transition
    carousel.style.transform = `translateX(${scrollPosition}px)`;
}

// **🖱 Smooth Mouse Wheel Scroll**
carousel.addEventListener("wheel", (event) => {
    event.preventDefault(); // Prevent page scroll

    scrollPosition -= event.deltaX * 0.5; // Adjust scrolling speed

    // Prevent over-scrolling
    if (scrollPosition > 0) scrollPosition = 0;
    if (scrollPosition < maxScroll) scrollPosition = maxScroll;

    updateCarousel();
});

$(document).ready(function () {
  $('#carousel img').on('click', function () {
    const $img = $(this);
    const imgIndex = $img.index();
    const existingBox = $(`#text-box-${imgIndex}`);

    if (existingBox.length) {
      existingBox.toggle();
    } else {
      const text = $img.data('text') || "No text provided";
      const offset = $img.offset();
      const boxWidth = 200;
      const boxHeight = 100;

      let boxTop, boxLeft;

      if (imgIndex === 2) {
        // 3rd image: above and centered horizontally
        boxTop = offset.top - boxHeight - 10;
        boxLeft = offset.left + ($img.width() / 2) - (boxWidth / 2);
      } else if (imgIndex === 3) {
        // 4th image: below and aligned to right edge
        boxTop = offset.top + $img.height() + 100;
        boxLeft = offset.left + $img.width() - 30;
      } else if (imgIndex === 5) {
        // 6th image: below and aligned to right edge
        boxTop = offset.top + $img.height() + 150;
        boxLeft = offset.left - $img.width();
      } else if (imgIndex === 6) {
        // 7th image: below and aligned to right edge
        boxTop = offset.top - boxHeight - 10;
        boxLeft = offset.left ;
      } else {
        // Default: below, left-aligned
        boxTop = offset.top + $img.height() + 10;
        boxLeft = offset.left;
      }

      const $box = $(`
        <div class="text-box" id="text-box-${imgIndex}">
          ${text}
        </div>
      `).appendTo('body');

      $box.css({
        top: boxTop,
        left: boxLeft
      });

      $box.draggable();
    }
  });
});


const toggle = document.getElementById("toggle-dropdown");
const dropdown = document.getElementById("dropdown");

toggle.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent this click from bubbling to the document
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  dropdown.style.display = "none";
});
