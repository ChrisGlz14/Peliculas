let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
const key = "ed100834"

//function to fetch data from api

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    //if input field is empty

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Ingrese una Pelicula o Serie </h3>`;
    }

    //if input isn't empty
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if movie exist in database
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="Genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Resumen:</h3>
                    <p>${data.Plot}</p>
                    <h3>Interpretado por:</h3>
                    <p>${data.Actors}</p>
                    <h3>Idioma</h3>
                    <p>${data.Language}</p>
                `;
            }

            //if movie doesn't exist in database
            else {
                result.innerHTML = `<h3 class="msg>La pelicula NO se encuentra Registrada</h3>`;
            }
        })
            //if error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Oops Ocurrio un error!</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
