// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs9Fn-zynOyS6gJNFQcMQLmhDeIlgBZTk",
  authDomain: "sai-sanket.firebaseapp.com",
  projectId: "sai-sanket",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit review
async function submitReview() {
  const name = document.getElementById('t-name').value.trim();
  const msg = document.getElementById('t-msg').value.trim();

  if (!name || !msg || currentRating === 0) {
    alert('Fill all fields');
    return;
  }

  await addDoc(collection(db, "reviews"), {
    name,
    msg,
    rating: currentRating,
    createdAt: new Date()
  });

  alert("Review submitted!");
  loadReviews();
}

// Load reviews
async function loadReviews() {
  const container = document.getElementById('reviewsContainer');
  container.innerHTML = "Loading...";

  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const r = doc.data();
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

    const div = document.createElement('div');
    div.className = 'review-card';
    div.innerHTML = `
      <h4>${r.name}</h4>
      <div class="review-stars">${stars}</div>
      <p>${r.msg}</p>
    `;

    container.appendChild(div);
  });
}

// Load on start
window.submitReview = submitReview;
window.setRating = setRating;
loadReviews();
