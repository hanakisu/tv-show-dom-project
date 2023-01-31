//You can edit ALL of the code here


// level 350 -----

function fetchApi(episode) {
  rootElem.style.display = "block";
  // showListing.style.display = "none";
  let url = `https://api.tvmaze.com/shows/${episode}/episodes`
  const datas = []
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((episode) => {
        datas.push(episode)
        
      })

      showListing.style.display = "none";
       searchEpisodes(datas)
       makePageForEpisodes(datas)
       dropdownEpi(datas)
      
    })
      
     
}

 const showListing = document.getElementById("displayShow")
 const rootElem = document.getElementById("root");
 const allShows = getAllShows();

// const allEpisodes = getAllEpisodes();
function setup() {
  dropdownShow(allShows);
  searchShow(allShows);
  makeShow(allShows);
  
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

function searchEpisodes(allEpisodes) {
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
// searchEpisodes();




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
// dropdownEpi()


    // level 400-------

function dropdownShow() {
  var divFirst = document.getElementById("dropDownShow");
  for (var i = 0; i < allShows.length; i++) {
    var opt = document.createElement("option");
    opt.setAttribute("value", allShows[i].id);
    allShows.sort(function (a, b) {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
     opt.innerText =  `${allShows[i].name}`;
    divFirst.appendChild(opt);
  }
  divFirst.addEventListener("change", function () {
    let selected = this.value;
    // console.log(selected);
    rootElem.innerHTML = "";
    fetchApi(selected);
    
  });
}

 // level 500 ------

function makeShow(allShows) {
   
   allShows.forEach((episode) => {
    const makeShow = document.createElement("div");
     makeShow.className = "episode-show";
     makeShow.setAttribute("value", episode.id);
     showListing.appendChild(makeShow);

    

    const episodeImg = document.createElement("img");
    episodeImg.src = episode.image.medium;
     makeShow.appendChild(episodeImg);
     
    const showName = document.createElement("h1");
    showName.innerHTML = episode.name
    showListing.appendChild(showName);

    const summaryS = document.createElement("p");
    summaryS.className = "summary-link";
    summaryS.innerHTML = episode.summary;
     makeShow.appendChild(summaryS);
     
     makeShow.addEventListener("click", () => {
       let showSelected = episode.id;
       console.log(showSelected);
       rootElem.innerHTML = "";
       fetchApi(showSelected);
     })
  })
  
}


let inputShow = document.getElementById("searchShows");
function searchShow() {
  inputShow.addEventListener("input", (event) => {
    let values = event.target.value.toLowerCase();
    console.log(values);
    let showEpi = allShows.filter((epiShow) => {
      return (
        epiShow.name.toLowerCase().includes(values) ||
        epiShow.summary.toLowerCase().includes(values)
      )
    })

    console.log(showEpi);
    showListing.innerHTML = "";
    makeShow(showEpi);
    
    // displayShow.innerHTML = "";
    //   displayShow.innerHTML = "Display" + epiShow.length + "/" + allShows.length;
  });
}

let backBtn = document.getElementById("btn");
backBtn.addEventListener("click", function () {
  location.reload();
})
 window.onload = setup;


