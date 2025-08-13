// Node class for doubly linked list (not used here, kept if needed later)
class node {
    constructor(data) {
        this.data = data;
        this.l = null;
        this.r = null;
    }
}

// LRU class implementing standard LRU page replacement
class lru {
    constructor(capacity) {
        this.capacity = Number(capacity);
        this.pageFaults = 0;
        this.pageHits = 0;
        this.searchIndex = -1;
        this.frames = [];     // Array of pages in frames (fixed positions)
        this.recency = [];    // Array tracking recency: most recent at end
    }

    refer(token) {
        let idx = this.frames.indexOf(token);

        if (idx !== -1) {
            // HIT: Page found in frames
            this.pageHits++;
            this.searchIndex = idx;

            // Update recency: move token to end (most recent)
            this.recency = this.recency.filter(x => x !== token);
            this.recency.push(token);
        } else {
            // MISS: Page not in frames
            this.pageFaults++;
            this.searchIndex = -1;

            if (this.frames.length < this.capacity) {
                // Space available: add token at next free frame
                this.frames.push(token);
                this.recency.push(token);
            } else {
                // No space: replace least recently used page (recency[0])
                let lruPage = this.recency.shift();           // Remove oldest used
                let removeIdx = this.frames.indexOf(lruPage); // Find index in frames
                this.frames[removeIdx] = token;                // Replace with new page
                this.recency.push(token);                      // Add new page as most recent
            }
        }
    }
}

// Event listener for submit button
document.getElementById("submit").addEventListener("click", runLRU);

function runLRU() {
    let refs = document.getElementById("input").value.trim().split(/\s+/);
    let framesCount = Number(document.getElementById("frames").value);
    let ref = refs.filter(x => x !== "");

    createTable("table", framesCount, ref);
    let cache = new lru(framesCount);

    for (let i = 0; i < ref.length; i++) {
        cache.refer(ref[i]);
        fillcol("table", i + 1, cache.frames, framesCount, cache.searchIndex);
    }

    summary("summary", cache.pageFaults, cache.pageFaults + cache.pageHits, framesCount);
}

// Fill one column in the table with frames and HIT/MISS status
function fillcol(tablename, col, objframes, totalFrames, searchindex) {
    for (let i = 0; i < totalFrames; i++) {
        let cell = document.getElementById(tablename + (i + 1) + col);
        cell.innerHTML = i < objframes.length ? objframes[i] : "";
        cell.classList.remove("bg-success", "text-white");
    }

    let statusRow = document.getElementById(tablename + (Number(totalFrames) + 1) + col);
    if (searchindex === -1) {
        statusRow.innerHTML = "MISS";
    } else {
        statusRow.innerHTML = "HIT";
        document.getElementById(tablename + (searchindex + 1) + col).classList.add("bg-success", "text-white");
    }
}

// Dynamically create the table structure for frames and references
function createTable(tablename, frames, ref) {
    document.getElementById(tablename).innerHTML = "";
    let table = `<tr class="font-weight-bold"><td id="${tablename}00">Reference</td>`;
    for (let i = 0; i < ref.length; i++) {
        table += `<td id="${tablename}0${i + 1}">${ref[i]}</td>`;
    }
    table += `</tr>`;

    for (let i = 0; i < frames; i++) {
        table += `<tr><td class="font-weight-bold" id="${tablename}${i + 1}0">Frame ${i + 1}</td>`;
        for (let j = 0; j < ref.length; j++) {
            table += `<td id="${tablename}${i + 1}${j + 1}"></td>`;
        }
        table += "</tr>";
    }

    table += `<tr><td class="font-weight-bold" id="${tablename}${frames + 1}0">Status</td>`;
    for (let j = 0; j < ref.length; j++) {
        table += `<td id="${tablename}${frames + 1}${j + 1}"></td>`;
    }
    table += "</tr>";

    document.getElementById(tablename).innerHTML = table;
}

// Show summary of results: hits, faults, ratios
function summary(id, pagefaults, pages, frames) {
    let missRatio = (pagefaults / pages).toFixed(2);
    let hitRatio = (1 - missRatio).toFixed(2);
    let result = `
        <div>Pages: ${pages}</div>
        <div>Frames: ${frames}</div>
        <div>Hits: ${pages - pagefaults}</div>
        <div>Faults: ${pagefaults}</div>
        <div>Hit Ratio: ${hitRatio}</div>
        <div>Miss Ratio: ${missRatio}</div>
    `;
    document.getElementById(id).innerHTML = result;
}
