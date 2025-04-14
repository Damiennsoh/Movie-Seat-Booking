// --- Variable Declarations ---
const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// --- Seat Generation Variables ---
let rows = 8;
let seatsPerRow = 10;

// --- Initial Ticket Price ---
let ticketPrice = +movieSelect.value;

// --- Function Declarations ---

// Function to generate seats dynamically
function generateSeats(rows, seatsPerRow) {
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < seatsPerRow; j++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');

            // Add occupied class to some seats (for example, every 7th seat in a row and every 3rd row)
            if ((j + 1) % 7 === 0 && i % 3 === 0) {
                seat.classList.add('occupied');
            }

            row.appendChild(seat);
        }

        container.appendChild(row);
    }
}

// Function to update UI with data from local storage
function updateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    updateSelectedCount(selectedSeats);
}

// Function to save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Function to update total and count of selected seats
function updateSelectedCount(selectedSeats = []) {
    const allSeats = document.querySelectorAll('.row .seat:not(.occupied)');
    const selectedSeatsElements = document.querySelectorAll('.row .seat.selected');

    // Get indices of selected seats among all selectable seats
    const seatsIndex = [...selectedSeatsElements].map(seat => [...allSeats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Update the visual selection state of seats based on the selected indices
    allSeats.forEach((seat, index) => seat.classList.toggle('selected', selectedSeats.includes(index)));

    const selectedSeatsCount = selectedSeats.length;

    // Update the displayed count and total price
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    // Save the currently selected movie data
    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// --- Initial Setup ---
generateSeats(rows, seatsPerRow);
updateUI();

// --- Event Listeners ---

// Event listener for movie selection change
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value; // Update the ticket price
    setMovieData(e.target.selectedIndex, e.target.value); // Save the new movie data
    updateSelectedCount(); // Update the seat count and total
});

// Event listener for seat click
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected'); // Toggle the 'selected' class on the seat

        updateSelectedCount(); // Update the seat count and total
    }
});

// --- Form submission ---
// Add an event listener to the form to handle form submission
const form = document.querySelector('form'); // Assuming there's only one form in the document
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the input fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Display a confirmation message (you can replace this with other actions)
    alert(`Form submitted successfully!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);

    // Here, you can add code to send the data to a server, etc.
});
