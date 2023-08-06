let main_category = document.querySelector(".main_category")
let category = document.querySelector(".category")
let category_heading = document.querySelector(".category_heading")
let movie_name = document.querySelector(".movie_name")
let movie_description = document.querySelector(".movie_description")
let header_box2 = document.querySelector(".header--box2")
let movie_trailer = document.querySelector(".movie_trailer")
let main_body = document.querySelector(".main_body")
let playbtn = document.querySelector(".playbtn")
let pausebtn = document.querySelector(".pausebtn")
let info_btn = document.querySelector(".info_btn")
let error_pop = document.querySelector(".error_pop")
let movie_info = document.querySelector(".movie_info")
let gif = document.querySelector(".gif")
let links = document.querySelectorAll(".links")
let gif_span = document.querySelector(".gif_span")
links.forEach((e) => {
    e.addEventListener("click", () => {
        let a = e.innerText
        error_pop.style.display = "block"
        setTimeout(() => {
            e.innerText = a
            error_pop.style.display = "none"
        }, 1000);
    })
})

// FETCHING THE INITIAL DATA---------------------------------------
const first_fetch = async () => {
    let category = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=7fad363f58889077cd601fe2d0ed4fb7")
    category = await category.json()
    category = (category.genres)
    category.forEach(element => {
        category_movies(element.name, element.id)
    });
}

const hide_trailer = () => {
    movie_trailer.innerHTML = ""
    movie_trailer.style.display = "none"
    main_body.style.filter = "blur(0)"
}

const enlarge = (ab) => {
    let div_trailer = ab.parentElement.parentElement
    div_trailer.className = "trailer_enlarge"
    main_body.style.filter = "blur(10px)"
    ab.style.display = "none"
}

// RESPONSE ON CLICK ON IMAGE --------------------------------------------------
const mov_name = async (movie_name) => {
    movie_trailer.style.display = "block"
    console.log(movie_name)

    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie_name}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    response = await response.json()
    console.log(response)

    let videoID = response.items[0].id.videoId
    console.log("ID : " + videoID)
    movie_trailer.innerHTML = `<div class="trailer11">
                   <iframe width="100%" height="80%"
                         src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1">
                    </iframe> 
                    <div class="movie_trailer_btn">
                      <button onclick="enlarge(this)" class="close_btn">ENLARGE</button>
                      <button onclick="hide_trailer()" class="close_btn">CLOSE</button>
                    </div>
                              </div>`
}

// FETCHING MOVIES IMAGES AND ADDING TO WEBPAGE------------------------------------------
const category_movies = async (name, id) => {
    let movies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${id}`)
    movies = await movies.json()
    let arr1 = movies.results

    let path = arr1.map(element => {
        return (`<div class="movie_box"><img onclick="mov_name(this.alt)" src=https://image.tmdb.org/t/p/w500${element.poster_path} alt="${element.original_title}" srcset=""></div>`)
    }).join(" ");

    main_category.innerHTML += ` <div class="category_headingdiv"><h2 class="category_heading">${name}</h2><span>More</span></div>
    <div class="category">
        ${path}
    </div>`

}
// --------------------------------------HEADER SECTION ----------------------------------

let header_trailer_name = "";
let image_url = "";
let language = "";
let title = "";
let imdb = "";
let title_movie = "";
let released_date = "";
let overview = "";

const hero_section = async () => {

    let hero = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=7fad363f58889077cd601fe2d0ed4fb7")
    hero = await hero.json()
    hero = hero.results

    let num = Math.floor(Math.random() * hero.length)
    console.log(hero[num])

    language = hero[num].original_language;
    title = hero[num].original_title;
    imdb = hero[num].vote_average
    title_movie = hero[num].title
    released_date = hero[num].release_date
    overview = hero[num].overview

    movie_name.innerHTML = hero[num].original_title
    header_trailer_name = hero[num].original_title
    header_box2.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${hero[num].backdrop_path})`
    header_box2.innerHTML = ``

    movie_description.innerHTML = (hero[num].overview)

    image_url = `url(https://image.tmdb.org/t/p/w500${hero[num].backdrop_path})`;
}

const pause_func = () => {
    pausebtn.style.display = "none"
    playbtn.style.display = "inline-block"
    header_box2.innerHTML = ``
    header_box2.style.backgroundImage = image_url;
}

const header_trailer = async () => {
    pausebtn.style.display = "block"
    playbtn.style.display = "none"
    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${header_trailer_name}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    response = await response.json()
    let videoID = response.items[0].id.videoId
    header_box2.innerHTML = `<iframe class="header_video_trailer" width="100%" height="80%"src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1"></iframe>`
}

const info_close = (this_obj) => {
    main_body.style.filter = "blur(0)"
    this_obj.parentElement.parentElement.parentElement.style.display = "none"
}
info_btn.addEventListener("click", () => {
    main_body.style.filter = "blur(20px)"
    movie_info.style.display = "block"
    movie_info.innerHTML = `<div class="info"><div class="info_heading">${title}</div>
    <div class="info_child1"><span>Language : ${language}</span><span>Title : ${title_movie}</span></div>
    <div>Description : \n ${overview}</div>
    <div class="info_child2"><span>IMDB : ${imdb}</span><span>Released Date : ${released_date}</span></div><div><button onclick="info_close(this)">CLOSE</button></div></div>`
})

window.addEventListener("load", () => {
    movie_trailer.style.display = "none"
    first_fetch();
    hero_section()

    setTimeout(() => {
        gif.style.transition = "all 5s ease-in"
        gif.style.left = "-100%"
    }, 7000);
    gif.style.transition = "all 3.5s ease-in"
    gif.style.bottom = "0"
})