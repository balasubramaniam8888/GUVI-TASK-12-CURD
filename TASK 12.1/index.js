//*** function  Fetch posts from API or Local Storage ***//
async function fetchPosts() {
 try{
      const response = await fetch(`https://strangerthings-quotes.vercel.app/api/quotes`); 
      const data = await response.json();
    renderPosts(data);
    console.log("Fetch post data", data);
  
  
  //*** function to render posts to DOM element to display ***//
 
  function renderPosts(data) {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = data
      .map(
        (post) =>
          `<div class="card mt-3">
          <div class="card-body">
              <h5 class="card-title">${post.quote}</h5>
              <p class="card-text">${post.author}</p>
          </div>
      </div>`
      )
      .join("");
}
 }catch(error){
      console.error("error ocCured")
    }

  }
fetchPosts();

//*** function for click me ***//
  function refreshPage(){
           window.location.reload();

  }

