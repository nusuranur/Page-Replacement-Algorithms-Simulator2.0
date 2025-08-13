// Define the Optimal page replacement algorithm class
class optimal {
    constructor(capacity) {
        this.capacity = capacity;     // Maximum number of frames
        this.pageFaults = 0;          // Counter for page faults
        this.pageHits = 0;            // Counter for page hits
        this.searchIndex = -1;        // Index of page hit, or -1 if miss
        this.frames = [];             // Current pages in memory frames
        this.sr = [];                 // Next use index for each frame's page
    }

    // Handle referencing a page (token), with remaining pages in future
    refer(token, remaining) {
        this.searchIndex = this.frames.indexOf(token);

        if (this.searchIndex !== -1) {
            // Page hit
            this.pageHits++;
        } else {
            // Page fault
            this.pageFaults++;

            if (this.frames.length === this.capacity) {
                // Frames full: update next use for all current pages
                for (let i = 0; i < this.frames.length; i++) {
                    let futureIndex = remaining.indexOf(this.frames[i]);
                    if (futureIndex === -1) futureIndex = Number.MAX_SAFE_INTEGER;
                    this.sr[i] = futureIndex;
                }

                // Find frame whose page is used farthest in future or never used
                let farthest = Math.max(...this.sr);
                let replaceIndex = this.sr.indexOf(farthest);

                // Replace that page with the new page (token)
                this.frames[replaceIndex] = token;

                // Update next use for the new page
                let futureIndex = remaining.indexOf(token);
                if (futureIndex === -1) futureIndex = Number.MAX_SAFE_INTEGER;
                this.sr[replaceIndex] = futureIndex;

            } else {
                // Frames not full: just add the new page
                this.frames.push(token);

                let futureIndex = remaining.indexOf(token);
                if (futureIndex === -1) futureIndex = Number.MAX_SAFE_INTEGER;
                this.sr.push(futureIndex);
            }
        }
    }
}

// Attach event listener to submit button
document.getElementById("submit").addEventListener("click", OPTIMAL);

function OPTIMAL() {
    let res = document.getElementById("input").value.split(" "); // Reference string input
    let frames = parseInt(document.getElementById("frames").value); // Number of frames
    let ref = [];

    // Clean and filter input (ignore extra spaces)
    for (let i = 0; i < res.length; i++) {
        if (res[i] !== " " && res[i] !== "") {
            ref.push(res[i]);
        }
    }

    createTable("table", frames, ref);           // Generate table structure
    let obj = new optimal(frames);               // Create optimal instance

    // Process each page reference
    for (let i = 0; i < ref.length; i++) {
        obj.refer(ref[i], ref.slice(i + 1));     // Current page and future pages
        fillcol("table", i + 1, obj.frames, frames, obj.searchIndex); // Update UI table
    }

    // Show final stats
    summary('summary', obj.pageFaults, obj.pageFaults + obj.pageHits, frames);

    // Send simulation data to PHP server (form-encoded POST)
    sendSimulationToServer(
        ref.join(" "),
        frames,
        "OPTIMAL",
        obj.pageHits,
        obj.pageFaults,
        (obj.pageHits / (obj.pageHits + obj.pageFaults)).toFixed(2),
        (obj.pageFaults / (obj.pageHits + obj.pageFaults)).toFixed(2)
    );
}

// Send simulation results to server using form URL-encoded data (compatible with PHP)
function sendSimulationToServer(ref_string, frames, algorithm, hits, faults, hit_ratio, miss_ratio) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/save_simulation.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const data = `ref_string=${encodeURIComponent(ref_string)}&frames=${frames}&algorithm=${algorithm}&hits=${hits}&faults=${faults}&hit_ratio=${hit_ratio}&miss_ratio=${miss_ratio}`;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log("Server response:", xhr.responseText);
        }
    };

    xhr.send(data);
}

// Update one column of the table (one time step)
function fillcol(tablename, col, objframes, n, searchindex) {
    for (let i = 1; i <= objframes.length; i++) {
        let cell = document.getElementById(tablename + i + '' + col);
        cell.innerHTML = objframes[i - 1]; // Display page in frame
        cell.classList.remove("bg-success", "text-white"); // Remove old highlights
    }

    // Show HIT or MISS
    n++; // row for status
    let cell = document.getElementById(tablename + n + '' + col);
    if (searchindex === -1) {
        cell.innerHTML = "MISS";
    } else {
        cell.innerHTML = "HIT";
        document.getElementById(tablename + (searchindex + 1) + '' + col)
            .classList.add("bg-success", "text-white"); // Highlight hit frame cell
    }
}

// Create the dynamic table based on number of frames and reference string length
function createTable(tablename, frames, ref) {
    let tableHTML = "";

    // Header row: reference string values
    tableHTML += '<tr class="font-weight-bold"><td id="' + tablename + '00">Reference</td>';
    for (let i = 0; i < ref.length; i++) {
        tableHTML += '<td id="' + tablename + '0' + (i + 1) + '">' + ref[i] + '</td>';
    }
    tableHTML += "</tr>";

    // Frame rows
    for (let i = 0; i < frames; i++) {
        tableHTML += '<tr><td class="font-weight-bold" id="' + tablename + (i + 1) + '0">Frame ' + (i + 1) + '</td>';
        for (let j = 0; j < ref.length; j++) {
            tableHTML += '<td id="' + tablename + (i + 1) + (j + 1) + '"></td>';
        }
        tableHTML += "</tr>";
    }

    // Status row - HIT/MISS
    const statusRow = frames + 1;
    tableHTML += '<tr><td class="font-weight-bold" id="' + tablename + statusRow + '0">Status</td>';
    for (let j = 1; j <= ref.length; j++) {
        tableHTML += '<td id="' + tablename + statusRow + j + '"></td>';
    }
    tableHTML += "</tr>";

    document.getElementById(tablename).innerHTML = tableHTML;
}

// Display summary statistics below the table
function summary(id, pagefaults, pages, frames) {
    let missratio = (pagefaults / pages).toPrecision(2);
    let hitratio = (1 - missratio).toPrecision(2);

    let summaryHTML = `
        <div>Pages: ${pages}</div>
        <div>Frames: ${frames}</div>
        <div>Hits: ${pages - pagefaults}</div>
        <div>Faults: ${pagefaults}</div>
        <div>Hit Ratio: ${hitratio}</div>
        <div>Miss Ratio: ${missratio}</div>
    `;

    document.getElementById(id).innerHTML = summaryHTML;
}

// Navbar hide/show on scroll
window.addEventListener('wheel', (e) => {
    const navbar = document.getElementsByClassName('navbar')[0];
    if (e.deltaY > 0) { // Scrolling down
        navbar.classList.add('animate__slideOutUp');
        setTimeout(() => {
            navbar.style.display = 'none';
            navbar.classList.remove('animate__slideOutUp');
        }, 100);
    } else { // Scrolling up
        if (navbar.style.display === 'none') {
            navbar.classList.add('animate__slideInDown');
            setTimeout(() => {
                navbar.style.display = 'block';
            }, 50);
            setTimeout(() => {
                navbar.classList.remove('animate__slideInDown');
            }, 500);
        }
    }
});
