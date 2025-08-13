<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OS LAB SIMULATOR</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <link rel="shortcut icon" type="image/png" href="images/website_logo1.png">
    <style>
        body {
            background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
            font-family: 'Poppins', sans-serif;
            color: #e0e0e0;
            min-height: 100vh;
            margin: 0;
            font-size: 1rem;
        }

        .navbar {
            background: rgba(10, 25, 47, 0.95) !important;
            backdrop-filter: blur(12px);
            padding: 1rem 2rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .navbar-brand .hover-border {
            font-size: 1.6rem;
            font-weight: 700;
            color: #00e6ff;
            transition: color 0.3s ease, transform 0.3s ease;
            position: relative;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }

        .navbar-brand .hover-border:hover {
            color: #ffffff;
            transform: translateY(-2px);
        }

        .navbar-brand .hover-border::after {
            content: '';
            position: absolute;
            width: 0;
            height: 3px;
            bottom: -6px;
            left: 0;
            background: linear-gradient(90deg, #00e6ff, #ff4081);
            transition: width 0.4s ease;
        }

        .navbar-brand .hover-border:hover::after {
            width: 100%;
        }

        .nav-link, .nav-link.dropdown-toggle {
            font-size: 1.1rem;
            color: #e0e0e0;
            transition: color 0.3s ease, transform 0.3s ease;
            position: relative;
        }

        .nav-link:hover, .nav-link.dropdown-toggle:hover {
            color: #00e6ff;
            transform: translateY(-2px);
        }

        .nav-link::after, .nav-link.dropdown-toggle::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -3px;
            left: 0;
            background: linear-gradient(90deg, #00e6ff, #ff4081);
            transition: width 0.4s ease;
        }

        .nav-link:hover::after, .nav-link.dropdown-toggle:hover::after {
            width: 100%;
        }

        .divider {
            height: 30px;
            width: 1px;
            background: #e0e0e0;
            margin: 0 1.5rem;
            opacity: 0.4;
        }

        .form-control {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid #00e6ff;
            color: #e0e0e0;
            border-radius: 25px;
            padding: 0.7rem 2.8rem 0.7rem 1.2rem;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: #ffffff;
            color: #ffffff;
            box-shadow: 0 0 8px rgba(0, 230, 255, 0.3);
        }

        .form-control::placeholder {
            color: #b0b0b0;
            font-size: 0.95rem;
        }

        .bi-search {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #00e6ff;
            width: 20px;
            height: 20px;
        }

        .dropdown-menu {
            background: rgba(10, 25, 47, 0.98);
            border: 1px solid #00e6ff;
            border-radius: 12px;
            max-height: 320px;
            overflow-y: auto;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .dropdown-item {
            color: #e0e0e0;
            font-size: 0.95rem;
            padding: 0.8rem 1.5rem;
            transition: all 0.3s ease;
        }

        .dropdown-item:hover {
            background: #00e6ff;
            color: #0f2027;
        }

        .mid-block {
            padding: 4rem 2rem;
            text-align: center;
        }

        .mid-heading-wrapper {
            margin-bottom: 2rem;
        }

        .mid-heading h1 {
            font-size: 2.8rem;
            font-weight: 700;
            color: #00e6ff;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 15px rgba(0, 230, 255, 0.6);
            position: relative;
            display: inline-block;
        }

        .mid-heading h1::after {
            content: '';
            position: absolute;
            width: 50%;
            height: 3px;
            bottom: -8px;
            left: 25%;
            background: linear-gradient(90deg, #00e6ff, #ff4081);
        }

        .mid-cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .card {
            background: rgba(255, 255, 255, 0.97);
            border: none;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            max-width: 28rem;
            overflow: hidden;
        }

        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .card-header {
            background: linear-gradient(90deg, #00e6ff, #ff4081);
            color: #ffffff;
            font-size: 1.6rem;
            font-weight: 600;
            padding: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: none;
        }

        .card-body {
            padding: 2rem;
            color: #1a1a1a;
            font-size: 1.1rem;
            line-height: 1.7;
            max-height: 300px;
            overflow-y: auto;
        }

        .card-body .card-header {
            background: none;
            color: #0f2027;
            font-size: 1.3rem;
            padding: 0.5rem 0;
            text-transform: none;
        }

        .card-text ol {
            padding-left: 1.5rem;
            margin-bottom: 0;
        }

        .card-text li {
            margin-bottom: 0.5rem;
        }

        .last-block {
            padding: 4rem 2rem;
            text-align: center;
        }

        .last_button {
            background: linear-gradient(90deg, #00e6ff, #ff4081);
            color: #ffffff;
            border: none;
            border-radius: 25px;
            padding: 0.8rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .last_button:hover {
            background: linear-gradient(90deg, #ff4081, #00e6ff);
            transform: scale(1.08);
            box-shadow: 0 5px 15px rgba(0, 230, 255, 0.4);
        }

        .input {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid #00e6ff;
            color: #e0e0e0;
            border-radius: 25px;
            padding: 0.7rem 1.2rem;
            font-size: 1rem;
            transition: all 0.3s ease;
            width: 200px; /* Increased width for longer input */
        }

        .input:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: #ffffff;
            box-shadow: 0 0 8px rgba(0, 230, 255, 0.3);
        }

        table, tr, td {
            border: 2px solid black !important;
        }

        #table {
            width: 80vw;
            margin: 15px;
        }

        #summary {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            flex-direction: row;
        }

        @media (max-width: 768px) {
            body {
                font-size: 0.9rem;
            }

            .mid-heading h1 {
                font-size: 2.2rem;
            }

            .mid-block, .last-block {
                padding: 2rem 1rem;
            }

            .navbar-brand .hover-border {
                font-size: 1.3rem;
            }

            .nav-link, .nav-link.dropdown-toggle {
                font-size: 1rem;
            }

            .form-control, .input {
                font-size: 0.9rem;
                width: 150px; /* Adjusted for smaller screens */
            }

            .card {
                max-width: 90%;
            }

            .card-header {
                font-size: 1.4rem;
            }

            .card-body {
                font-size: 1rem;
            }

            .last_button {
                font-size: 0.9rem;
                padding: 0.7rem 1.5rem;
            }
        }
    </style>
</head>

<body>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="pagereplacement_index.html">
                <div class="hover-border">PAGE REPLACEMENT</div>
            </a>
            <div class="divider"></div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.html">
                            <div class="hover-border">HOME</div>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            ALGORITHMS
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="./fifo.html">FIFO</a></li>
                            <li><a class="dropdown-item" href="./lifo.html">LIFO</a></li>
                            <li><a class="dropdown-item" href="./lru.html">LRU</a></li>
                            <li><a class="dropdown-item" href="./optimal.html">OPTIMAL</a></li>
                        </ul>
                    </li>
                </ul>
                <div class="d-flex position-relative">
                    <div class="dropdown">
                        <input id="search-input" class="form-control me-2 dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false" placeholder="Search algorithms..." aria-label="Search">
                        <ul id="suggestions" class="dropdown-menu dropdown-menu-dark" aria-labelledby="search-input"></ul>
                        <button id="search-button" class="btn btn-outline-light position-absolute" type="button"
                            style="right: 10px; top: 50%; transform: translateY(-50%); border: none; background: none; padding: 0;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 1 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="mid-block" data-aos="fade-up">
        <div class="mid-heading-wrapper">
            <div class="mid-heading">
                <h1 class="hover-border">LAST IN FIRST OUT</h1>
            </div>
        </div>
        <div class="mid-cards">
            <div class="card text-white mb-3" data-aos="zoom-in" data-aos-delay="100">
                <div class="card-header">LIFO</div>
                <div class="card-body">
                    <p class="card-text">Stands for "Last In First Out." This page replacement algorithm removes the most recently used page when a page fault occurs, operating on a stack-like principle where the last page loaded is the first to be replaced.</p>
                    <div class="card-header">Advantages</div>
                    <p class="card-text">
                        <ol>
                            <li>Simple to implement due to its stack-based approach.</li>
                        </ol>
                    </p>
                    <div class="card-header">Disadvantages</div>
                    <p class="card-text">
                        <ol>
                            <li>May lead to frequent page faults if recently used pages are needed again soon.</li>
                            <li>Not optimal for workloads with temporal locality.</li>
                        </ol>
                    </p>
                </div>
            </div>
            <div class="card text-white mb-3" data-aos="zoom-in" data-aos-delay="200">
                <div class="card-header">ALGORITHM</div>
                <div class="card-body">
                    <p class="card-text">
                        <ol>
                            <li>LIFO maintains a stack of pages in memory.</li>
                            <li>Upon a page fault, the most recently added page is removed from the top of the stack.</li>
                            <li>The new page is then pushed onto the stack.</li>
                        </ol>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="last-block" data-aos="fade-up">
        <div class="mid-heading-wrapper">
            <div class="mid-heading">
                <h1 class="hover-border">IMPLEMENTATION</h1>
            </div>
        </div>
        <div class="divider" style="height: 10vh;"></div>
        <div id="algo">
            <div class="container"
                style="width: 85vw; height: fit-content; margin-bottom: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div
                    style="display: flex; flex-direction: row; align-items: center; justify-content: center; flex-wrap: wrap;">
                    <div
                        style="margin: 10px; width: fit-content; display: flex; justify-content: center; align-items: center;">
                        <strong>Reference String:</strong>
                        <input class="input" type="text" style="width: 55%; min-width: 225px; margin: 5px;" id="input">
                    </div>
                    <div style="margin: 10px; width: fit-content">
                        <strong>Frames:</strong>
                        <input class="input" type="number" id="frames" style="width: 100px; min-width: 50px; margin: 5px;"
                            min="1" max="10">
                    </div>
                </div>
                <button id="submit" type="button" class="btn btn-dark last_button input"
                    style="margin: 10px; min-width: 80px;">Submit</button>
            </div>
            <div style="margin: 10px;">
                <br>
                <table id="table" class="container text-center"></table>
                <br>
                <div id="summary" class="d-flex justify-content-around font-weight-bold text-uppercase"></div>
            </div>
        </div>
    </div>

    <br>
    <br>
    <br>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/search.js"></script>
    <script>
        AOS.init({
            duration: 1200,
            easing: 'ease-out-quart',
        });

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
            let frames = parseInt(document.getElementById("frames").value);
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
            for (let j = 1; j <= ref.length; j++) {
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
    </script>
</body>

</html>