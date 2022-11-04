//You can edit ALL of the code here


// level 350 -----

function fetchApi() {
  let url = "https://api.tvmaze.com/shows/82/episodes"
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      makePageForEpisodes(data);
      dropdownEpi(data);
      searchEpisodes(data);
    })
}

fetchApi();
 
 const rootElem = document.getElementById("root");


// const allEpisodes = getAllEpisodes();
function setup() {
 
  
 //makePageForEpisodes(allEpisodes);
}

// Level 100--------
 function makePageForEpisodes(episodeList) {

   episodeList.forEach((episode) => {
     const episodeCart = document.createElement("div");
     episodeCart.className = "episode-show";
     rootElem.appendChild(episodeCart);

     const episodeName = document.createElement("h2");
     episodeName.className = "name-list";
     episodeName.innerText = `${episode.name} - ${episodeCode(
      episode.season,
       episode.number
     )}`;
     
    episodeCart.appendChild(episodeName);

    const episodeImg = document.createElement("img");
    episodeImg.src = episode.image.medium;
     episodeCart.appendChild(episodeImg);

     const summaryLink = document.createElement("p");
    summaryLink.className = "summary-link";
     summaryLink.innerHTML = episode.summary;
     episodeCart.appendChild(summaryLink);
    
   });

}

 
 function episodeCode(season, episode) {
   season = season < 10 ? "0" + season : season;
   episode = episode < 10 ? "0" + episode : episode;
  return `S${season}E${episode}`;
}


// level 200 -----


let inputs = document.getElementById("searchField");
function searchEpisodes() {
  inputs.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();
    let episodeVis = allEpisodes.filter((epidata) => {
      return (
        epidata.name.toLowerCase().includes(value) ||
        epidata.summary.toLowerCase().includes(value)
      );
    });
    rootElem.innerHTML = "";
    makePageForEpisodes(episodeVis);
    let displayNum = document.getElementById("disNum");
    displayNum.innerHTML = "";
      displayNum.innerHTML = "Display" + episodeVis.length + "/" + allEpisodes.length;
  });
}
searchEpisodes();




// level 300 ------

function dropdownEpi(allEpisodes) {
  var divTop = document.getElementById("dropDown");
  for (var i = 0; i < allEpisodes.length; i++) {
    var opt = document.createElement("option");
    opt.setAttribute("value", allEpisodes[i].id);
     opt.innerText =  ` ${episodeCode(
      allEpisodes[i].season,
       allEpisodes[i].number
    )}- ${allEpisodes[i].name}`;
    divTop.appendChild(opt);
  }
  divTop.addEventListener("change", function () {
    let selectedVal = this.value;
    let selectedEpisode = allEpisodes.filter((x) => x.id == selectedVal);
    rootElem.innerHTML = "";
    makePageForEpisodes(selectedEpisode);
  });
}
dropdownEpi();




  
//level 350



// let allShows = []




// function getAllShows() {
//   makePageForEpisodes(allShows);
//   displayShowList(allShows);
//   showsTitles = document.querySelectorAll("")
// }


// function getShowById(e) {
//   if (e.target.value) {
//     showId = e.target.value;
//   } else {
//     showId = e.target.id;
//   }

//   fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
//     .then((response) => response.json())
//     .then((data) => (allEpisodes = data))
//     .then(() => getEpisodes());
// }


// selectEl.addEventListener("change", (e) => showEpisode(e, allEpisodes));
// SelectShow.addEventListener("change", (e) => {
//   getShowById(e);
// });

// homeBtn.addEventListener("click", () => {
//   SelectShow.value = -1;
//   setup();
// });



 window.onload = setup;


