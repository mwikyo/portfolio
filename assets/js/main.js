(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  /**
   * Form Submission
   */
  $('#myForm').on('submit', function(e) {
    $('#myForm *').fadeOut(2000);
    $('#myForm').prepend('<div style="color: green;">Your submission has been processed...</div>');
  });

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();

      let body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  /**
   * Scroll with offset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
  
  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Generate Blog Cards
   */
  const blogArticles = [
    {
      title: "Understanding Systems Reliability Engineering",
      description: "Exploring the principles of SRE, from monitoring to automation.",
      link: "https://medium.com/example1"
    },
    {
      title: "Web Development Essentials",
      description: "A guide to building scalable and efficient web applications.",
      link: "https://medium.com/example2"
    },
    {
      title: "Technical Support in a Digital Age",
      description: "Insights on modern technical support and customer service best practices.",
      link: "https://medium.com/example3"
    }
  ];

  const createBlogCards = (articles) => {
    const container = document.getElementById('blog-cards-container');
    
    // Ensure the container exists
    if (!container) {
      console.warn('Blog cards container not found!');
      return;
    }

    articles.forEach(article => {
      // Skip if required article data is missing
      if (!article.title || !article.description || !article.link) {
        console.warn('Incomplete article data', article);
        return;
      }

      // Create the card element
      const card = document.createElement('div');
      card.classList.add('col-lg-4', 'col-md-6', 'mb-4');

      // Use template literals for cleaner HTML construction
      card.innerHTML = `
        <div class="card h-100 shadow-sm" data-aos="fade-up" data-aos-delay="100">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description}</p>
            <a href="${article.link}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        </div>`;

      // Append the card to the container
      container.appendChild(card);
    });
  };

  // Call the function to generate cards
  createBlogCards(blogArticles);

})();
