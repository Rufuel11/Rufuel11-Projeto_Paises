let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = slides.length;

  // Garantir que o índice do slide é cíclico
  if (index >= totalSlides) currentSlide = 0;
  if (index < 0) currentSlide = totalSlides - 1;

  // Mover slides
  const slider = document.querySelector('.slides');
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Atualizar estado dos slides
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });

  // Atualizar indicadores
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Inicializar o slider
showSlide(currentSlide);
