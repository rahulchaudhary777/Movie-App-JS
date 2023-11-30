let list = document.querySelector('ul')
let moviesBtn = document.querySelector('.movie')
let SeriesBtn = document.querySelector('.tv')
let searchInpt = document.querySelector('.searchInput')
let searchBtn = document.querySelector('.searchBtn')

let previous = document.querySelector('.previous')
let next = document.querySelector('.next')
let inptPagination = document.querySelector('.paginationInput')
inptPagination.value = 0;
let count = 0, type = 'movie', inputText;


moviesBtn.addEventListener('click', (event)=>{
    if(count  > 0 && inputText !== ''){
        count = 1;
        type = event.target.classList[0];
            api(inputText, count);
    }
})

SeriesBtn.addEventListener('click', (event)=>{
    type = event.target.classList[0];
    count = 1;
    if(inputText !== '') api(inputText, count);
})

searchBtn.addEventListener('click', ()=>{
    inputText = searchInpt.value;
    if(inputText !== ''){
        count = 1;
        api(inputText, count);
    }
})



previous.addEventListener('click', ()=>{
    if(count > 1 && inputText !== ''){
        count -= 1;
        api(inputText, count);
    }
})

next.addEventListener('click', ()=>{
    if(count < 100  && inputText !== '') count += 1;
    api(inputText, count);
})

inptPagination.addEventListener('change', ()=>{
    if(inputText !== '') api(inputText, inptPagination.value);
})


function api(inputText, page){
    axios.get(`https://api.themoviedb.org/3/search/${
        type == 'tv' ? "tv" : "movie"
      }?api_key=20ed534a806cf31b3dbb32a0c57301a4&language=en-US&query=${inputText}&page=${page}&include_adult=false`
)
    .then((responce)=>{

        let items = responce.data.results;
        console.log(items)

        if(items.length > 0) {
            inptPagination.value = count;
            manipulate();
        }
        else count -= 1;

        for(let i of items){
            let figure = document.createElement('figure');
            let name, releaseDate;
            let ratingColor = (i.vote_average).toFixed(1) <= 5 ? '#B31312' : '#3081D0';
            
            if(type === 'tv'){
                name = i.name;
                releaseDate = i.first_air_date;
            }
            else{
                name = i.original_title;
                releaseDate = i.release_date
            }
            figure.innerHTML = `
                <img src=${`http://image.tmdb.org/t/p/w300/${i.poster_path}`} />
                ${name}<br><br>
                ${releaseDate}
                <p style='background-color : ${ratingColor}'>${(i.vote_average).toFixed(1)}</p>
            `
            list.appendChild(figure)
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}

function manipulate(){
    while(list.firstChild){
        list.firstChild.remove();
    }
}

let toggleBtn = document.querySelectorAll('a');

for(let i of toggleBtn){
    i.classList.remove('.toggleColor')
    i.addEventListener('click', (event)=>{
        event.target.classList.add('.toggleColor')
    })  
}