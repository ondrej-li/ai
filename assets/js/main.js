/* Responsive single-tree navigation controller following references/modern-web-guidance
   (skills/modern-web-guidance/guides/ui-components/navbar.md).
   Measures the natural inline header row with ResizeObserver and toggles `is-wide`
   without hardcoded breakpoints, synchronizing the native `popover` attribute. */

const header = document.querySelector(".site-header");
const inner = header?.querySelector(".header-inner");
const menu = document.getElementById("site-menu");
const trigger = header?.querySelector(".menu-button");

if (header && inner && menu && trigger) {
  const supportsPopover = Object.hasOwn(HTMLElement.prototype, "popover");
  let lastCollapsedWidth = 0;

  // Lightweight fallback (<= 20 lines) for browsers lacking native Popover API.
  if (!supportsPopover) {
    const close = () => menu.classList.remove("is-open");
    trigger.addEventListener("click", () => menu.classList.toggle("is-open"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !trigger.contains(e.target)) close();
    });
  }

  const measure = () => {
    const wasWide = header.classList.contains("is-wide");
    const width = header.clientWidth;

    // Avoid thrashing while collapsed: only re-measure when the header grows.
    if (!wasWide && width <= lastCollapsedWidth) return;

    const wasOpen = supportsPopover
      ? menu.matches(":popover-open")
      : menu.classList.contains("is-open");

    header.classList.add("is-measuring", "is-wide");
    menu.removeAttribute("popover");

    const fits = inner.scrollWidth <= inner.clientWidth;

    if (fits) {
      lastCollapsedWidth = 0;
      menu.classList.remove("is-open");
    } else {
      header.classList.remove("is-wide");
      menu.setAttribute("popover", "auto");
      lastCollapsedWidth = width;
      if (wasOpen) {
        if (supportsPopover) menu.showPopover();
        else menu.classList.add("is-open");
      }
    }

    requestAnimationFrame(() => header.classList.remove("is-measuring"));
  };

  const ro = new ResizeObserver(measure);
  ro.observe(header);
  ro.observe(menu);
  measure();
}
