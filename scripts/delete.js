addEventListener("DOMContentLoaded", async function () {
    document.querySelector("#deleteBtn").addEventListener("click", deleteSong)
    getAllSongs()
})


async function getAllSongs() {
    const response = await fetch("http://localhost:3000/api/songs")
    if(response.ok){
        const songs = await response.json()
        let html = ""
        for(let song of songs) {
            html += `<option value="${song._id}">${song.title}</option>`
        }
        document.querySelector("#songDropDown").innerHTML = html
    }

}

async function deleteSong() {
    //get song id
    const songId = document.querySelector("#songDropDown option:checked").value;

    const response = await fetch("http://localhost:3000/api/songs/" + songId, {
        method: "DELETE"
    });

    if (response.ok){
        getAllSongs();
        alert("Song Deleted")
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot delete song";
    }
}