const search = document.getElementById('search');
search.addEventListener('click', fetchMovieData);

function fetchMovieData() {
    const inputData = document.querySelector('input').value;

    fetch(`https://www.omdbapi.com/?apikey=c445734c&s=${inputData}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            return response.json();
        })
        .then(data => {
            if (data.Search && data.Search.length > 0) {
                const moviesHTML = data.Search.map(movie => `
                    <div>
                        <h3>${movie.Title}</h3>
                        <p>Year: ${movie.Year}</p>
                        <img src="${movie.Poster}" alt="Poster of ${movie.Title}" width="100">
                        <br>
                        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">View on IMDb</a>
                    </div>
                `).join('');
                document.getElementById('display').innerHTML = moviesHTML;
            } else {
                document.getElementById('display').innerHTML = "No movies found.";
            }
        })
        .catch(error => {
            console.log(error);
            document.getElementById('display').innerHTML = "Error fetching movie data.";
        });
}
