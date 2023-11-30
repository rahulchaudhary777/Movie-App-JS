let list = document.querySelector('ul')
let previous = document.querySelector('.previous')
let next = document.querySelector('.next')
let inpt = document.querySelector('input')

inpt.value = 1;
let count = 1;
api(count);

previous.addEventListener('click', ()=>{
    if(count > 1) count -= 1;
    inpt.value = count;
    api(count);
})

next.addEventListener('click', ()=>{
    if(count < 100) count += 1;
    inpt.value = count;
    api(count);
})

inpt.addEventListener('change', (event)=>{
    api(inpt.value);
})

function api(page){
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=20ed534a806cf31b3dbb32a0c57301a4&page=${page}`)
    .then((responce)=>{
        manipulate();
        let items = responce.data.results;

        for(let i of items){
            let figure = document.createElement('figure');
            let name, releaseDate;
            let ratingColor = (i.vote_average).toFixed(1) <= 5 ? '#B31312' : '#3081D0';
            
            if(i.media_type === 'tv'){
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
                ${i.media_type}
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

let footerBtn = document.querySelectorAll('.footerBtn')

for(let i of footerBtn){
    i.addEventListener('click', (event)=>{
        console.log(event.target);
    })
}