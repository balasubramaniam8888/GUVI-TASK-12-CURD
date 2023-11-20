//*For Pagination Page Limits*//
const limit = 8;
let currentPage = 1;

//*Fetch Posts From API Or Local Storage*//
async function fetchPosts(page) {
  const start = (page - 1) * limit;
  const end = page * limit;

  //*Function To Retrive Fetch Posts*//
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  if (posts.length < end) {
    try {
      const response = await fetch(
        `https://isro.vercel.app/api/spacecrafts?page=${page}&_limit=${limit}`
      );
      const newPosts = await response.json();

      localStorage.setItem("posts", JSON.stringify(newPosts.spacecrafts));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return;
    }
  }
  renderPosts(posts.slice(start, end));
  renderPagination(posts.length);
}

//*Render Posts To The DOM*/
function renderPosts(posts) {
  const postsContainer = document.getElementById("posts");

  postsContainer.innerHTML = "";
  posts.map((post) => {
    postsContainer.innerHTML += `
             <div class = "container bg-dark  bg-opacity-50 d-flex justify-content-center">       
              <div class="card mt-2 w-50">
               <div class="card-body">${post.name}</div>
               </div>
               </div>   

               `;
  });
}

//*Change Page Function*//
function changePage(newPage) {
  if (newPage < 1) return;
  currentPage = newPage;
  fetchPosts(currentPage);
}

// *Render The Pagination Buttons*//
function renderPagination(totalPosts) {
  const totalPages = Math.ceil(totalPosts / limit);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = `
     <button onclick="changePage(${currentPage - 1})" class="btn btn-primary" ${
    currentPage === 1 ? "enabled" : ""
  }>Previous</button>
     <button class="btn btn-primary "> Page ${currentPage}</button>
     <button onclick="changePage(${currentPage + 1})" class="btn btn-primary"${
    currentPage >= totalPages ? "enabled" : ""
  }>Next</button>
    `;
}

fetchPosts(currentPage);
