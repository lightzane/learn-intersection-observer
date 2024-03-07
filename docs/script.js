const main = document.querySelector('main');
const prime = document.querySelector('main div:first-child');

for (let i = 0; i < 5; i++) {
  main.appendChild(prime.cloneNode(true));
}

const clones = document.querySelectorAll('.clone');

// * ====================================================================================
// *    Intersection Observer
// * ====================================================================================

/** @type {IntersectionObserverInit} */
const options = {
  threshold: 0.8, // only when 100% of the element is visible
};

// * Initialization
const observer = new IntersectionObserver(callback, options);

// * Specify a DOM to observe
// observer.observe(clones[0]);

// * Specifying multiple DOM to observe
clones.forEach((clone) => observer.observe(clone));

/**
 * * Tell observer what to do
 * @param {IntersectionObserverEntry[]} entries
 */
function callback(entries) {
  entries.forEach((entry) => {
    entry.target.classList.toggle('animate-slide-up', entry.isIntersecting);

    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
    }
  });
}

// * Lazy Loading
const lastCloneObserver = new IntersectionObserver(
  (entries) => {
    const lastClone = entries[0];

    if (!lastClone.isIntersecting) {
      return;
    }

    // Add 10 new clones
    addNewClones();

    // Since we added new clones, then ...
    // ! It is important to unobserve that target since it's not the last clone anymore
    lastCloneObserver.unobserve(lastClone.target);

    // * Observe the "new" last clone
    lastCloneObserver.observe(document.querySelector('.clone:last-child'));
  },
  {
    rootMargin: '100px', // advance calling network requests before 100px of the last child comes into view
  },
);

// * Observe the "current" last clone
lastCloneObserver.observe(document.querySelector('.clone:last-child'));

function addNewClones() {
  for (let i = 0; i < 10; i++) {
    const clone = prime.cloneNode(true);
    observer.observe(clone);
    main.appendChild(clone);
  }
}
