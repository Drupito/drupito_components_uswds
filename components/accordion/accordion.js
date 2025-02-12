(function (Drupal, $, once) {
  Drupal.behaviors.accordionState = {
    attach(context) {
      // Target only accordions with "remember-state" to persist state across page loads
      $(once("accordionState", ".usa-accordion.remember-state", context)).each(function () {
        let accordion = $(this);
        let accordionButtons = accordion.find(".usa-accordion__button");

        accordionButtons.each(function () {
          let button = $(this);
          let itemId = button.attr("aria-controls");

          // Retrieve the last stored state from localStorage (if available)
          let savedState = localStorage.getItem(itemId);
          if (savedState !== null) {
            button.attr("aria-expanded", savedState);
          }

          // Update localStorage when the accordion button is clicked
          button.on("click", function () {
            let newState = button.attr("aria-expanded") === "true" ? "false" : "true";
            localStorage.setItem(itemId, newState);
          });
        });
      });
    },
  };
})(Drupal, jQuery, once);
