'use strict';

// Typing Effect
const jobTitles = ["Data Analyst", "Data Scientist", "ML Practitioner", "Full Stack Developer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;
const textElement = document.getElementById("typed-text");

function typeEffect() {
  let currentText = jobTitles[index];
  if (!isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), pauseTime);
    }
  } else {
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % jobTitles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing effect when DOM is loaded
document.addEventListener("DOMContentLoaded", typeEffect);

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// Portfolio filtering functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Initialize portfolio items
function initializePortfolio() {
  // Show all items by default
  filterItems.forEach(item => {
    item.classList.add("active");
  });

  // Setup dropdown toggle
  if (select) {
    select.addEventListener("click", function (e) {
      e.stopPropagation();
      elementToggleFunc(this);
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (select && !select.contains(e.target)) {
      select.classList.remove("active");
    }
  });

  // Setup filter selection
  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterPortfolioItems(selectedValue);
    });
  });

  // Setup filter buttons for desktop
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterPortfolioItems(selectedValue);

      // Update active button state
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}

// Filter portfolio items
function filterPortfolioItems(selectedValue) {
  filterItems.forEach(item => {
    const category = item.dataset.category.toLowerCase();
    if (selectedValue === "all") {
      item.classList.add("active");
      item.style.display = "block";
    } else if (category === selectedValue) {
      item.classList.add("active");
      item.style.display = "block";
    } else {
      item.classList.remove("active");
      item.style.display = "none";
    }
  });

  // Animate newly visible items
  const activeItems = document.querySelectorAll('.project-item.active');
  activeItems.forEach(item => {
    item.style.animation = 'none';
    item.offsetHeight; // Trigger reflow
    item.style.animation = 'fadeInUp 0.5s ease forwards';
  });
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);



// contact form variables
const form = document.querySelector(".form");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector(".form-status");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    validateField(this);
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Form submission handler
form.addEventListener("submit", function(e) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<ion-icon name="sync-outline"></ion-icon><span>Sending...</span>';
  
  // After 5 seconds, re-enable the button
  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }, 5000);
});

// Field validation function
function validateField(field) {
  const errorElement = field.nextElementSibling;
  
  if (field.validity.valid) {
    errorElement.textContent = "";
    field.classList.remove("error");
  } else {
    if (field.validity.valueMissing) {
      errorElement.textContent = "This field is required";
    } else if (field.validity.typeMismatch) {
      errorElement.textContent = "Please enter a valid email address";
    } else if (field.validity.tooShort) {
      errorElement.textContent = `Please enter at least ${field.minLength} characters`;
    }
    field.classList.add("error");
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Project Preview Data
const projectData = {
  'sales-analysis': {
    title: 'Sales Analysis Dashboard',
    category: 'Data Analysis',
    image: './assets/images/project-1.jpg',
    description: 'Interactive Power BI dashboard analyzing sales trends, customer behavior, and product performance. Features include: • Sales forecasting using time series analysis • Customer segmentation with K-means clustering • Product performance metrics and recommendations • Regional analysis with geographic visualizations',
    tech: ['Power BI', 'SQL', 'DAX', 'Python'],
    github: 'https://github.com/ridhwansalim/sales-analysis',
    demo: '#'
  },
  'churn-prediction': {
    title: 'Customer Churn Prediction',
    category: 'Machine Learning',
    image: './assets/images/project-2.jpg',
    description: 'ML model predicting customer churn using historical data. Features: • Feature engineering and selection • Model comparison (Random Forest, XGBoost) • Hyperparameter tuning with GridSearchCV • Model deployment on AWS with Flask API',
    tech: ['Python', 'Scikit-learn', 'XGBoost', 'AWS'],
    github: 'https://github.com/ridhwansalim/churn-prediction',
    demo: '#'
  },
  'sentiment-analysis': {
    title: 'Social Media Sentiment Analysis',
    category: 'NLP',
    image: './assets/images/project-3.jpg',
    description: 'Real-time sentiment analysis of social media posts. Features: • Text preprocessing and tokenization • BERT model fine-tuning • Real-time processing pipeline • Interactive sentiment visualization',
    tech: ['Python', 'Transformers', 'PyTorch', 'Streamlit'],
    github: 'https://github.com/ridhwansalim/sentiment-analysis',
    demo: '#'
  },
  'object-detection': {
    title: 'Real-time Object Detection',
    category: 'Machine Learning',
    image: './assets/images/project-4.jpg',
    description: 'YOLO-based object detection system. Features: • Real-time video processing • Multiple object detection • Performance optimization • Web interface with Flask',
    tech: ['Python', 'YOLO', 'OpenCV', 'Flask'],
    github: 'https://github.com/ridhwansalim/object-detection',
    demo: '#'
  }
};

// Project Preview Functionality
const previewContainer = document.querySelector('.project-preview');
const previewTriggers = document.querySelectorAll('.preview-trigger');
const previewClose = document.querySelector('.preview-close');

function openPreview(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  // Update preview content
  previewContainer.querySelector('.preview-title').textContent = project.title;
  previewContainer.querySelector('.preview-category').textContent = project.category;
  previewContainer.querySelector('.preview-image').src = project.image;
  previewContainer.querySelector('.preview-description').textContent = project.description;
  
  // Update tech stack
  const techContainer = previewContainer.querySelector('.preview-tech');
  techContainer.innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');
  
  // Update links
  const links = previewContainer.querySelectorAll('.preview-link');
  links[0].href = project.github;
  links[1].href = project.demo;

  // Show preview with animation
  previewContainer.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  previewContainer.classList.remove('active');
  document.body.style.overflow = '';
}

// Event Listeners
previewTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const projectId = trigger.dataset.preview;
    openPreview(projectId);
  });
});

previewClose.addEventListener('click', closePreview);

// Close preview on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && previewContainer.classList.contains('active')) {
    closePreview();
  }
});

// Close preview when clicking outside
previewContainer.addEventListener('click', (e) => {
  if (e.target === previewContainer) {
    closePreview();
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.about-text p, .service-item, .timeline-item, .project-item, .blog-post-item').forEach(el => {
  observer.observe(el);
});

// Profile Picture Modal Functionality
const profileModal = document.querySelector('.profile-modal');
const avatarBox = document.querySelector('.avatar-box');

function openProfileModal() {
  profileModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
  profileModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Event Listeners for Profile Modal
avatarBox.addEventListener('click', openProfileModal);

// Close modal when clicking anywhere on the screen
profileModal.addEventListener('click', closeProfileModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && profileModal.classList.contains('active')) {
    closeProfileModal();
  }
});

// Certificate preview functionality
const certificateButtons = document.querySelectorAll('.view-certificate');
const certificateModal = document.querySelector('.certificate-modal');
const modalImage = document.querySelector('.modal-image');
const modalContainer = document.querySelector('.modal-image-container');
const zoomInButton = document.querySelector('.zoom-in');
const zoomOutButton = document.querySelector('.zoom-out');

let currentZoom = 1;
let previousZoom = 1;
const zoomStep = 0.2;
const maxZoom = 3;
const minZoom = 1;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

// Add zoom level indicator
const zoomLevel = document.createElement('div');
zoomLevel.className = 'zoom-level';
modalContainer.appendChild(zoomLevel);

function openCertificateModal(imageSrc) {
  modalImage.src = imageSrc;
  certificateModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  resetZoomAndPosition();
}

function closeCertificateModal() {
  certificateModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  modalImage.src = '';
  resetZoomAndPosition();
}

function updateZoom() {
  modalImage.style.transform = `scale(${currentZoom})`;
  zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
  zoomLevel.classList.add('visible');
  
  // Show/hide scrollbars and adjust container class based on zoom level
  if (currentZoom > 1) {
    modalContainer.classList.add('zoomed');
    modalImage.classList.add('zoomed');
    // Reset scroll position when zooming out to ensure left edge is accessible
    if (previousZoom > currentZoom) {
      modalContainer.scrollLeft = 0;
      modalContainer.scrollTop = 0;
    }
  } else {
    modalContainer.classList.remove('zoomed');
    modalImage.classList.remove('zoomed');
    modalContainer.scrollLeft = 0;
    modalContainer.scrollTop = 0;
  }
  
  // Store current zoom level for next comparison
  previousZoom = currentZoom;
  
  // Hide zoom level indicator after a delay
  setTimeout(() => {
    zoomLevel.classList.remove('visible');
  }, 1500);
}

function zoomIn() {
  if (currentZoom < maxZoom) {
    currentZoom += zoomStep;
    updateZoom();
  }
}

function zoomOut() {
  if (currentZoom > minZoom) {
    currentZoom -= zoomStep;
    updateZoom();
  }
}

// Mouse wheel zoom with cursor position
modalContainer.addEventListener('wheel', (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    
    const rect = modalImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const oldZoom = currentZoom;
    
    if (e.deltaY < 0 && currentZoom < maxZoom) {
      currentZoom = Math.min(currentZoom + zoomStep, maxZoom);
    } else if (e.deltaY > 0 && currentZoom > minZoom) {
      currentZoom = Math.max(currentZoom - zoomStep, minZoom);
    }
    
    if (currentZoom !== oldZoom) {
      updateZoom();
      
      if (currentZoom > 1) {
        // Calculate new scroll position to zoom into cursor position
        const scrollX = (x * currentZoom / oldZoom) - x;
        const scrollY = (y * currentZoom / oldZoom) - y;
        modalContainer.scrollLeft += scrollX;
        modalContainer.scrollTop += scrollY;
      }
    }
  }
});

// Dragging functionality
function startDragging(e) {
  if (currentZoom <= 1) return;
  
  isDragging = true;
  modalContainer.style.cursor = 'grabbing';
  
  startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
  startY = e.type === 'mousedown' ? e.pageY : e.touches[0].pageY;
  
  scrollLeft = modalContainer.scrollLeft;
  scrollTop = modalContainer.scrollTop;
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  
  const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
  const y = e.type === 'mousemove' ? e.pageY : e.touches[0].pageY;
  
  const dx = x - startX;
  const dy = y - startY;
  
  modalContainer.scrollLeft = scrollLeft - dx;
  modalContainer.scrollTop = scrollTop - dy;
}

function stopDragging() {
  isDragging = false;
  modalContainer.style.cursor = 'grab';
}

// Reset zoom and position when opening modal
function resetZoomAndPosition() {
  currentZoom = 1;
  previousZoom = 1;
  updateZoom();
  modalContainer.scrollLeft = 0;
  modalContainer.scrollTop = 0;
}

// Event Listeners
certificateButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const certificateImage = button.closest('.certificate-image, .gallery-item').querySelector('img').src;
    openCertificateModal(certificateImage);
  });
});

zoomInButton.addEventListener('click', (e) => {
  e.stopPropagation();
  zoomIn();
});

zoomOutButton.addEventListener('click', (e) => {
  e.stopPropagation();
  zoomOut();
});

// Close modal when clicking outside the image
certificateModal.addEventListener('click', (e) => {
  if (!e.target.closest('.modal-image-container') || e.target === certificateModal) {
    closeCertificateModal();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
    closeCertificateModal();
  }
});

// Prevent zoom controls from closing modal
document.querySelector('.modal-controls').addEventListener('click', (e) => {
  e.stopPropagation();
});