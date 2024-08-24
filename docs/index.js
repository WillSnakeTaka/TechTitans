document.getElementById('menu-icon').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
});


// Function to fetch and load search data
async function loadSearchData() {
    const response = await fetch('search_data.json'); // Path to your JSON file
    const data = await response.json();
    return data;
}

// Function to perform the search
function search(query, data) {
    const results = data.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    return results;
}

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <h3><a href="${result.url}">${result.title}</a></h3>
                <p>${result.description}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}

// Event listener for the search input
document.getElementById('search-input').addEventListener('input', async function() {
    const query = this.value.trim();
    if (query.length > 0) {
        const data = await loadSearchData();
        const results = search(query, data);
        displayResults(results);
    } else {
        document.getElementById('search-results').innerHTML = ''; // Clear results when input is empty
    }
});
