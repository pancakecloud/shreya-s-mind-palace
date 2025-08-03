$(document).ready(function () {
  let scrollPosition = 0;
  const carousel = document.getElementById("carousel");
  const imageWidth = 200 + 10; // Image width + margin
  const totalImages = document.querySelectorAll(".carousel img").length;
  const maxScroll = -(imageWidth * (totalImages - 3)); // Adjust based on visible images

  function updateCarousel() {
    carousel.style.transition = "transform 0.4s ease-out"; // Smooth transition
    carousel.style.transform = `translateX(${scrollPosition}px)`;
  }

  // Smooth Mouse Wheel Scroll
  carousel.addEventListener("wheel", (event) => {
    event.preventDefault(); // Prevent page scroll

    scrollPosition -= event.deltaX * 0.5; // Adjust scrolling speed

    // Prevent over-scrolling
    if (scrollPosition > 0) scrollPosition = 0;
    if (scrollPosition < maxScroll) scrollPosition = maxScroll;

    updateCarousel();
  });

  // Click on images to toggle text boxes
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
      } else if (imgIndex === 4) {
        // 5th image: below and aligned to right edge
        boxTop = offset.top + $img.height() + 10;
        boxLeft = offset.left + $img.width() - boxWidth;
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
        position: 'absolute',
        top: boxTop,
        left: boxLeft,
        width: boxWidth,
        height: boxHeight,
        background: 'rgba(255,255,255,0.9)',
        border: '1px solid #ccc',
        padding: '10px',
        'box-sizing': 'border-box',
        'z-index': 10
      });

      $box.draggable();
    }
  });

  // Dropdown toggle
  const $toggle = $("#toggle-dropdown");
  const $dropdown = $("#dropdown");

  $toggle.on("click", function(event) {
    event.stopPropagation(); // Prevent click bubbling
    $dropdown.toggle();
  });

  // Close dropdown on clicking outside
  $(document).on("click", function () {
    $dropdown.hide();
  });
});
