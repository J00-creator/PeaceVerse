
// ---- Blinking Stars ----
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 150;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        brightness: Math.random() * 0.7 + 0.3, // Set initial brightness
        blinkSpeed: Math.random() * 0.005 + 0.002 // Random blink speed
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
    });
}

function animateStars() {
    stars.forEach((star) => {
        star.brightness += star.blinkSpeed;
        if (star.brightness >= 1 || star.brightness <= 0.3) {
            star.blinkSpeed *= -1;
        }
    });
    drawStars();
    requestAnimationFrame(animateStars);
}

// Start animation
animateStars();

// ---- Comets with Tails ----
function createComet() {
    const comet = document.createElement("div");
    comet.classList.add("comet");

    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight / 2;

    // Set initial position
    comet.style.left = `${startX}px`;
    comet.style.top = `${startY}px`;

    // Append to comet container
    document.getElementById("comets-container").appendChild(comet);

    // Animate comet movement
    comet.style.animation = `cometAnimation 4s linear`;

    // Remove comet after animation
    setTimeout(() => {
        comet.remove();
    }, 4000);
}

// Generate comets every 3 seconds
setInterval(createComet, 3000);

// Show the modal when "Subscribe" button is clicked
document.getElementById("subscribeButton").addEventListener("click", function () {
    document.getElementById("subscriptionModal").style.display = "flex";
});

// Close the modal
function closeModal() {
    document.getElementById("subscriptionModal").style.display = "none";
}

function submitEmail() {
    var email = document.getElementById("emailInput").value.trim();

    if (!email) {
        alert("Please enter an email.");
        return;
    }

    fetch("https://formspree.io/f/xanokaoj", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        let responseMessage = document.getElementById("responseMessage");
        if (response.ok) {
            responseMessage.innerText = "Subscribed successfully! Please check your email.";
            responseMessage.style.color = "lightgreen";
            document.getElementById("emailInput").value = "";
        } else {
            responseMessage.innerText = "There was an error. Please try again.";
            responseMessage.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        let responseMessage = document.getElementById("responseMessage");
        responseMessage.innerText = "An error occurred. Please try again later.";
        responseMessage.style.color = "red";
    });
}
