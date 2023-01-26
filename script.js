// ! linking html tags with js file
const btnEl = document.getElementById("btn");
const errorMsgEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = document.getElementById("input").value;

  // ! set input value range between 1-7
  if (inputValue > 7 || inputValue < 1) {
    errorMsgEl.style.display = "block";
    errorMsgEl.innerText = "Number should be between 1-7";
    galleryEl.style.display = "none";
    return;
  }

  imgs = "";

  try {
    // ! loading effect
    btnEl.style.display = "none";
    galleryEl.style.display = "block";
    const loading = `<img src="loading.svg" alt="loading_spinner"/>`;
    galleryEl.innerHTML = loading;

    // ! fetching photos using api
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.floor(
        Math.random() * 100
      )}&client_id=Sut584yqGDFPdabng8Xy9Alizf2j-tt7sLmFv6tTnY4`
    ).then((res) =>
      res.json().then((data) => {
        // ! if api has data , pass photos into image tag and display
        if (data) {
          data.forEach((pic) => {
            imgs += `
            <img src=${pic.urls.small} alt="image"/>`;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnEl.style.display = "block";

            // ! remove error message
            errorMsgEl.style.display = "none";
          });
        }
      })
    );
  } catch (error) {
    // ! when an error occurs , display error message and display button
    console.log(error);
    errorMsgEl.style.display = "block";
    errorMsgEl.innerText = error;
    galleryEl.style.display = "none";
    btnEl.style.display = "block";
  }
}

// ! when get photo button is clicked , call the function
btnEl.addEventListener("click", fetchImage);
