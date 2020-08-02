const movies = [
  {
    name: "Captain America",
    dateMade: "17-10-2020",
    rented: false,
  },
  {
    name: "Super Man",
    dateMade: "17-10-2020",
    rented: false,
  },
  {
    name: "Batman - Homecoming",
    dateMade: "17-10-2020",
    rented: false,
  },
];

const html_table = document
  .querySelector(".movies-table")
  .getElementsByTagName("tbody")[0];
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
      let html;
      if (movie.rented) {
        html = `<tr id="${index}"><td>${movie.name}</td><td>${movie.dateMade}</td><td><span class="text-danger">Rented </span></td></tr>`;
      } else {
        html = `<tr id="${index}"><td>${movie.name}</td><td>${movie.dateMade}</td><td><button class="btn btn--rent" onclick="rent(${index})">Rent</button></td></tr>`;
      }

      html_table.innerHTML += html;
    });
  },

  //Rent a movie
  rent_movie(index) {
    this.movies[index].rented = true;
    this.clear_current_table();
    return this.display_movies(this.movies);
  },

  //Search the movie array
  search_movie(query) {
    const search_result = this.movies.filter((movie) => {
      return movie.name.toLowerCase().includes(query.toLowerCase());
    });

    this.clear_current_table();
    return this.display_movies(search_result);
  },

  //restore rented movies
  restore_rented_movies() {
    this.movies.map((movie) => {
      if (movie.rented) {
        movie.rented = false;
      }
    });
    this.clear_current_table();
    return this.display_movies(this.movies);
  },

  //Clear current table
  clear_current_table() {
    if (html_table.children.length <= 0) {
      return;
    }
    const children = Array.from(html_table.children);
    children.forEach((element, index) => {
      if (index > 0) {
        return element.remove();
      }
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
