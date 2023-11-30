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
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=20ed534a806cf31b3dbb32a0c57301a4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
    .then((responce)=>{
        
        manipulate();
        let items = responce.data.results;

        for(let i of items){
            let figure = document.createElement('figure');
            let ratingColor = (i.vote_average).toFixed(1) <= 5 ? '#B31312' : '#3081D0';
            
            figure.innerHTML = `
                <img src=${`http://image.tmdb.org/t/p/w500/${i.poster_path}`} />
                ${i.original_title}<br><br>
                ${i.release_date}
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

// let footerBtn = document.querySelector('.fa-solid')

// for(let i of footerBtn){
//     i.addEventListener('click', (event)=>{
//         event.target.style.backgroundColor = 'red'; 

//     })
// }