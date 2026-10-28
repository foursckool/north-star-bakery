// ==========================================
// 1. FAVORITES TRACKER (Storage & Interactivity)
// ==========================================

// Load favorites from localStorage, or start with an empty array
let favorites = JSON.parse(localStorage.getItem('bakeryFavorites')) || [];

// Function to render the favorites list on the page
function renderFavorites() {
    const favContainer = document.getElementById('favorites-list');
    if (!favContainer) return; // Exit if the container isn't on this page
    
    if (favorites.length === 0) {
        favContainer.innerHTML = '<p>You have no saved favorites yet.</p>';
        return;
    }

    let html = '<ul>';
    favorites.forEach(item => {
        html += `<li>${item}</li>`;
    });
    html += '</ul>';
    favContainer.innerHTML = html;
}

// Function to save an item to the favorites list
function saveFavorite(itemName) {
    if (!favorites.includes(itemName)) {
        favorites.push(itemName);
        localStorage.setItem('bakeryFavorites', JSON.stringify(favorites));
        alert(`${itemName} has been saved to your favorites!`);
        renderFavorites();
    } else {
        alert(`${itemName} is already in your favorites!`);
    }
}

// Add event listeners to all "Save to Favorites" buttons
document.addEventListener('DOMContentLoaded', () => {
    renderFavorites();

    const favButtons = document.querySelectorAll('.save-fav-btn');
    favButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-item');
            saveFavorite(itemName);
        });
    });

    // Pre-fill the contact form message with favorites if we are on the contact page
    const messageBox = document.getElementById('item-details');
    if (messageBox && favorites.length > 0) {
        messageBox.value = `Hi North Star Bakery, I would like to pre-order the following favorites:\n- ${favorites.join('\n- ')}`;
    }
});

// ==========================================
// 2. FORM VALIDATION
// ==========================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop normal submission

        // Get values
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        
        let isValid = true;

        // Validate Name (Minimum length check)
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Please enter a valid name (at least 2 characters).';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Validate Email (Format check)
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailInput.value.match(emailPattern)) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // If everything is valid, show success
        if (isValid) {
            alert('Thank you! Your request has been sent successfully.');
            contactForm.reset(); // Clear the form
            // Optional: Clear favorites after successful pre-order
            // localStorage.removeItem('bakeryFavorites');
            // favorites = [];
            // renderFavorites();
        }
    });
}
