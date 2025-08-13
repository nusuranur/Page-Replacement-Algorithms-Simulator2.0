// Define the Optimal page replacement algorithm class
class optimal {
    constructor(capacity){
        this.capacity = capacity;     // Maximum number of frames
        this.pageFaults = 0;          // Counter for page faults
        this.pageHits = 0;            // Counter for page hits
        this.searchIndex = -1;        // Stores the index of the page hit (or -1 if not found)
        this.frames = [];             // Array to hold current pages in memory
        this.sr = [];                 // Array to hold the next use index for each page in memory
    }

    // Function to handle page reference
    refer(token, remaining){
        this.searchIndex = this.frames.indexOf(token); // Check if page already exists in frames

        if(this.searchIndex != -1){   // If page is found (HIT)
            this.pageHits++;          // Increase hit count
        }
        else{                         // If page is not found (FAULT)
            this.pageFaults++;        // Increase fault count

            if(this.capacity == this.frames.length){  // If memory is full
                let t = this.sr.indexOf(-1);          // Check if any page is not used in future
                if(t == -1){
                    // If all pages will be used again, replace the one with the farthest future use
                    t = this.sr.indexOf(Math.max(...this.sr));
                }
                this.frames[t] = token;               // Replace the selected page
                if(remaining.indexOf(token) == -1)
                    this.sr[t] = -1;                  // If the new page won't be used again
                else 
                    this.sr[t] = this.frames.length + 1 + remaining.indexOf(token); // Next use position
            }
            else{
                // If memory is not full yet
                if(remaining.indexOf(token) == -1)
                    this.sr.push(-1);                 // New page won't be used again
                else 
                    this.sr.push(this.frames.length + 1 + remaining.indexOf(token)); // Future use index
                this.frames.push(token);              // Add new page to memory
            }
        }
    }
}

// When submit button is clicked, call OPTIMAL() function
document.getElementById("submit").addEventListener("click", OPTIMAL);

function OPTIMAL(){
    let res = document.getElementById("input").value.split(" "); // Read input reference string
    let frames = document.getElementById("frames").value;        // Read number of frames
    let ref = [];

    // Clean up and store only valid values (ignore extra spaces)
    for (let i = 0; i < res.length; i++) {
        if (res[i] != " " && res[i] != "") {
            ref.push(res[i]);
        }
    }

    createTable("table", frames, ref);           // Generate the reference table
    let obj = new optimal(frames);               // Create an instance of optimal class

    // Process each page reference one by one
    for(let i = 0; i < ref.length; i++){
        obj.refer(ref[i], ref.slice(i + 1));     // Send current page and remaining pages
        fillcol("table", i + 1, obj.frames, frames, obj.searchIndex); // Update table display
    }

    // Show final statistics (faults, hits, ratios)
    summary('summary', obj.pageFaults, obj.pageFaults + obj.pageHits, frames);
}

// Update one column of the table (i.e. one time step)
function fillcol(tablename, col, objframes, n, searchindex){
    for(let i = 1; i <= objframes.length; i++){
        let cell = document.getElementById(tablename + i + '' + col);
        cell.innerHTML = objframes[i - 1]; // Display the page in the frame
    }

    // Show HIT or MISS
    n++;
    let cell = document.getElementById(tablename + n + '' + col);
    if(searchindex == -1)
        cell.innerHTML = "MISS";
    else {
        cell.innerHTML = "HIT";
        document.getElementById(tablename + (searchindex + 1) + '' + col)
            .classList.add("bg-success", "text-white"); // Highlight the hit
    }
}

// Create the dynamic table based on number of references and frames
function createTable(tablename, frames, ref){
    document.getElementById(tablename).innerHTML = "";

    // Header row - Reference values
    let table = '<tr class="font-weight-bold"><td id="' + tablename + '00">Reference</td>';
    for (let i = 0; i < ref.length; i++) {
        table += '<td id="' + tablename + '0' + (i + 1) + '">' + ref[i] + "</td>";
    }
    table += "</tr>";

    // Frame rows
    for (let i = 0; i < frames; i++) {
        table += '<tr><td class="font-weight-bold" id="' + tablename + (i + 1) + '0">Frame ' + (i + 1) + "</td>";
        for (let j = 0; j < ref.length; j++) {
            table += '<td id="' + tablename + (i + 1) + (j + 1) + '"></td>';
        }
        table += "</tr>";
    }

    // Status row - HIT/MISS
    frames++;
    table += '<tr><td class="font-weight-bold" id="' + tablename + frames + '0">Status</td>';
    for (let j = 1; j <= ref.length; j++) {
        table += '<td id="' + tablename + frames + j + '"></td>';
    }
    table += "</tr>";

    console.log(table); // Optional: Debug in console
    document.getElementById(tablename).innerHTML += table;
}


function summary(id,pagefaults,pages,frames){
    let summary ="";
    let missratio=(pagefaults / pages).toPrecision(2);
    summary+=`<div>Pages:${pages}</div>`;
    summary+=`<div>Frames:${frames}</div>`;
    summary+=`<div>Hits:${pages-pagefaults}</div>`;
    summary+=`<div>Faults:${pagefaults}</div>`; 
    summary+=`<div>Hit Ratio:${1-missratio}</div>`; 
    summary+=`<div>Miss Ratio:${missratio}</div>`;
    document.getElementById(id).innerHTML=summary;
}

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        document.getElementsByClassName('navbar')[0].classList.add('animate__slideOutUp');
        setTimeout(() => {
            document.getElementsByClassName('navbar')[0].style.display = 'none';

            document.getElementsByClassName('navbar')[0].classList.remove('animate__slideOutUp');
        }, 100);
    }
    else {
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