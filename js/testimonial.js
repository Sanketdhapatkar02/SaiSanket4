import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs9Fn-zynOyS6gJNFQcMQLmhDeIlgBZTk",
  authDomain: "sai-sanket.firebaseapp.com",
  projectId: "sai-sanket",
  storageBucket: "sai-sanket.appspot.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentRating = 0;

// Set Rating Function
function setRating(n) {
  currentRating = n;
  const stars = document.querySelectorAll('#starInput span');
  stars.forEach((star, index) => {
    star.style.color = index < n ? "#ffcc00" : "#ccc";
  });
}

// Submit review
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
      name,
      msg,
      rating: currentRating,
      createdAt: serverTimestamp() // Better than new Date()
    });

    alert("Thank you for your review!");
    
    // Reset form
    nameInput.value = "";
    msgInput.value = "";
    setRating(0);
    
    loadReviews();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Submission failed. Check Console for errors.");
  }
}

// Load reviews
async function loadReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container) return;

  try {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    container.innerHTML = "";

    if (snapshot.empty) {
        container.innerHTML = "<p>No reviews yet. Be the first!</p>";
        return;
    }

    snapshot.forEach(doc => {
      const r = doc.data();
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

      const div = document.createElement('div');
      div.className = 'review-card';
      div.innerHTML = `
        <h4>${r.name}</h4>
        <div class="review-stars" style="color: #ffcc00;">${stars}</div>
        <p>${r.msg}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    container.innerHTML = "Error loading reviews.";
    console.error(error);
  }
}

// Global scope expose
window.submitReview = submitReview;
window.setRating = setRating;

// Initial Load
document.addEventListener('DOMContentLoaded', loadReviews);
