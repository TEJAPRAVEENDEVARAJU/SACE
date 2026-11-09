const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Course cards can preselect a course in the enquiry form.
const courseSelect = document.querySelector("#interest");
document.querySelectorAll("[data-course]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!courseSelect) return;
    const courseText = link.dataset.course.toLowerCase();
    const match = Array.from(courseSelect.options).find((option) =>
      option.text.toLowerCase().includes(courseText.split(" / ")[0])
    );
    if (match) courseSelect.value = match.value;
  });
});


const enquiryForm = document.querySelector("#enquiry-form");
const formMessage = document.querySelector("#form-message");

if (enquiryForm && formMessage) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.checkValidity()) {
      enquiryForm.reportValidity();
      return;
    }

    const formData = new FormData(enquiryForm);

    const fullName = formData.get("fullName").trim();
    const phone = formData.get("phone").trim();
    const email = formData.get("email").trim();
    const course = formData.get("interest");
    const batch = formData.get("batch");
    const question = formData.get("question").trim();

    const message = `Hello SACE Guntur,

I would like to enquire about admission.

Name: ${fullName}
Contact Number: ${phone}
Email: ${email}
Course: ${course}
Preferred Batch: ${batch}
Message: ${question || "No additional message"}

Please share the course fees, timings and eligibility. Thank you.`;

    // Replace with SACE's verified WhatsApp number.
    const whatsappNumber = "918143767679";

    if (!/^91\d{10}$/.test(whatsappNumber)) {
      formMessage.textContent =
        "The enquiry form is not configured yet. Please call SACE or email saceguntur@gmail.com.";
      return;
    }

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    formMessage.textContent =
      "Opening WhatsApp. Please review and send your enquiry.";

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}


// popup
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("sacePopup");
  const closeButton = document.getElementById("sacePopupClose");
  const popupLink = document.getElementById("sacePopupLink");

  if (!popup || !closeButton) return;

  function openPopup() {
    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("sace-popup-open");
    closeButton.focus();
  }

  function closePopup() {
    popup.classList.remove("active");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("sace-popup-open");
  }

  // Show popup shortly after the page loads
  setTimeout(openPopup, 300);

  // Close button
  closeButton.addEventListener("click", closePopup);

  // Close when clicking outside the banner
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup();
    }
  });

  // Close using Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" &&
        popup.classList.contains("active")) {
      closePopup();
    }
  });

  // Clicking the image opens the website's contact section
  if (popupLink) {
    popupLink.addEventListener("click", function () {
      closePopup();
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".sace-gallery").forEach(function (gallery) {
    const slides = gallery.querySelectorAll(".sace-slide");
    const dots = gallery.querySelectorAll(".sace-dot");
    const previous = gallery.querySelector(".sace-prev");
    const next = gallery.querySelector(".sace-next");

    if (!slides.length) return;

    let current = 0;
    let timer;

    function showSlide(index) {
      current = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === current);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
      });
    }

    function restartTimer() {
      clearInterval(timer);
      timer = setInterval(() => showSlide(current + 1), 4000);
    }

    previous.addEventListener("click", function () {
      showSlide(current - 1);
      restartTimer();
    });

    next.addEventListener("click", function () {
      showSlide(current + 1);
      restartTimer();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", function () {
        showSlide(i);
        restartTimer();
      });
    });

    gallery.addEventListener("mouseenter", () => clearInterval(timer));
    gallery.addEventListener("mouseleave", restartTimer);

    showSlide(0);
    restartTimer();
  });
});



/* ========================================
   SACE GOOGLE REVIEWS
   Five cards initially, five per click
======================================== */

const saceGoogleReviews = [
  {
    name: "Venkatapushpa Harika",
    date: "",
    rating: 5,
    text: "I’m currently taking coaching at SACE Academy, and my experience with the classes has been really good. I have attended classes for Networks, Control Systems, and Aptitude. The concepts are explained clearly, and the faculty focus on building a strong understanding of the basics along with exam-oriented preparation. The classes are easy to follow and helpful for GATE preparation. Overall, I’m satisfied with my learning experience at SACE Academy."
  },
  {
    name: "Padma B",
    date: "",
    rating: 5,
    text: "I had a great learning experience at this institute. The faculty members are highly knowledgeable and supportive, always ready to clarify doubts and guide students in the right direction. The teaching methodology is very clear and easy to understand, which helped me build strong fundamentals.\n\nThe institute provides a positive learning environment and encourages students to improve both technical and communication skills. The practical sessions and real-time examples made the concepts much more understandable.\n\nOverall, it is an excellent place for learning and career growth. I would definitely recommend this institute to anyone who wants to gain quality knowledge and skills."
  },
  {
    name: "Sandeep Royal",
    date: "1 year ago",
    rating: 5,
    text: "I have joined for gate at sace it is very good coaching center..well experienced staff will teach us all type of course and make career path simple and easy to understand..I have learned many things from this institute..thank you sace for giving me a good career path."
  },
  {
    name: "Sai Kumar",
    date: "1 year ago",
    rating: 5,
    text: "I have join sace in guntur...it is very good institute I have never seen before very well advanced teaching from basics it is very helpful for students to get good marks in gate and ecet exams...thank you sace for giving me a good career path."
  },
  {
    name: "SMOCKY6N0C6",
    date: "1 year ago",
    rating: 5,
    text: "I'm scoring great results in the GATE program Test series, all thanks to SACE coaching center. The coaching is effective, and the atmosphere is supportive 👌👌👌"
  },
  {
    name: "Priyanka",
    date: "1 year ago",
    rating: 5,
    text: "SACE coaching center is the best. They gave a more knowledge of the students.. In that Institute my cousin sister also joined. They got the ICET rank also.."
  },
  {
    name: "Pavani Patoju",
    date: "1 year ago",
    rating: 5,
    text: "I personally found it to be an amazing coaching centre faculty over here is very experienced and cooperative in my learning process. The institute provides well accomplished study material for all subjects."
  },
  {
    name: "K Veeranjaneyulu",
    date: "1 year ago",
    rating: 5,
    text: "I've been attending GATE coaching classes here, and I'm impressed with the quality of teaching and the mock tests, Highly recommended for GATE aspirants"
  },
  {
    name: "Bandaru Tejaswini",
    date: "2 years ago",
    rating: 5,
    text: "The best coaching center that I have got. They provide all the facilities towards the study that what student gets required. Like providing previous model papers, books, conducting tests and grand … More"
  },
  {
    name: "Kamal Sagiri",
    date: "1 year ago",
    rating: 5,
    text: "Excellent couching center Gate in guntur sace coching center faculty members they are very good teaching in institute concept to all subjects easy to understand academy is good"
  },
  {
    name: "Anand Kumar",
    date: "1 year ago",
    rating: 5,
    text: "Excellent coaching centre for GATE in guntur. they are giving wonderful. They are giving shot cutest which is more useful for the students to crack GATE. Thank you SACE"
  },
  {
    name: "Srinu Kagga",
    date: "1 year ago",
    rating: 5,
    text: "SACE coaching center for GATE in Guntur concepts they are giving and shortcuts, provide all fecilitys, Good Teaching Good Faculty, GATE coaching basics and concept very understanding in SACE coaching center"
  },
  {
    name: "Vasanthpu Jayasri",
    date: "1 year ago",
    rating: 5,
    text: "I am the student of the SACE academy. This Is the wonderful platform to score good marks in GATE EXAMINATION, they are give good explanation and it is easy to understand the concepts to qualify the GATE."
  },
  {
    name: "Mande Anusha Anusha",
    date: "1 year ago",
    rating: 5,
    text: "Sace coaching centre is the best coaching centre in guntur. Teaching staff is the best staff they are providing ecet coaching for students very well. Their subject explanation are extremely good. These coaching centre is the best coaching centre for ecet students."
  },
  {
    name: "Nunsavath గోపాల్ Naik",
    date: "1 year ago",
    rating: 5,
    text: "I am the student of SACE couching center, I have joined here for the GATE couching, they gave excellent explanation with examples, they thought shortcuts for easy understanding"
  },
  {
    name: "Pendyala Dhanush",
    date: "1 year ago",
    rating: 5,
    text: "I am the student of ECET aswell as GATE there faculty is really amazing there teaching is marvellous they use real time examples with good shortcuts"
  },
  {
    name: "Bandaru Parvathi Devi",
    date: "1 year ago",
    rating: 5,
    text: "One of the best coaching center in guntur I have joined ...I have joined for gate ..very good and well experienced faculty...best way to success"
  },
  {
    name: "Pavani Dhrakshavarapu",
    date: "1 year ago",
    rating: 5,
    text: "Well and experienced staff i have join for gate they teach very direct method with all basic... Best couching centre in guntur"
  },
  {
    name: "Brahmeswari",
    date: "1 year ago",
    rating: 5,
    text: "I joined in SACE couching center to score good marks in GATE, and I scored that with good marks, I haven't expected the marks, my parents are also happy with my marks, thank you SACE for guiding me"
  },
  {
    name: "Uzeer Noorbasha",
    date: "7 months ago",
    rating: 5,
    text: "I am the student of Hcet. I joined here for ecet coaching and good teaching of subject with easiest way to understand"
  },
  {
    name: "Manikanta Naidu Lingineni",
    date: "6 months ago",
    rating: 5,
    text: "GOOD FACULTY IN THIS COACHING CENTER AND GOOD STUDY ATMOSPHERE BECAUSE OF THIS COACHING CENTER I HAVE COMPLETED MY DIPLOMA"
  },
  {
    name: "Pradeep Kumar",
    date: "3 years ago",
    rating: 5,
    text: "I am student of KHIT and student of SACE from past 3 years. I have done my ECET coaching in SACE and received best rank in it because of SACE with highly certified faculty and pursing my GATE coaching in it. If any one wants to qualify in … More"
  },
  {
    name: "Pittala Kanakadurga",
    date: "2 years ago",
    rating: 5,
    text: "All Faculties are excellent in this coaching institute. I am taking coaching for Gate-25. They are conducting daily classes. Sir gives subject from Root level. … More"
  },
  {
    name: "Yaswanth Yaswanth",
    date: "7 months ago",
    rating: 5,
    text: "I am the student of Hcet. I joined for ECET. So nice for increasing subject level with shortcuts."
  },
  {
    name: "greeshu143bb",
    date: "1 year ago",
    rating: 5,
    text: "Very good institution in guntur well teaching team and they also focus on our career guidance too"
  },
  {
    name: "Muskaan",
    date: "2 years ago",
    rating: 5,
    text: "One of the best coaching center ever. Ramarao sir teaches well. his teaching skills are just amazing 🤩. joining in this Institute for ur compitative exams will be ur best decision. I highly recommend you joining here. I am also a student of this coaching center. The facility are also so good nd talented. …"
  },
  {
    name: "Mani Durga Ch",
    date: "",
    rating: 5,
    text: "Good morning 😊, SACE faculty is highly certified and knowledgeable persons. Iam very proud of them because iam one of the student in The SACE coaching center, it's provide best coaching for GATE exam very well teaching, SACE coaching very helpful to everyone, finally thanks for SACE faculty …"
  },
  {
    name: "Rathala Dharma Teja Naik",
    date: "",
    rating: 5,
    text: "I am the student of sace.i have joined here for GATE couching. they explained me previous question papers with examples. they conducted weekly examinations to correct our mistakes. There faculty is well experienced and they teaching is amazing. They thought me the shortcut's which is helpful in our examination point. Thankyou SACE for wonderful teaching"
  },
  {
    name: "Kokkera Sirisha",
    date: "",
    rating: 5,
    text: "I am the student of the SACE academy, I have joined here for the GATE couching. There explanation is awesome,there facultys are well trained, they have great experience of teaching, they helped me to gain good marks. Thank you SACE for the wonderful couching"
  }
];

const REVIEWS_PER_BATCH = 5;

function initializeSaceGoogleReviews() {
  const reviewsList = document.getElementById("google-reviews-list");
  const showMoreButton = document.getElementById("show-more-reviews");
  const emptyMessage = document.getElementById("google-reviews-empty");

  if (!reviewsList || !showMoreButton || !emptyMessage) return;

  // Avoid duplicate cards if initialization runs more than once.
  reviewsList.replaceChildren();

  const validReviews = saceGoogleReviews.filter((review) =>
    typeof review.name === "string" &&
    review.name.trim() !== "" &&
    typeof review.text === "string" &&
    review.text.trim() !== "" &&
    Number.isInteger(review.rating) &&
    review.rating >= 1 &&
    review.rating <= 5
  );

  let visibleReviews = 0;

  function createReviewCard(review) {
    const card = document.createElement("article");
    card.className = "google-review-card";

    const top = document.createElement("div");
    top.className = "google-review-top";

    const avatar = document.createElement("div");
    avatar.className = "google-review-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = review.name.trim().charAt(0).toUpperCase();

    const identity = document.createElement("div");
    identity.className = "google-review-identity";

    const name = document.createElement("p");
    name.className = "google-review-reviewer";
    name.textContent = review.name;

    // const date = document.createElement("p");
    // date.className = "google-review-date";
    // date.textContent = review.date || "Google reviewer";

    identity.append(name);

    const googleMark = document.createElement("span");
    googleMark.className = "google-review-google";
    googleMark.setAttribute("aria-label", "Google review");
    googleMark.textContent = "G";

    top.append(avatar, identity, googleMark);

    const stars = document.createElement("p");
    stars.className = "google-review-stars";
    stars.setAttribute("role", "img");
    stars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
    stars.textContent =
      "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    const text = document.createElement("p");
    text.className = "google-review-text";
    text.textContent = review.text;

    card.append(top, stars, text);

    return card;
  }

  function renderMoreReviews() {
    const nextBatch = validReviews.slice(
      visibleReviews,
      visibleReviews + REVIEWS_PER_BATCH
    );

    const fragment = document.createDocumentFragment();

    nextBatch.forEach((review) => {
      fragment.appendChild(createReviewCard(review));
    });

    reviewsList.appendChild(fragment);
    visibleReviews += nextBatch.length;

    showMoreButton.hidden = visibleReviews >= validReviews.length;
    emptyMessage.hidden = validReviews.length > 0;

    if (visibleReviews < validReviews.length) {
      const remaining = validReviews.length - visibleReviews;
      showMoreButton.textContent =
        `Show More Reviews`;
    }
  }

  showMoreButton.addEventListener("click", renderMoreReviews);

  renderMoreReviews();
}

// Works whether this script loads before or after the HTML.
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeSaceGoogleReviews,
    { once: true }
  );
} else {
  initializeSaceGoogleReviews();
}




/* SACE Faculty Carousel */
(() => {
  const section = document.querySelector(".sace-faculty");
  if (!section) return;

  const cards = [...section.querySelectorAll(".sfc-card")];
  const dots = [...section.querySelectorAll(".sfc-dots button")];
  const prev = section.querySelector(".sfc-prev");
  const next = section.querySelector(".sfc-next");

  if (!cards.length) return;

  let active = 1;

  function render() {
    cards.forEach((card, index) => {
      const position =
        (index - active + cards.length) % cards.length;

      card.dataset.position =
        position === 0 ? "center" :
        position === 1 ? "right" : "left";

      card.classList.toggle("is-active", position === 0);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === active);
    });
  }

  function moveNext() {
    active = (active + 1) % cards.length;
    render();
  }

  function movePrev() {
    active = (active - 1 + cards.length) % cards.length;
    render();
  }

  next.addEventListener("click", moveNext);
  prev.addEventListener("click", movePrev);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      active = index;
      render();
    });
  });

  render();
})();
