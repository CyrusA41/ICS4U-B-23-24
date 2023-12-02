// Get references to the burger icon and navbar menu
const burgerIcon = document.querySelector('#burger')
const navbarMenu = document.querySelector('#nav-links')

// Toggle the 'is-active' class on the navbar menu when the burger icon is clicked
burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active')
})

// Retrieve score and match data from localStorage, or initialize empty arrays if not present
let scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];
let matchData = JSON.parse(localStorage.getItem('matchData')) || [];
const matchDateInput = document.getElementById('matchDate');

// Initialize an empty array for filtered scores
let filteredScores = []

// Extract team parameter from the URL
const url = window.location.search
const searchParams = new URLSearchParams(url)
const team = searchParams.get('team')

        // let tempArray = [
        //     // Example match data
        //     { homeTeam: "Wolves", awayTeam: "Tottenham", homeScore: 2, awayScore: 1},
        //     { homeTeam: "Man United", awayTeam: "Luton Town", homeScore: 1, awayScore: 0},
        //     { homeTeam: "Arsenal", awayTeam: "Burnley", homeScore: 3, awayScore: 1},
        //     { homeTeam: "Crystal Palace", awayTeam: "Everton", homeScore: 2, awayScore: 3},
        //     { homeTeam: "Bournemouth", awayTeam: "Newcastle", homeScore: 2, awayScore: 0},
        //     { homeTeam: "Aston Villa", awayTeam: "Fulham", homeScore: 3, awayScore: 1},
        //     { homeTeam: "Brighton", awayTeam: "Sheffield United", homeScore: 1, awayScore: 1},
        //     { homeTeam: "West Ham", awayTeam: "Nottm Forest", homeScore: 3, awayScore: 2},
        //     { homeTeam: "Liverpool", awayTeam: "Brentford", homeScore: 3, awayScore: 0},
        //     { homeTeam: "Chelsea", awayTeam: "Man City", homeScore: 4, awayScore: 4},
        //     { homeTeam: "Arsenal", awayTeam: "Brentford", homeScore: 1, awayScore: 0},
        //     // Add more match data as needed
        // ];


// Set the number of matches to display per page and initialize current page
const matchesPerPage = 10;
let currentPage = 1;

// Get references to HTML elements for match display, pagination, and navigation buttons
const matchContainer = document.getElementById("match-container");
const paginationList = document.getElementById("pagination-list");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");

// Function to display matches based on the current page and team filter
function displayMatches() {
    matchContainer.innerHTML = ""; // Clear existing match display

    const startIndex = (currentPage - 1) * matchesPerPage;
    const endIndex = startIndex + matchesPerPage;

    const startDate = new Date(document.getElementById('startDate').value) || ''
    const endDate = new Date(document.getElementById('endDate').value) || ''
    let realMatches = 0

    

    // Loop through matches within the current page range and display them
    for (let i = startIndex; i < endIndex && i < matchData.length; i++) {
        const match = matchData[i];

        const matchCard = document.createElement("div");
        matchCard.className = "column is-half";

        console.log((new Date(match.date).getTime()<=endDate.getTime() && new Date(match.date).getTime()>=startDate.getTime())||startDate=='Invalid Date'||endDate=='Invalid Date')
        console.log(startDate)
        console.log(endDate)

        if((new Date(match.date).getTime()<=endDate.getTime()+86400000 && new Date(match.date).getTime()>=startDate.getTime())||startDate=='Invalid Date'||endDate=='Invalid Date'){

            // Display match information in a card if the team filter is null or matches the home or away team
            if (team === null || (match.homeTeam === team || match.awayTeam === team)) {
                matchCard.innerHTML = `
                <div class="card">
                    <div class="card-content">
                        <p class="title has-text-centered">${match.homeTeam} vs ${match.awayTeam}</p>
                        <p class="subtitle has-text-centered">${match.homeScore} - ${match.awayScore}</p>
                        <p class="subtitle has-text-centered">Date: ${match.date}</p>
                    </div>
                </div> 
            `;

                matchContainer.appendChild(matchCard);

                if(team !== null){
                    const title = document.getElementById('title')
                    title.innerText = team + "'s Matches"
                }
            }
        }
    }

    // Update pagination links
    updatePagination();
}

function filterDates(){
    const startDate = new Date(document.getElementById('startDate').value) || ''
    const endDate = new Date(document.getElementById('endDate').value) || ''

    if(startDate.getTime()<endDate.getTime()){
        displayMatches();
    }
}

// Function to update pagination links based on the total number of pages
function updatePagination() {
    const totalPages = Math.ceil(matchData.length / matchesPerPage);
    paginationList.innerHTML = ""; // Clear existing pagination links

    // Create pagination links for each page
    for (let i = 1; i <= totalPages; i++) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a class="pagination-link ${i === currentPage ? 'is-current' : ''}" aria-label="Goto page ${i}" data-page="${i}">${i}</a>`;
        paginationList.appendChild(listItem);
    }
}

// Function to navigate to a specific page
function goToPage(page) {
    currentPage = page;
    displayMatches();
}

// Event listeners for previous page, next page, and pagination links
prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
});

nextPageButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(matchData.length / matchesPerPage)) {
        goToPage(currentPage + 1);
    }
});

paginationList.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        const page = parseInt(event.target.getAttribute("data-page"));
        if (!isNaN(page)) {
            goToPage(page);
        }
    }
});

// Get references to the score form elements
const form = document.getElementById('scoreForm');

// Event listener for the score form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values from the form
    const team1Select = document.getElementById('team1');
    const team1ScoreInput = document.getElementById('team1Score');
    const team2Select = document.getElementById('team2');
    const team2ScoreInput = document.getElementById('team2Score');
    const dateValue = matchDateInput.value;
    const date = new Date(dateValue).toLocaleDateString();

    const team1 = team1Select.value;
    const team1Score = parseInt(team1ScoreInput.value);
    const team2 = team2Select.value;
    const team2Score = parseInt(team2ScoreInput.value);

    // Validate input and add the score to the data arrays
    if (!isNaN(team1Score) && !isNaN(team2Score) && dateValue !== '') {
        const score = { homeTeam: team1, awayTeam: team2, homeScore: team1Score, awayScore: team2Score, date: date };
        matchData.push(score);
        scoreData.push(score);
        localStorage.setItem('scoreData', JSON.stringify(scoreData));
        localStorage.setItem('matchData', JSON.stringify(scoreData));
        matchDateInput.value = '';
        team1Select.value = 'Arsenal';
        team1ScoreInput.value = '';
        team2Select.value = 'Arsenal';
        team2ScoreInput.value = '';
        displayMatches();
    }
});

// Filter scores based on the team parameter from the URL
if (team !== null) {
    filteredScores = scoreData.filter((el) => {
        return el.homeTeam == (team) || el.awayTeam == team
    })
}

// Initial display of matches
displayMatches();
