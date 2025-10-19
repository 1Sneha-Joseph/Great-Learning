/* ================== Light/Dark Mode Toggle ================== */
// Select the toggle button
const themeToggleBtn = document.getElementById('theme-toggle');

// Listen for clicks on the toggle button
themeToggleBtn.addEventListener('click', () => {
  // Toggle dark-mode class on body
  document.body.classList.toggle('dark-mode');

  // Optional: change button icon
  if (document.body.classList.contains('dark-mode')) {
    themeToggleBtn.textContent = '🌙'; // Dark mode enabled
  } else {
    themeToggleBtn.textContent = '☀️'; // Light mode enabled
  }
});


/* ================== Smooth Scroll for Anchor Links (Optional) ================== */
// If you have internal anchor links like <a href="#section1">
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


/* ================== Form Submission Example (Optional) ================== */
// Handles contact form submission (prevents default, logs data)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent actual form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple mock submission (can integrate API later)
    console.log('Contact Form Submitted:', { name, email, message });

    // Optional: clear form after submission
    contactForm.reset();

    // Optional: show success message
    alert('Thank you! Your message has been sent.');
  });
}


/* ===== Interactive Tech Constellation Background ===== */
const canvas = document.getElementById('tech-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 150;

// Mouse position tracking
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00ffff";
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Interactive pull effect
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.x += dx / distance * 0.8;
      this.y += dy / distance * 0.8;
    }
  }
}

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

function connectStars() {
  for (let i = 0; i < stars.length; i++) {
    for (let j = i; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = `rgba(0,255,255,${1 - distance / 120})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].draw();
  }
  connectStars();
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});

initStars();
animateStars();


/* ================== Additional JS / Future Features ================== */
// You can add more scripts here for:
// - Filter dropdowns for activities
// - Dynamic loading of courses from JSON
// - Scroll-to-top button
// - Carousel or sliders (if needed)
