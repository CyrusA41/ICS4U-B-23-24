// Get references to the burger icon and navbar menu
const burgerIcon = document.querySelector('#burger')
const navbarMenu = document.querySelector('#nav-links')

// Toggle the 'is-active' class on the navbar menu when the burger icon is clicked
burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active')
})

// Array of team data
const teams = [
    // {Name: "Man City", W: 9, D: 1, L: 2, GF: 32, GA: 12, GD: 20, PTS: 28, LAST5: "DWWWL"},
    // {Name: "Liverpool", W: 8, D: 3, L: 1, GF: 27, GA: 10, GD: 17, PTS: 27, LAST5: "WDWWD"},
    // {Name: "Arsenal", W: 8, D: 3, L: 1, GF: 26, GA: 10, GD: 16, PTS: 27, LAST5: "WLWDW"},
    // {Name: "Tottenham", W: 8, D: 2, L: 2, GF: 24, GA: 15, GD: 9, PTS: 26, LAST5: "LLWWW"},
    // {Name: "Aston Villa", W: 8, D: 1, L: 3, GF: 29, GA: 17, GD: 12, PTS: 25, LAST5: "WLWWD"},
    // {Name: "Man United", W: 7, D: 0, L: 5, GF: 13, GA: 16, GD: -3, PTS: 21, LAST5: "WWLWW"},
    // {Name: "Newcastle", W: 6, D: 2, L: 4, GF: 27, GA: 13, GD: 14, PTS: 20, LAST5: "LWDWD"},
    // {Name: "Brighton", W: 5, D: 4, L: 3, GF: 25, GA: 21, GD: 4, PTS: 19, LAST5: "DDDLD"},
    // {Name: "West Ham", W: 5, D: 2, L: 5, GF: 21, GA: 22, GD: -1, PTS: 17, LAST5: "WLLLD"},
    // {Name: "Chelsea", W: 4, D: 4, L: 4, GF: 21, GA: 16, GD: 5, PTS: 16, LAST5: "DWLDW"},
    // {Name: "Brentford", W: 4, D: 4, L: 4, GF: 19, GA: 17, GD: 2, PTS: 16, LAST5: "LWWWL"},
    // {Name: "Wolves", W: 4, D: 3, L: 5, GF: 16, GA: 20, GD: -4, PTS: 15, LAST5: "WLDWD"},
    // {Name: "Crystal Palace", W: 4, D: 3, L: 5, GF: 16, GA: 20, GD: -4, PTS: 15, LAST5: "LWLLD"},
    // {Name: "Everton", W: 4, D: 2, L: 6, GF: 14, GA: 17, GD: -3, PTS: 14, LAST5: "WDWLW"},
    // {Name: "Nottm Forest", W: 3, D: 4, L: 5, GF: 14, GA: 18, GD: -4, PTS: 13, LAST5: "LWLDD"},
    // {Name: "Fulham", W: 3, D: 3, L: 6, GF: 10, GA: 20, GD: -10, PTS: 12, LAST5: "LLDLW"},
    // {Name: "Bournemouth", W: 2, D: 3, L: 7, GF: 11, GA: 27, GD: -16, PTS: 9, LAST5: "WLWLL"},
    // {Name: "Luton Town", W: 1, D: 3, L: 8, GF: 10, GA: 22, GD: -12, PTS: 6, LAST5: "LDLDL"},
    // {Name: "Sheffield United", W: 1, D: 2, L: 9, GF: 10, GA: 31, GD: -21, PTS: 5, LAST5: "DWLLL"},
    // {Name: "Burnley", W: 1, D: 1, L: 10, GF: 9, GA: 30, GD: -21, PTS: 4, LAST5: "LLLLL"},
]

// Function to create and populate the teams table
function createTable() {
    const tbody = document.querySelector("tbody")
    tbody.innerHTML = '';
    teams.forEach(team => {// Create a table row for each team and fill in the data
        // Also includes responsive design for smaller screens
        let row = document.createElement("tr")
        let cell = document.createElement("td")
        cell.innerHTML = `<a href="matches.html?team=${team.name}">${team.name}</a>`;
        row.append(cell)

        cell = document.createElement("td")
        cell.textContent = team.w;
        row.append(cell)

        cell = document.createElement("td")
        cell.textContent = team.d;
        row.append(cell)

        cell = document.createElement("td")
        cell.textContent = team.l;
        row.append(cell)

        cell = document.createElement("td")
        cell.textContent = team.pts;
        row.append(cell)
        if(window.innerWidth>768){
            cell = document.createElement("td")
            cell.textContent = team.gf;
            row.append(cell)

            cell = document.createElement("td")
            cell.textContent = team.ga;
            row.append(cell)

            cell = document.createElement("td")
            cell.textContent = team.gd;
            row.append(cell)

            cell = document.createElement("td")
            cell.textContent = team.last5;
            row.append(cell)
        }

        tbody.append(row)
    })
}

createTable(teams);

// Event listeners and functions for sorting table columns
// Includes sorting functions for Wins, Draws, Losses, Goals For, Goals Against,
// Goal Differential, and Points

    const losses = document.querySelector("#L");
    losses.addEventListener('click', (el)=> {
        let sortOrder = el.target.getAttribute("sortOrder")
        sortLosses(sortOrder)
    })

    function sortLosses(sortOrder){
        if(sortOrder == 'DESC'){
            teams.sort((teamA, teamB)=>teamB.l-teamA.l);
            document.querySelector('#L').setAttribute('sortOrder', 'ASC')
        }else{
            teams.sort((teamA, teamB)=>teamA.l-teamB.l);
            document.querySelector('#L').setAttribute('sortOrder', 'DESC')
        }
        createTable(teams); 
    }

    const wins = document.querySelector("#W");
    wins.addEventListener('click', (el)=> {
        let sortOrder = el.target.getAttribute("sortOrder")
        sortWins(sortOrder)
    })

    function sortWins(sortOrder){
        if(sortOrder == 'DESC'){
            teams.sort((teamA, teamB)=>teamB.w-teamA.w);
            document.querySelector('#W').setAttribute('sortOrder', 'ASC')
        }else{
            teams.sort((teamA, teamB)=>teamA.w-teamB.w);
            document.querySelector('#W').setAttribute('sortOrder', 'DESC')
        }
        createTable(teams); 
    }

    const draws = document.querySelector("#D");
    draws.addEventListener('click', (el)=> {
        let sortOrder = el.target.getAttribute("sortOrder")
        sortDraws(sortOrder)
    })

    function sortDraws(sortOrder){
        if(sortOrder == 'DESC'){
            teams.sort((teamA, teamB)=>teamB.d-teamA.d);
            document.querySelector('#D').setAttribute('sortOrder', 'ASC')
        }else{
            teams.sort((teamA, teamB)=>teamA.d-teamB.d);
            document.querySelector('#D').setAttribute('sortOrder', 'DESC')
        }
        createTable(teams); 
    }

    const goalsFor = document.querySelector("#GF");
    goalsFor.addEventListener('click', (el)=> {
        let sortOrder = el.target.getAttribute("sortOrder")
        sortGoalsFor(sortOrder)
    })

    function sortGoalsFor(sortOrder){
        if(sortOrder == 'DESC'){
            teams.sort((teamA, teamB)=>teamB.gf-teamA.gf);
            document.querySelector('#GF').setAttribute('sortOrder', 'ASC')
        }else{
            teams.sort((teamA, teamB)=>teamA.gf-teamB.gf);
            document.querySelector('#GF').setAttribute('sortOrder', 'DESC')
        }
        createTable(teams); 
    }

    const goalsAgainst = document.querySelector("#GA");
    goalsAgainst.addEventListener('click', (el)=> {
        let sortOrder = el.target.getAttribute("sortOrder")
        sortGoalsAgainst(sortOrder)
    })

    function sortGoalsAgainst(sortOrder){
        if(sortOrder == 'DESC'){
            teams.sort((teamA, teamB)=>teamB.ga-teamA.ga);
            document.querySelector('#GA').setAttribute('sortOrder', 'ASC')
        }else{
            teams.sort((teamA, teamB)=>teamA.ga-teamB.ga);
            document.querySelector('#GA').setAttribute('sortOrder', 'DESC')
        }
        createTable(teams); 
    }

    const goalDifferential = document.querySelector("#GD");
    goalDifferential.addEventListener('click', (el)=> {
        let sortOrder = el.target.getAttribute("sortOrder")
        sortGoalsDifferential(sortOrder)
    })

    function sortGoalsDifferential(sortOrder){
        if(sortOrder == 'DESC'){
            teams.sort((teamA, teamB)=>teamB.gd-teamA.gd);
            document.querySelector('#GD').setAttribute('sortOrder', 'ASC')
        }else{
            teams.sort((teamA, teamB)=>teamA.gd-teamB.gd);
            document.querySelector('#GD').setAttribute('sortOrder', 'DESC')
        }
        createTable(teams); 
    }

    const points = document.querySelector("#PTS");
    points.addEventListener('click', (el)=> {
        let sortOrder = el.target.getAttribute("sortOrder")
        sortPoints(sortOrder)
    })

    function sortPoints(sortOrder){
        if(sortOrder == 'DESC'){
            teams.sort((teamA, teamB)=>teamB.pts-teamA.pts);
            document.querySelector('#PTS').setAttribute('sortOrder', 'ASC')
        }else{
            teams.sort((teamA, teamB)=>teamA.pts-teamB.pts);
            document.querySelector('#PTS').setAttribute('sortOrder', 'DESC')
        }
        createTable(teams); 
    }

    let scoreData = JSON.parse(localStorage.getItem('scoreData'))


    // Constructor function for Team objects
    function Team(name) {
        this.name = name;
        this.w = 0
        this.d = 0
        this.l = 0
        this.gf = 0
        this.ga = 0
        this.gd = 0
        this.pts = 0
        this.last5 = ''

        // Checks which team won and which team lost, then updates statistics accordingly
        this.addGame = (thisScore, otherScore, otherIndex) => {
            if(thisScore > otherScore) {
                this.w++
                this.gf+=thisScore
                this.ga+=otherScore
                this.gd=this.gf-this.ga
                this.pts+=3
                this.last5 = "W" + this.last5.substring(0, 4)
            }
            else if(thisScore < otherScore) {
                this.l++
                this.gf+=thisScore
                this.ga+=otherScore
                this.gd=this.gf-this.ga
                this.last5 = "L" + this.last5.substring(0, 4)
            }
            else{
                this.d++
                this.gf+=thisScore
                this.ga+=otherScore
                this.pts++
                this.last5 = "D" + this.last5.substring(0, 4)
            }

            if(otherIndex !== -1) teams[otherIndex].addGame(otherScore, thisScore, -1)
        }
    }

    // Function to initialize team objects based on score data
    function initializeTeams() {
        scoreData.forEach(score => {
            // Check if home and away teams exist in the teams array
            // If not, create new Team objects for them
            if(JSON.stringify(teams).indexOf(score.homeTeam) === -1)
                teams.push(new Team(score.homeTeam))

            if(JSON.stringify(teams).indexOf(score.awayTeam) === -1)
                teams.push(new Team(score.awayTeam))

            const homeTeam = teams.findIndex((e) => e.name === score.homeTeam)

            console.log(teams)

            teams[homeTeam].addGame(score.homeScore, score.awayScore, teams.findIndex((e) => e.name === score.awayTeam))// Add game results for both home and away teams
        })

        teams.sort((teamA, teamB)=>teamB.pts-teamA.pts);// Sort teams based on points in descending order by default
        document.querySelector('#PTS').setAttribute('sortOrder', 'ASC')

        createTable()
    }

    initializeTeams()
