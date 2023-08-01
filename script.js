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

// FETCHING THE INITIAL DATA---------------------------------------
const first_fetch = async () => {
    let category = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=7fad363f58889077cd601fe2d0ed4fb7")
    category = await category.json()
    category = (category.genres).slice(0, 2)
    category.forEach(element => {
        category_movies(element.name, element.id)
    });
}

const hide_trailer = () => {
    movie_trailer.innerHTML = ""
    movie_trailer.style.display = "none"
    // main_body.classList.remove("blur")
    // document.body.style.overflow = "visible"
}

// RESPONSE ON CLICK ON IMAGE --------------------------------------------------
const mov_name = async (movie_name) => {
    movie_trailer.style.display = "block"
    console.log(movie_name)

    // let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie_name}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    // response = await response.json()
    // console.log(response)

    // let videoID = response.items[0].id.videoId
    // console.log("ID : " + videoID)
    // movie_trailer.innerHTML = `<iframe width="100%" height="80%"
    //                      src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1">
    //                 </iframe> <button onclick="hide_trailer()" class="close_btn">CLOSE</button>`



    movie_trailer.innerHTML = `
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/rp1aU3SileM?autoplay=1&control=1"></iframe>
    <button onclick="hide_trailer()" class="close_btn">CLOSE</button>`

    // main_body.classList.add("blur")


}

// FETCHING MOVIES IMAGES AND ADDING TO WEBPAGE------------------------------------------
const category_movies = async (name, id) => {
    let movies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fad363f58889077cd601fe2d0ed4fb7&with_genres=${id}`)
    movies = await movies.json()
    let arr1 = movies.results
    console.log(arr1)

    let path = arr1.map(element => {
        return (`<div class="movie_box"><img onclick="mov_name(this.alt)" src=https://image.tmdb.org/t/p/w500${element.poster_path} alt="${element.original_title}" srcset=""></div>`)
    }).join(" ");

    main_category.innerHTML += ` <h2 class="category_heading">${name}</h2>
    <div class="category">
        ${path}
    </div>`

}




// --------------------------------------HEADER SECTION ----------------------------------

let header_trailer_name = "";

const hero_section = async () => {

    pausebtn.style.display = "none"
    playbtn.style.display = "block"

    let hero = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=7fad363f58889077cd601fe2d0ed4fb7")
    hero = await hero.json()
    hero = hero.results

    let num = Math.floor(Math.random() * hero.length)

    movie_name.innerHTML = hero[num].original_title
    header_trailer_name = hero[num].original_title
    header_box2.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${hero[num].backdrop_path})`
    header_box2.innerHTML = ``

    movie_description.innerHTML = (hero[num].overview)

}

const header_trailer = async () => {
    console.log("hii")
    console.log(header_trailer_name)
    pausebtn.style.display = "block"
    playbtn.style.display = "none"

    // let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${header_trailer_name}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    // response = await response.json()
    // console.log(response)

    // let videoID = response.items[0].id.videoId
    // console.log("ID : " + videoID)
    // header_box2.innerHTML = `<iframe class="header_video_trailer" width="100%" height="80%"
    //                      src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1">
    //                 </iframe> <button onclick="hide_trailer()" class="close_btn">CLOSE</button>`

    header_box2.innerHTML = `
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/rp1aU3SileM?autoplay=1&control=1"></iframe>
    <button onclick="hide_trailer()" class="close_btn">CLOSE</button>`

}





window.addEventListener("load", () => {
    movie_trailer.style.display = "none"
    first_fetch();
    hero_section()
})












    // let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie_name}&key=AIzaSyAOOFrJ8QNGrnbJPyRytE6qlOqUXaz1XrM`);
    // response = await response.json()

    // let videoID = response.items[0].id.videoId
    // movie_trailer.innerHTML = `<iframe width="100%" height="80%"
    //                      src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1">
    //                 </iframe> <button onclick="hide_trailer()" class="close_btn">CLOSE</button>`