function saveSimulationData(algorithm, refString, hits, faults) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/save_simulation.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const total = hits + faults;
    const hitRatio = (hits / total).toFixed(2);
    const faultRatio = (faults / total).toFixed(2);

    const params = `algorithm=${algorithm}&ref_string=${refString.join(" ")}&hits=${hits}&faults=${faults}&hit_ratio=${hitRatio}&fault_ratio=${faultRatio}`;

    xhr.send(params);
}


class fifo{
    constructor(capacity){
        this.capacity=capacity; // Maximum number of frames (memory slots)
        this.pageFaults=0;
        this.pageHits=0;
        this.searchIndex=-1; // Stores the index where page is found (or -1 if not found)
        this.frames=[];
    }
    refer(token) {
        this.searchIndex=this.frames.indexOf(token); // Check if page already exists
        if(this.searchIndex==-1){ // Page not found — PAGE FAULT
            this.pageFaults++;
            this.frames.push(token) // Add the new page to memory
            if(this.frames.length>this.capacity){
                this.frames.shift() // Remove the oldest page if memory is full
            }
        }
        else 
            this.pageHits++; // Page found — PAGE HIT
    }
}
document.getElementById("submit").addEventListener("click",FIFO); //Handle Submit Button
function FIFO(){ //Read values from input fields. res is the page list, and frames is how much memory we have.
    let res = document.getElementById("input").value.split(" ");
    let frames = document.getElementById("frames").value;
    let ref=[]; //Cleans up empty strings and stores all valid page references in ref
    for (let i = 0; i < res.length; i++) {
        if (res[i] != " " && res[i] != "") {
            ref.push(res[i]);
        }
    }
    createTable("table",frames,ref);
    let obj = new fifo(frames);
    for(let i=0;i<ref.length;i++){
        obj.refer(ref[i]); // Process each reference
        fillcol("table",i+1,obj.frames,frames,obj.searchIndex);
    }
    summary('summary',obj.pageFaults,obj.pageFaults+obj.pageHits,frames);
}



//Update Table Cells
function fillcol(tablename,col,objframes,n,searchindex){
    for(let i=1;i<=objframes.length;i++){
        let cell=document.getElementById(tablename+i+''+col);
        cell.innerHTML=objframes[i-1];
    }
    n++;
    let cell=document.getElementById(tablename+n+''+col);
    if(searchindex==-1)cell.innerHTML="MISS";
    else{
        // console.log(tablename+n+''+col); 
        cell.innerHTML="HIT";
        document.getElementById(tablename+(searchindex+1)+''+col).classList.add("bg-success","text-white");
    }
}
function createTable(tablename,frames,ref){
    document.getElementById(tablename).innerHTML="";
    let table = '<tr><td id="'+tablename+'00" style="font-weight:bolder;">Reference</td>';
    for (let i = 0; i < ref.length; i++) {
        table += '<td style="font-weight:bolder;" id="'+tablename+'0'+(i+1) + '">' + ref[i] + "</td>";
    }
    table += "</tr>";
    //Creates rows for each frame in memory
    for (let i = 0; i < frames; i++) {
        table += '<tr><td style="font-weight:bolder;"id="' +tablename+ (i + 1) + '0">Frame ' + (i + 1) + "</td>";
        for (let j = 0; j < ref.length; j++) {
            table += '<td id="'+tablename + (i + 1) + (j + 1) + '"></td>';
        }
        table += "</tr>";
    }
    frames++;
    table += '<tr><td style="font-weight:bolder;"id="' +tablename+ frames + '0">Status</td>';
    for (var j = 1; j <= ref.length; j++) {
        table += '<td id="' +tablename+ frames + j + '"></td>';
    }
    table += "</tr>";
    console.log(table);
    document.getElementById(tablename).innerHTML += table;
}

function summary(id,pagefaults,pages,frames){
    let summary ="";
    let missratio=(pagefaults / pages).toPrecision(2);
    let hitratio=(1-missratio).toPrecision(2);
    summary+=`<div>Pages:${pages}</div>`;
    summary+=`<div>Frames:${frames}</div>`;
    summary+=`<div>Hits:${pages-pagefaults}</div>`;
    summary+=`<div>Faults:${pagefaults}</div>`; 
    summary+=`<div>Hit Ratio:${hitratio}</div>`; 
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