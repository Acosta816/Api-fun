`use strict`;

let base = `https://api.jamendo.com/v3.0/tracks/?`;
//  ?client_id=de23866d&format=jsonpretty&limit=2&include=musicinfo&featured=1


let params = {
    'client_id': config.client_id,
    'format': 'jsonpretty',
    'limit': 3,
    'include': 'musicinfo',
    'boost' : 'popularity_week',
    'featured': 1,
};

function formatParams(params){
    let myString = Object.keys(params).map(key=> `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    
    return myString.join('&');
}

function displaySong(myObj){
    let myHTML = ``;
    for(let i=0; i<myObj.results.length; i++){
    myHTML += `<h3>${myObj.results[i].name}<h3>
                    <img src="${myObj.results[i].album_image}">
                    <audio controls>
                        <source src="${myObj.results[i].audio}" type="audio/mp3">
                    Your browser does not support the audio element.
                    </audio>
                    <hr>`;
    }
    return myHTML;
}

function getSong(){

    let paramString = formatParams(params);
    console.log(paramString);
    let url = base+paramString; 

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(songData=> $('main').html(displaySong(songData)))
    .catch(err=> `Oh wow ${err.message}`);



}








function watchForm(){
    $('form').on('submit', event => {
        event.preventDefault();
        console.log(`hello world`);
        getSong();
    });
};

$(watchForm);