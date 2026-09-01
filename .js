/* =========================================================
   SALON XL — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     CONFIG
  --------------------------------------------------------- */

  const WHATSAPP_NUMBER = "2349022222208";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ---------------------------------------------------------
     ELEMENTS
  --------------------------------------------------------- */

  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  const pole = document.getElementById("pole");

  const backTop = document.getElementById("backTop");

  const bookingModal =
    document.getElementById("bookingModal");

  const bookingForm =
    document.getElementById("bookingForm");

  const liveStatus =
    document.getElementById("liveStatus");


  /* =========================================================
     1. NAVBAR — CHANGE BACKGROUND WHEN SCROLLING
     ========================================================= */

  function updateNavbar() {

    if (!nav) return;

    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  updateNavbar();


  /* =========================================================
     2. MOBILE MENU
     ========================================================= */

  function closeMobileMenu() {

    if (!nav || !menuToggle) return;

    nav.classList.remove("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open menu"
    );
  }


  function toggleMobileMenu() {

    if (!nav || !menuToggle) return;

    const isOpen =
      nav.classList.toggle("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  }


  if (menuToggle) {
    menuToggle.addEventListener(
      "click",
      toggleMobileMenu
    );
  }


  /* Close menu after clicking a navigation link */

  document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    });


  /* =========================================================
     3. CLOSE MENU / MODAL WITH ESCAPE
     ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeMobileMenu();

        closeBookingModal();

      }

    }
  );


  /* =========================================================
     4. SMOOTH SCROLL
     ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute("href");

          if (
            !targetID ||
            targetID === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetID);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior:
              prefersReducedMotion
                ? "auto"
                : "smooth",

            block: "start"
          });

        }
      );

    });


  /* =========================================================
     5. HERO 3D BARBER POLE
     ========================================================= */

  if (pole && !prefersReducedMotion) {

    let ticking = false;

    function updatePole() {

      const scroll =
        Math.min(window.scrollY, 800);

      const rotateY =
        -18 + (scroll / 800) * 34;

      const rotateX =
        4 - (scroll / 800) * 8;

      pole.style.transform =
        `rotateY(${rotateY}deg)
         rotateX(${rotateX}deg)`;

      ticking = false;
    }


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updatePole
          );

          ticking = true;
        }

      },
      { passive: true }
    );

  }


  /* =========================================================
     6. SERVICE CARDS — 3D SCROLL REVEAL
     ========================================================= */

  const serviceCards =
    document.querySelectorAll(".svc-card");


  if (serviceCards.length) {

    if (
      "IntersectionObserver" in window
    ) {

      const serviceObserver =
        new IntersectionObserver(
          entries => {

            entries.forEach(entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "in-view"
                );

                serviceObserver.unobserve(
                  entry.target
                );

              }

            });

          },
          {
            threshold: 0.2
          }
        );


      serviceCards.forEach(card => {

        serviceObserver.observe(card);

      });

    } else {

      serviceCards.forEach(card => {

        card.classList.add(
          "in-view"
        );

      });

    }

  }


  /* =========================================================
     7. GENERAL SECTION REVEAL
     ========================================================= */

  const revealElements =
    document.querySelectorAll(
      ".about, .services-head, .gallery-head, .reviews, .visit"
    );


  revealElements.forEach(element => {

    element.classList.add(
      "reveal"
    );

  });


  if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      element =>
        revealObserver.observe(element)
    );

  } else {

    revealElements.forEach(
      element =>
        element.classList.add("visible")
    );

  }


  /* =========================================================
     8. GALLERY 3D TILT
     ========================================================= */

  const galleryTiles =
    document.querySelectorAll(
      ".gal-tile"
    );


  const supportsHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (
    supportsHover &&
    !prefersReducedMotion
  ) {

    galleryTiles.forEach(tile => {

      tile.addEventListener(
        "pointermove",
        event => {

          const rect =
            tile.getBoundingClientRect();

          const x =
            (event.clientX - rect.left)
            / rect.width;

          const y =
            (event.clientY - rect.top)
            / rect.height;


          const rotateY =
            (x - 0.5) * 16;

          const rotateX =
            (0.5 - y) * 16;


          tile.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.02)`;

        }
      );


      tile.addEventListener(
        "pointerleave",
        () => {

          tile.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

        }
      );

    });

  }


  /* =========================================================
     9. BACK TO TOP BUTTON
     ========================================================= */

  function updateBackTop() {

    if (!backTop) return;

    if (window.scrollY > 700) {

      backTop.classList.add(
        "show"
      );

    } else {

      backTop.classList.remove(
        "show"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateBackTop,
    { passive: true }
  );


  updateBackTop();


  if (backTop) {

    backTop.addEventListener(
      "click",
      () => {

        window.scrollTo({

          top: 0,

          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth"

        });

      }
    );

  }


  /* =========================================================
     10. BOOKING MODAL
     ========================================================= */

  function openBookingModal() {

    if (!bookingModal) return;

    bookingModal.classList.add(
      "open"
    );

    bookingModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );


    const nameInput =
      document.getElementById(
        "bookingName"
      );


    if (nameInput) {

      setTimeout(
        () => nameInput.focus(),
        100
      );

    }

  }


  function closeBookingModal() {

    if (!bookingModal) return;

    bookingModal.classList.remove(
      "open"
    );

    bookingModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  /* All booking buttons */

  document
    .querySelectorAll("[data-book]")
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          openBookingModal();

        }
      );

    });


  /* Close button */

  const closeBookingButton =
    document.querySelector(
      "[data-close-booking]"
    );


  if (closeBookingButton) {

    closeBookingButton.addEventListener(
      "click",
      closeBookingModal
    );

  }


  /* Close when clicking outside modal */

  if (bookingModal) {

    bookingModal.addEventListener(
      "click",
      event => {

        if (
          event.target === bookingModal
        ) {

          closeBookingModal();

        }

      }
    );

  }


  /* =========================================================
     11. WHATSAPP BOOKING FORM
     ========================================================= */

  function createWhatsAppURL(message) {

    return (
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message)
    );

  }


  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const name =
          document
            .getElementById(
              "bookingName"
            )
            ?.value
            .trim();


        const service =
          document
            .getElementById(
              "bookingService"
            )
            ?.value;


        const day =
          document
            .getElementById(
              "bookingDay"
            )
            ?.value;


        const time =
          document
            .getElementById(
              "bookingTime"
            )
            ?.value;


        const note =
          document
            .getElementById(
              "bookingNote"
            )
            ?.value
            .trim();


        if (
          !name ||
          !service ||
          !day ||
          !time
        ) {

          alert(
            "Please fill in your name, service, preferred day and time."
          );

          return;

        }


        const message =
`Hello Salon XL 👋

I'd like to book an appointment.

Name: ${name}
Service: ${service}
Preferred day: ${day}
Preferred time: ${time}${note ? `

Additional details:
${note}` : ""}

Thank you!`;


        const whatsappLink =
          createWhatsAppURL(
            message
          );


        window.open(
          whatsappLink,
          "_blank",
          "noopener,noreferrer"
        );


        bookingForm.reset();

        closeBookingModal();

      }
    );

  }


  /* =========================================================
     12. DATE PICKER — DON'T ALLOW PAST DATES
     ========================================================= */

  const bookingDay =
    document.getElementById(
      "bookingDay"
    );


  if (bookingDay) {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    bookingDay.min = today;

  }


  /* =========================================================
     13. OPTIONAL REAL GALLERY IMAGES
     
     Add data-image="images/photo.jpg"
     to a .tex element if you want real images.
     ========================================================= */

  document
    .querySelectorAll(
      ".gal-tile .tex[data-image]"
    )
    .forEach(imageElement => {

      const image =
        imageElement.dataset.image;

      if (!image) return;

      imageElement.style.backgroundImage =
        `url("${image}")`;

    });


  /* =========================================================
     14. LIVE SALON STATUS
     
     Current fallback schedule:
     Monday–Saturday: 9 AM–8 PM
     Sunday: Closed

     Change these values when the salon confirms
     its actual weekly schedule.
     ========================================================= */

  function updateSalonStatus() {

    if (!liveStatus) return;


    const now =
      new Date(
        new Date().toLocaleString(
          "en-US",
          {
            timeZone:
              "Africa/Lagos"
          }
        )
      );


    const day =
      now.getDay();

    const hours =
      now.getHours();

    const minutes =
      now.getMinutes();


    const currentTime =
      hours + minutes / 60;


    const isOpen =
      day >= 1 &&
      day <= 6 &&
      currentTime >= 9 &&
      currentTime < 20;


    const dot =
      liveStatus.querySelector(
        ".status-dot"
      );


    const text =
      liveStatus.querySelector(
        ".status-text"
      );


    if (dot) {

      dot.style.background =
        isOpen
          ? "#7fae7a"
          : "#9c9179";


      dot.style.boxShadow =
        isOpen
          ? "0 0 0 3px rgba(127,174,122,0.2)"
          : "none";

    }


    if (text) {

      text.textContent =
        isOpen
          ? "Open now · Closes 8 pm"
          : "Currently closed · Message to confirm";

    }

  }


  updateSalonStatus();


  /* Update status every minute */

  setInterval(
    updateSalonStatus,
    60000
  );


  /* =========================================================
     15. IMAGE LOADING FALLBACK
     ========================================================= */

  document
    .querySelectorAll(
      "img"
    )
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.display =
            "none";

        }
      );

    });


  /* =========================================================
     16. PREVENT DOUBLE SUBMISSIONS
     ========================================================= */

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      () => {

        const submitButton =
          bookingForm.querySelector(
            'button[type="submit"]'
          );


        if (submitButton) {

          submitButton.disabled =
            true;


          setTimeout(
            () => {

              submitButton.disabled =
                false;

            },
            1500
          );

        }

      }
    );

  }


  /* =========================================================
     INITIALIZATION COMPLETE
     ========================================================= */

  console.log(
    "Salon XL website initialized successfully."
  );

});