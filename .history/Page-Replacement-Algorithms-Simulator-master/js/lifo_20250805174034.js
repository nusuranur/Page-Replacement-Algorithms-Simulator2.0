// Define a class called lifo to simulate LIFO (Last In First Out) page replacement
class lifo {
    constructor(capacity) {
        this.capacity = capacity;       // Total number of frames available
        this.pageFaults = 0;            // Counter for page faults (misses)
        this.pageHits = 0;              // Counter for page hits
        this.searchIndex = -1;          // Index to check if a page is already in frame
        this.frames = [];               // Array to store current pages in frames
    }

    // Method to process a page reference
    refer(token) {
        // Check if the page is already in frames
        this.searchIndex = this.frames.indexOf(token);

        if (this.searchIndex != -1) {
            // If found (HIT), increase hit counter
            this.pageHits++;
        } else {
            // If not found (MISS), increase fault counter
            this.pageFaults++;

            // If frame is full, remove the last inserted page (LIFO logic)
            if (this.capacity == this.frames.length) {
                this.frames.pop();
            }

            // Insert the new page into the frame
            this.frames.push(token);
        }
    }
}

// Add event listener to the submit button, triggers the LIFO function when clicked
document.getElementById("submit").addEventListener("click", LIFO);

// Main function to simulate LIFO page replacement
function LIFO() {
    // Get user input and split into page reference array
    let res = document.getElementById("input").value.split(" ");
    let frames = document.getElementById("frames").value;
    let ref = [];

    // Clean the input to remove extra spaces
    for (let i = 0; i < res.length; i++) {
        if (res[i] != " " && res[i] != "") {
            ref.push(res[i]);
        }
    }

    // Create table layout for visualization
    createTable("table", frames, ref);

    // Create a LIFO simulation object
    let obj = new lifo(frames);

    // Iterate over each reference string
    for (let i = 0; i < ref.length; i++) {
        obj.refer(ref[i]); // Process the current page reference

        // Fill the corresponding column in the table
        fillcol("table", i + 1, obj.frames, frames, obj.searchIndex);
    }

    // Display the summary result (hits, misses, ratios)
    summary('summary', obj.pageFaults, obj.pageFaults + obj.pageHits, frames);
}

// Fill a column in the result table with frame values and HIT/MISS status
function fillcol(tablename, col, objframes, n, searchindex) {
    // Fill each frame cell in the current column
    for (let i = 1; i <= objframes.length; i++) {
        let cell = document.getElementById(tablename + i + '' + col);
        cell.innerHTML = objframes[i - 1]; // Display the page in frame
    }

    n++; // Move to the "Status" row (last row)
    let cell = document.getElementById(tablename + n + '' + col);

    // Display MISS or HIT in the status row
    if (searchindex == -1) cell.innerHTML = "MISS";
    else {
        cell.innerHTML = "HIT";

        // Highlight the HIT page in green
        document.getElementById(tablename + (searchindex + 1) + '' + col).classList.add("bg-success", "text-white");
    }
}

// Create a visual table to show the reference string, frames, and HIT/MISS status
function createTable(tablename, frames, ref) {
    document.getElementById(tablename).innerHTML = ""; // Clear any previous table content

    // Create the top header row with reference string
    let table = '<tr class="font-weight-bold"><td id="' + tablename + '00">Reference</td>';
    for (let i = 0; i < ref.length; i++) {
        table += '<td id="' + tablename + '0' + (i + 1) + '">' + ref[i] + "</td>";
    }
    table += "</tr>";

    // Create rows for each frame
    for (let i = 0; i < frames; i++) {
        table += '<tr><td class="font-weight-bold" id="' + tablename + (i + 1) + '0">Frame ' + (i + 1) + "</td>";
        for (let j = 0; j < ref.length; j++) {
            table += '<td id="' + tablename + (i + 1) + (j + 1) + '"></td>';
        }
        table += "</tr>";
    }

    // Add the final row for showing HIT/MISS status
    frames++;
    table += '<tr><td class="font-weight-bold" id="' + tablename + frames + '0">Status</td>';
    for (var j = 1; j <= ref.length; j++) {
        table += '<td id="' + tablename + frames + j + '"></td>';
    }
    table += "</tr>";

    // Print the table into the HTML
    document.getElementById(tablename).innerHTML += table;
}

// Display a summary of total pages, frames, hits, faults, and hit/miss ratios
function summary(id, pagefaults, pages, frames) {
    let summary = "";
    let missratio = (pagefaults / pages).toPrecision(2);     // Calculate miss ratio
    let hitratio = (1 - missratio).toPrecision(2);            // Calculate hit ratio

    // Create summary info
    summary += `<div>Pages:${pages}</div>`;
    summary += `<div>Frames:${frames}</div>`;
    summary += `<div>Hits:${pages - pagefaults}</div>`;
    summary += `<div>Faults:${pagefaults}</div>`;
    summary += `<div>Hit Ratio:${hitratio}</div>`;
    summary += `<div>Miss Ratio:${missratio}</div>`;

    // Display summary in the summary element
    document.getElementById(id).innerHTML = summary;
}

// Hide/show navigation bar based on scroll direction
window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        // Scroll down: hide navbar with animation
        document.getElementsByClassName('navbar')[0].classList.add('animate__slideOutUp');
        setTimeout(() => {
            document.getElementsByClassName('navbar')[0].style.display = 'none';
            document.getElementsByClassName('navbar')[0].classList.remove('animate__slideOutUp');
        }, 100);
    } else {
        // Scroll up: show navbar again with animation
        if (document.getElementsByClassName('navbar')[0].style.display === 'none') {
            document.getElementsByClassName('navbar')[0].classList.add('animate__slideInDown');
            setTimeout(() => {
                document.getElementsByClassName('navbar')[0].style.display = 'block';
            }, 50);
            setTimeout(() => {
                document.getElementsByClassName('navbar')[0].classList.remove('animate__slideInDown');
            }, 500);
        }
    }
});

