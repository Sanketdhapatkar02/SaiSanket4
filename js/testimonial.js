// Firebase Imports (MODULAR SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCs9Fn-zynOyS6gJNFQcMQLmhDeIlgBZTk",
  authDomain: "sai-sanket.firebaseapp.com",
  projectId: "sai-sanket",
  storageBucket: "sai-sanket.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Rating Variable
let currentRating = 0;

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll('#starInput .star');

  stars.forEach((star) => {

    star.addEventListener("click", () => {
      const rating = parseInt(star.getAttribute("data-value"));
      currentRating = rating;

      stars.forEach((s) => {
        const val = parseInt(s.getAttribute("data-value"));
        if (val <= rating) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });

  });
});

// 🚀 Submit Review
async function submitReview() {
  const nameInput = document.getElementById('t-name');
  const msgInput = document.getElementById('t-msg');

  const name = nameInput.value.trim();
  const msg = msgInput.value.trim();

  if (!name || !msg || currentRating === 0) {
    alert('Please fill all fields and select a rating.');
    return;
  }

  try {
    await addDoc(collection(db, "reviews"), {
      name: name,
      msg: msg,
      rating: currentRating,
      createdAt: serverTimestamp()
    });

    alert("✅ Thank you for your review!");

    // ✅ Reset form
    nameInput.value = "";
    msgInput.value = "";
    currentRating = 0;

    // ✅ Reset stars UI
    document.querySelectorAll('#starInput .star')
      .forEach(star => star.classList.remove("active"));

  } catch (error) {
    console.error("Error adding review:", error);
    alert("❌ Submission failed. Check console.");
  }
}

// 🔴 REAL-TIME REVIEWS (THIS IS THE MAGIC)
function loadReviewsRealtime() {
  const container = document.getElementById('reviewsContainer');
  if (!container) return;

  const q = query(
    collection(db, "reviews"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = "<p>No reviews yet. Be the first!</p>";
      return;
    }

    snapshot.forEach(doc => {
      const r = doc.data();

      // Skip if timestamp not ready yet
      if (!r.createdAt) return;

      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

      const div = document.createElement('div');
      div.className = 'review-card';

      div.innerHTML = `
        <h4>${r.name}</h4>
        <div class="review-stars" style="color:#ffcc00;">${stars}</div>
        <p>${r.msg}</p>
      `;

      container.appendChild(div);
    });
  });
}

// 🌐 Make functions accessible to HTML

// 🚀 Load reviews on page load
document.addEventListener('DOMContentLoaded', loadReviewsRealtime);
