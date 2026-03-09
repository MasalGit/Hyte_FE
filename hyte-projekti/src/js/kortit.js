// Check for token at the start
const token = localStorage.getItem("token");

if (!token) {
    alert("You must be logged in to view this page.");
    window.location.href = "/login.html"; // redirect to login page
    throw new Error("No token, stopping page load.");
}

// Headers for all requests
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
};

// DOM element for cards
const container = document.getElementById("entriesContainer");

// Function to render entries as cards
function renderEntries(entries) {
    container.innerHTML = ""; // clear previous cards

    entries.forEach(entry => {
        const card = document.createElement("div");
        card.classList.add("card");

        const date = new Date(entry.entry_date).toLocaleDateString("fi-FI");

        card.innerHTML = `
            <img src="./img/Entry.jpg" class="card-img" alt="Diary">
            <p><strong>ID:</strong> ${entry.entry_id}</p>
            <p class="date"><strong>${date}</strong></p>
            <p><strong>Mood:</strong> ${entry.mood ?? "-"}</p>
            <p><strong>Weight:</strong> ${entry.weight ?? "-"} kg</p>
            <p><strong>Sleep:</strong> ${entry.sleep_hours ?? "-"} h</p>
            <p><strong>Notes:</strong> ${entry.notes ?? "-"}</p>
        `;

        container.appendChild(card);
    });
}

// Load all entries
async function loadEntries() {
    try {
        const res = await fetch("http://localhost:3000/api/entries", { headers });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        renderEntries(data);
    } catch (err) {
        console.error(err);
        alert("Failed to load entries.");
    }
}

// Add a new entry
async function addEntry() {
    const entry_date = prompt("Enter date (YYYY-MM-DD):");
    const mood = prompt("Mood (optional):");
    const weight = prompt("Weight (optional):");
    const sleep_hours = prompt("Sleep hours (optional):");
    const notes = prompt("Notes (optional):");

    const entry = { entry_date, mood, weight, sleep_hours, notes };

    try {
        const res = await fetch("http://localhost:3000/api/entries", {
            method: "POST",
            headers,
            body: JSON.stringify(entry)
        });

        const data = await res.json();
        if (res.ok) {
            alert("Entry added.");
            loadEntries();
        } else {
            alert(`Failed to add entry: ${data.error || "unknown error"}`);
        }
    } catch (err) {
        console.error(err);
        alert("Error adding entry.");
    }
}

// Update an entry
async function updateEntry() {
    const id = prompt("Enter entry ID to update:");
    if (!id) return alert("ID required");

    const mood = prompt("Mood (optional):");
    const weight = prompt("Weight (optional):");
    const sleep_hours = prompt("Sleep hours (optional):");
    const notes = prompt("Notes (optional):");

    const entry = { mood, weight, sleep_hours, notes };

    try {
        const res = await fetch(`http://localhost:3000/api/entries/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(entry)
        });

        const data = await res.json();
        if (res.ok) {
            alert("Entry updated.");
            loadEntries();
        } else {
            alert(`Failed to update entry: ${data.error || "unknown error"}`);
        }
    } catch (err) {
        console.error(err);
        alert("Error updating entry.");
    }
}

// Delete an entry
async function deleteEntry() {
    const id = prompt("Enter entry ID to delete:");
    if (!id) return alert("ID required");

    try {
        const res = await fetch(`http://localhost:3000/api/entries/${id}`, {
            method: "DELETE",
            headers
        });

        const data = await res.json();
        if (res.ok) {
            alert("Entry deleted.");
            loadEntries();
        } else {
            alert(`Failed to delete entry: ${data.error || "unknown error"}`);
        }
    } catch (err) {
        console.error(err);
        alert("Error deleting entry.");
    }
}

// Attach button event listeners
document.getElementById("loadEntriesBtn").addEventListener("click", loadEntries);
document.getElementById("addEntryBtn").addEventListener("click", addEntry);
document.getElementById("updateEntryBtn").addEventListener("click", updateEntry);
document.getElementById("deleteEntryBtn").addEventListener("click", deleteEntry);
