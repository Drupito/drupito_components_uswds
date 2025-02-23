(function (Drupal, once) {
  Drupal.behaviors.accordionState = {
    attach(context) {
      // Target only accordions with "remember-state" to persist state across page loads
      once("accordionState", ".usa-accordion.remember-state", context).forEach(function (accordion) {
        let accordionButtons = accordion.getElementsByClassName("usa-accordion__button");

        Array.prototype.forEach.call(accordionButtons, function (button) {
          let itemId = button.getAttribute("aria-controls");

          // Retrieve the last stored state from localStorage (if available)
          let savedState = localStorage.getItem(itemId);
          if (savedState !== null) {
            button.setAttribute("aria-expanded", savedState);
          }
        });

        // Update localStorage when the accordion button is clicked
        Array.prototype.forEach.call(accordionButtons, function (button) {
          button.addEventListener("click", function () {
            let itemId = button.getAttribute("aria-controls");
            let newState = button.getAttribute("aria-expanded") === "true" ? "false" : "true";
            localStorage.setItem(itemId, newState);

            // If this is NOT a multiselectable accordion, update all other buttons
            if (!accordion.hasAttribute("data-allow-multiple")) {
              Array.prototype.forEach.call(accordionButtons, function (otherButton) {
                if (otherButton !== button) {
                  let otherItemId = otherButton.getAttribute("aria-controls");

                  // Since non-multiselectable auto-closes other opened accordions, make sure they are marked as "false" in storage
                  localStorage.setItem(otherItemId, "false");
                }
              });
            }
          });
        });
      });
    },
  };
})(Drupal, once);
