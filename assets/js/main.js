/* Bokamoso Elisha Noma Development Skills: site scripts */
(function () {
  "use strict";

  // Site settings ------------------------------------------------------------
  // draft:        highlights text marked class="tbc" (still waiting for
  //               details from Bokamoso) and shows the review banner.
  //               Set to false before the site goes live.
  // formEndpoint: where the apply and contact forms are sent, for example a
  //               Formspree URL such as "https://formspree.io/f/abcdwxyz".
  //               While empty, forms show their thank-you message but
  //               nothing is sent.
  const SITE = {
    draft: true,
    formEndpoint: "",
  };

  const root = document.documentElement;
  root.classList.add("js");

  // Draft review mode
  if (SITE.draft) {
    root.classList.add("draft");
    const banner = document.querySelector("[data-draft-banner]");
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("draft-banner") === "hidden";
    } catch (e) {
      /* storage unavailable: keep showing the banner */
    }
    if (banner && !dismissed) {
      banner.hidden = false;
      banner.querySelector("[data-draft-close]").addEventListener("click", () => {
        banner.hidden = true;
        try {
          sessionStorage.setItem("draft-banner", "hidden");
        } catch (e) {
          /* ignore */
        }
      });
    }
  }

  // Header: shadow once the page scrolls, mobile menu toggle
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (header && toggle) {
    const setOpen = (open) => {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", () => setOpen(!header.classList.contains("nav-open")));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && header.classList.contains("nav-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1040) setOpen(false);
    });
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Contact page: preselect the enquiry type from ?topic=partner etc.
  const topic = new URLSearchParams(window.location.search).get("topic");
  const topicSelect = document.querySelector("[data-topic-select]");
  if (topic && topicSelect && topicSelect.querySelector(`option[value="${CSS.escape(topic)}"]`)) {
    topicSelect.value = topic;
  }

  // Forms
  document.querySelectorAll("form[data-form]").forEach((form) => {
    const button = form.querySelector('[type="submit"]');
    const status = form.querySelector("[data-form-status]");
    const success = document.querySelector(`[data-form-success="${form.dataset.form}"]`);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      form.classList.add("was-submitted");
      if (status) status.hidden = true;

      if (!form.checkValidity()) {
        // Fieldsets also match :invalid, so look only at the controls themselves
        const firstInvalid = form.querySelector("input:invalid, select:invalid, textarea:invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const label = button.textContent;
      button.disabled = true;
      button.textContent = "Sending…";

      try {
        if (SITE.formEndpoint) {
          const data = new FormData(form);
          data.append("form", form.dataset.form);
          const res = await fetch(SITE.formEndpoint, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
        } else {
          console.warn("Bokamoso site: no form endpoint is set in assets/js/main.js, so this submission was not sent.");
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        if (success) {
          const firstName = form.querySelector('[name="first_name"], [name="name"]');
          success.querySelectorAll("[data-first-name]").forEach((el) => {
            el.textContent = firstName && firstName.value.trim() ? `, ${firstName.value.trim().split(" ")[0]}` : "";
          });
          const note = success.querySelector("[data-preview-note]");
          if (note) note.hidden = Boolean(SITE.formEndpoint);
          form.hidden = true;
          success.hidden = false;
          success.setAttribute("tabindex", "-1");
          success.focus();
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (err) {
        console.error(err);
        if (status) {
          status.textContent = "Sorry, something went wrong and your message wasn't sent. Please try again, or contact us directly.";
          status.hidden = false;
        }
        button.disabled = false;
        button.textContent = label;
      }
    });
  });
})();
