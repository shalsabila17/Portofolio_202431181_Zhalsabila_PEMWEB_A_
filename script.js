document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      
      window.location.href = targetId;
    }
  });
});


function animateSkillBars() {
  const skillProgresses = document.querySelectorAll('.progress');
  
  skillProgresses.forEach(progress => {
    
    const targetStyle = progress.getAttribute('style'); 
    const match = targetStyle ? targetStyle.match(/width:(\d+)%/) : null;
    const targetWidth = match ? match[1] : '0';

   
    let counterSpan = document.createElement("span");
    counterSpan.className = "skill-counter"; 
    counterSpan.style.float = "right";
    counterSpan.style.fontSize = "12px";
    counterSpan.style.color = "#555";
    

    if (!progress.parentElement.querySelector('.skill-counter')) {
        progress.parentElement.appendChild(counterSpan);
    }
    
    let current = 0;
   
    progress.style.width = "0%"; 

    let interval = setInterval(() => {
      if (current >= targetWidth) {
        clearInterval(interval);
        current = targetWidth;
      } else {
        current++;
      }
      counterSpan.textContent = current + "%";
      progress.style.width = current + "%";
    }, 15);
  });
}

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      //  Animasi Bar
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }

      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

//reveal
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }
});

