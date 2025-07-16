addEventListener("DOMContentLoaded", function(){
    document.querySelector("#addBtn").addEventListener("click", addSong)
})

//add the song to the database.. id has to be an async function because we are calling sata outside our server

async function addSong() {
    //create a song object based on the form that the user fills out. this will make life easier when we send the data to the backend
    const song = {
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        popularity: document.querySelector("#popularity").value,
        releaseDate: document.querySelector("#released").value,
        genre: document.querySelector("#genre").value ? document.querySelector("#genre").value.split(",") : []
    }

    const response = await fetch("http://localhost:3000/api/songs", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(song)
    })

    if(response.ok){
        const results = await response.json()
        alert("Added song with ID of" + results._id)

        //reset form after song is successfully added
        document.querySelector("form").reset()
    }

    else {
        document.querySelector("#error").innerHTML = "Cannot add song"
    }

}