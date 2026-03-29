/* ==========================================
   SAI SANKET INSURANCE — MAIN JAVASCRIPT
   ========================================== */

/* ---- Nav scroll effect ---- */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ---- Mobile hamburger menu ---- */
function toggleMenu() {
  document.getElementById('mainNav').classList.toggle('nav-mobile-open');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mainNav').classList.remove('nav-mobile-open');
  });
});

/*-----Gallery sliderbar------*/

function scrollGallery(direction) {
  const container = document.getElementById('galleryTrack');

  if (!container) {
    console.log("Gallery not found");
    return;
  }

  const scrollAmount = 320;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}
-------------

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById('galleryTrack');
  const nextBtn = document.querySelector('.gallery-btn.next');
  const prevBtn = document.querySelector('.gallery-btn.prev');

  if (!track || !nextBtn || !prevBtn) {
    console.log("Gallery elements not found");
    return;
  }

  let position = 0;

  nextBtn.addEventListener('click', () => {
    position -= 320;
    const maxScroll = -(track.scrollWidth - track.parentElement.clientWidth);

    if (position < maxScroll) position = maxScroll;

    track.style.transform = `translateX(${position}px)`;
  });

  prevBtn.addEventListener('click', () => {
    position += 320;

    if (position > 0) position = 0;

    track.style.transform = `translateX(${position}px)`;
  });
});
/* ---- Plan tabs switcher ---- */
function showPlan(prefix, id) {
  // Hide all plan details for this prefix
  document.querySelectorAll(`.plan-detail[id^="${prefix}-"]`).forEach(d => {
    d.classList.remove('active');
  });
  // Show selected
  const target = document.getElementById(`${prefix}-${id}`);
  if (target) target.classList.add('active');

  // Update nav button states
  document.querySelectorAll('.plan-nav-btn').forEach(btn => {
    const attr = btn.getAttribute('onclick') || '';
    if (attr.includes(`'${prefix}'`)) {
      btn.classList.remove('active');
      if (attr.includes(`'${id}'`)) btn.classList.add('active');
    }
  });
}

/* ---- SIP Calculator ---- */
function fmtINR(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function calcSIP() {
  const P = parseFloat(document.getElementById('sipAmt').value);
  const annualRate = parseFloat(document.getElementById('sipRet').value);
  const r = annualRate / 100 / 12;
  const years = parseInt(document.getElementById('sipYrs').value);
  const n = years * 12;
  const age = document.getElementById('ageGroup').value;

  // Update labels
  document.getElementById('sipAmtLabel').textContent = '₹' + P.toLocaleString('en-IN');
  document.getElementById('sipRetLabel').textContent = annualRate + '%';
  document.getElementById('sipYrsLabel').textContent = years + (years === 1 ? ' year' : ' years');

  // Calculate SIP maturity
  const maturity = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const invested = P * n;
  const gains = maturity - invested;

  document.getElementById('r-invested').textContent = fmtINR(invested);
  document.getElementById('r-gains').textContent = fmtINR(gains);
  document.getElementById('r-total').textContent = fmtINR(maturity);
  document.getElementById('r-multi').textContent = (maturity / invested).toFixed(2) + '×';

  // Age-based suggestions
  const suggestions = {
    young: '💡 For your age group (20–35 yrs), we recommend aggressive equity funds — mid-cap and small-cap SIPs. You have time to ride market cycles and build significant wealth. Consider ELSS for tax saving too.',
    mid: '💡 For your age group (35–50 yrs), a balanced approach works best — a mix of large-cap equity (60%) and debt funds (40%). Consider ELSS for tax saving and review your portfolio every 2 years.',
    senior: '💡 For investors 50+, capital preservation matters. We suggest conservative hybrid funds, short-term debt funds, and some large-cap equity for moderate growth. Avoid high-risk funds at this stage.'
  };
  const el = document.getElementById('sipSuggestion');
  if (el) el.textContent = suggestions[age];
}

// Run calculator on load
if (document.getElementById('sipAmt')) calcSIP();

/* ---- Contact form submission ---- */
function submitQuery() {
  const name = document.getElementById('q-name').value.trim();
  const phone = document.getElementById('q-phone').value.trim();
  const type = document.getElementById('q-type').value;
  const msg = document.getElementById('q-msg').value.trim();

  if (!name || !phone || !type || !msg) {
    alert('Please fill in all required fields marked with *');
    return;
  }

  // Show success
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('successMsg');
  if (btn) btn.style.display = 'none';
  if (success) success.style.display = 'block';

  // Also open WhatsApp with the query details (as a bonus)
  const waMsg = encodeURIComponent(
    `Hello, I'm ${name}.\nPhone: ${phone}\nInterested in: ${type}\nQuery: ${msg}`
  );
  // Delay a bit so user sees the success message
  setTimeout(() => {
    window.open(`https://wa.me/919867431898?text=${waMsg}`, '_blank');
  }, 800);
}

/* ---- Enquiry Modal ---- */
function openEnquiry(planName) {
  document.getElementById('modalPlanName').textContent = planName;
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modalSuccess').style.display = 'none';
  document.getElementById('m-name').value = '';
  document.getElementById('m-phone').value = '';

  // Pre-fill WhatsApp link
  const waLink = `https://wa.me/919867431898?text=${encodeURIComponent('Hello, I am interested in ' + planName + '. Please share more details.')}`;
  document.getElementById('modalWaBtn').href = waLink;

  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function submitModal() {
  const name = document.getElementById('m-name').value.trim();
  const phone = document.getElementById('m-phone').value.trim();
  const plan = document.getElementById('modalPlanName').textContent;

  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }

  document.getElementById('modalSuccess').style.display = 'block';

  // Send via WhatsApp
  const waMsg = encodeURIComponent(`Hello! My name is ${name}, phone: ${phone}. I am interested in ${plan}. Please call me.`);
  setTimeout(() => {
    window.open(`https://wa.me/919867431898?text=${waMsg}`, '_blank');
    closeModal();
  }, 900);
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ---- Smooth scroll for nav links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Intersection Observer for subtle entrance animations ---- */
const observerOpts = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.ins-card, .mf-card, .trust-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
