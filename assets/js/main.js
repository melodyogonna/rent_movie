const movies = [
  {
    name: "Captain America",
    dateMade: "17-10-2020",
  },
  {
    name: "Super Man",
    dateMade: "17-10-2020",
  },
  {
    name: "Batman - Homecoming",
    dateMade: "17-10-2020",
  },
];

const html_table = document.querySelector(".movies-table");
const search_input = document.querySelector("#search");

const movieLibrary = {
  //Add the movie array
  movies,

  //Initialize Object
  init_object() {
    return this.display_movies(this.movies);
  },

  //Display movies
  display_movies(movies) {
    movies.forEach((movie, index) => {
      const html = `<tr id="${index}"><td>${movie.name}</td><td>${movie.dateMade}</td><td><button class="btn btn--rent" onclick="rent(${index})">Rent</button></td></tr>`;
      html_table.getElementsByTagName("tbody")[0].innerHTML += html;
    });
  },

  //Rent a movie
  rent_movie(index) {
    row = html_table
      .getElementsByTagName("tr")
      [index + 1].classList.add("d-none");
  },

  //Search the movie array
  search_movie(query) {
    const search_result = this.movies.filter((movie) => {
      return movie.name.toLowerCase().includes(query.toLowerCase());
    });

    html_table.getElementsByTagName("tbody")[0].innerHTML = "";
    return this.display_movies(search_result);
  },

  //restore rented movies
  restore_rented_movies() {
    const hidden_elements = html_table.querySelectorAll(".d-none");
    hidden_elements.forEach((element) => {
      element.classList.remove("d-none");
    });
  },
};

const my_movies = Object.create(movieLibrary);
my_movies.init_object();

const search = () => {
  return my_movies.search_movie(search_input.value);
};
search_input.addEventListener("keyup", search);

function rent(index) {
  return my_movies.rent_movie(index);
}

function restore() {
  return my_movies.restore_rented_movies();
}
