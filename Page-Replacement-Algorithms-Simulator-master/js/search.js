var suggestions = [
    {
        'text': 'First Come First Served',
        'display': 'First Come First Served (FCFS)',
        'href': 'fcfs.html'
    },
    {
        'text': 'FCFS',
        'display': 'First Come First Served (FCFS)',
        'href': 'fcfs.html'
    },
    {
        'text': 'Circular LOOK',
        'display': 'Circular LOOK (CLOOK)',
        'href': 'clook.html'
    },
    {
        'text': 'CLOOK',
        'display': 'Circular LOOK (CLOOK)',
        'href': 'clook.html'
    },
    {
        'text': 'Circular SCAN',
        'display': 'Circular SCAN (CSCAN)',
        'href': 'cscan.html'
    },
    {
        'text': 'CSCAN',
        'display': 'Circular SCAN (CSCAN)',
        'href': 'cscan.html'
    },
    {
        'text': 'SCAN',
        'display': 'SCAN',
        'href': 'scan.html'
    },
    {
        'text': 'LOOK',
        'display': 'LOOK',
        'href': 'look.html'
    },
    {
        'text': 'Shortest Seek Time First',
        'display': 'Shortest Seek Time First (SSTF)',
        'href': 'sstf.html'
    },
    {
        'text': 'SSTF',
        'display': 'Shortest Seek Time First (SSTF)',
        'href': 'sstf.html'
    },
    {
        'text': 'Compare Algorithms',
        'display': 'Compare Algorithms',
        'href': 'compare.html'
    },
    {
        'text': 'First In First Out',
        'display': 'First In First Out (FIFO)',
        'href': 'fifo.html'
    },
    {
        'text': 'FIFO',
        'display': 'First In First Out (FIFO)',
        'href': 'fifo.html'
    },
    {
        'text': 'Last In First Out',
        'display': 'Last In First Out (LIFO)',
        'href': 'lifo.html'
    },
    {
        'text': 'LIFO',
        'display': 'Last In First Out (LIFO)',
        'href': 'lifo.html'
    },
    {
        'text': 'Least Recently Used',
        'display': 'Least Recently Used (LRU)',
        'href': 'lru.html'
    },
    {
        'text': 'LRU',
        'display': 'Least Recently Used (LRU)',
        'href': 'lru.html'
    },
    {
        'text': 'Optimal',
        'display': 'Optimal',
        'href': 'optimal.html'
    },
    {
        'text': 'Random',
        'display': 'Random',
        'href': 'random.html'
    },
    {
        'text': "Belady's Anamoly",
        'display': "Belady's Anamoly",
        'href': 'belady.html'
    },
    {
        'text': "Beladys Anamoly",
        'display': "Belady's Anamoly",
        'href': 'belady.html'
    },
    {
        'text': "Anamoly",
        'display': "Belady's Anamoly",
        'href': 'belady.html'
    },
    {
        'text': 'Disk Scheduling',
        'display': 'Disk Scheduling',
        'href': 'diskscheduling_index.html'
    },
    {
        'text': 'Page Replacement',
        'display': 'Page Replacement',
        'href': 'pagereplacement_index.html'
    }
];

var dropdownMenu = document.getElementById('suggestions');
dropdownMenu.style.display = 'none';
var searchInput = document.getElementById('search-input');

// Handle keyup event for real-time suggestions
searchInput.addEventListener('keyup', () => {
    dropdownMenu.innerHTML = '';
    dropdownMenu.style.display = 'none';
    let userData = searchInput.value.toLowerCase().split(' ').join('');
    
    if (userData !== '') {
        let relatedSuggestions = suggestions.filter((obj) => {
            return obj.text.toLowerCase().split(' ').join('').startsWith(userData);
        });

        const uniqueKeyToRelatedSuggestions = new Map(
            relatedSuggestions.map((suggestion) => [suggestion.display, suggestion])
        );
        relatedSuggestions = [...uniqueKeyToRelatedSuggestions.values()];
        console.log(relatedSuggestions);

        if (relatedSuggestions.length === 0) {
            dropdownMenu.innerHTML = `<li class='dropdown-item'>No search results</li>`;
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.fontSize = '14px';
        } else {
            relatedSuggestions.forEach((value) => {
                let newDropItem = document.createElement('li');
                let newLink = document.createElement('a');
                newLink.className = 'dropdown-item';
                newLink.href = value.href;
                newLink.innerText = value.display;
                newLink.style.fontSize = '14px';
                newDropItem.appendChild(newLink);
                dropdownMenu.appendChild(newDropItem);
            });
            dropdownMenu.style.display = 'block';
        }
    }
});

// Handle search button click (if present)
document.getElementById('search-button')?.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        // Trigger search or navigate based on first suggestion
        const firstSuggestion = suggestions.find((s) => 
            s.text.toLowerCase().split(' ').join('').startsWith(query.toLowerCase().split(' ').join(''))
        );
        if (firstSuggestion) {
            window.location.href = firstSuggestion.href;
        } else {
            dropdownMenu.innerHTML = `<li class='dropdown-item'>No search results</li>`;
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.fontSize = '14px';
        }
    }
});

// Handle Enter key press to mimic button click
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
        document.getElementById('search-button')?.click();
    }
});

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        document.getElementsByClassName('navbar')[0].classList.add('animate__slideOutUp');
        setTimeout(() => {
            document.getElementsByClassName('navbar')[0].style.display = 'none';
            document.getElementsByClassName('navbar')[0].classList.remove('animate__slideOutUp');
        }, 100);
    } else {
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