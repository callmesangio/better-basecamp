// Better Basecamp — unsets the `--layout-wallpaper` CSS variable wherever
// it is set inline, and removes the `layout--wallpaper-fill` and
// `layout--wallpaper-tile` classes from those elements.

const PROPERTY = "--layout-wallpaper";
const CLASSES = ["layout--wallpaper-fill", "layout--wallpaper-tile"];
const SELECTOR = `[style*="${PROPERTY}"]`;

function unset(el) {
  if (!el.style.getPropertyValue(PROPERTY)) return;
  el.style.removeProperty(PROPERTY);
  if (!el.style.length) el.removeAttribute("style");
  el.classList.remove(...CLASSES);
}

function cleanTree(root) {
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  if (root.matches(SELECTOR)) unset(root);
  root.querySelectorAll(SELECTOR).forEach(unset);
}

cleanTree(document.documentElement);

// Basecamp renders content dynamically (Turbo/Hotwire), so keep watching
// for new nodes and for the variable being re-applied to existing ones.
new MutationObserver((mutations) => {
  for (const m of mutations) {
    if (m.type === "attributes") {
      unset(m.target);
    } else {
      m.addedNodes.forEach(cleanTree);
    }
  }
}).observe(document.documentElement, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ["style"],
});
