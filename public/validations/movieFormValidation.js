// title validations
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const title = document.getElementById("title");
    const error = document.getElementById("title-error");
  
    function isValidTitle(str) {
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (
          !(
            (code >= 65 && code <= 90) ||   // A-Z
            (code >= 97 && code <= 122) ||  // a-z
            (code >= 48 && code <= 57) ||   // 0-9
            code === 32 ||                  // space
            code === 46 ||                  // .
            code === 58 ||                  // :
            code === 64                    // @
          )
        ) {
          return false;
        }
      }
      return true;
    }
  
    
    title.addEventListener("input", function () {
      const value = title.value.trim();
  
      if (value.length === 1) {
        error.textContent = "At least 2 characters required.";
      } else if (!isValidTitle(value)) {
        error.textContent = "special symbols not allowed";
      } else {
        error.textContent = "";
      }
    });
  });
  

 //Release date validation
 document.addEventListener("DOMContentLoaded",function () {
    const form=document.querySelector("form");
    const releaseInput=document.getElementById("release_date");
    const releaseError=document.getElementById("release-error");
  
    // Real-time validation
    releaseInput.addEventListener("input", function () {
      const selectedDate=new Date(releaseInput.value);
      const today=new Date();
      today.setHours(0, 0, 0, 0);
  
      if(!releaseInput.value) {
        releaseError.textContent=""; // No error if empty initially
      } else if(selectedDate>today) {
        releaseError.textContent="Release date cannot be in the future.";
      } else{
        releaseError.textContent="";
      }
    });
  });

  //Director validations
  
  document.addEventListener("DOMContentLoaded", function () {
    const form=document.querySelector("form");
    const directorInput=document.getElementById("director");
    const directorError=document.getElementById("director-error");
  
    // Checks for digits
    function containsDigit(str) {
      for(let i=0; i<str.length; i++) {
        const code=str.charCodeAt(i);
        if (code>=48 && code<=57) return true;
      }
      return false;
    }
  
    // Checks for special characters (only allow letters and space)
    function containsSpecialChar(str) {
      for (let i=0; i<str.length; i++) {
        const code=str.charCodeAt(i);
        if (
          !(code===32 || (code>=65 && code<=90) || (code>=97 && code<=122))
        ) {
          return true;
        }
      }
      return false;
    }
  
    // validation
    directorInput.addEventListener("input", function () {
      const value=directorInput.value.trim();
  
      if(value.length===1) {
        directorError.textContent="At least 2 characters required.";
      } else if(containsDigit(value)) {
        directorError.textContent="Numbers are not allowed.";
      } else if(containsSpecialChar(value)) {
        directorError.textContent="Special characters are not allowed.";
      } else {
        directorError.textContent="";
      }
    });
  });

// description validation
document.addEventListener("DOMContentLoaded", function () {
    const descInput = document.getElementById("description");
    const descError = document.getElementById("description-error");
  
    // ✅ ASCII character validation
    function isValidAsciiDescription(str) {
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (
          !(
            (code >= 65 && code <= 90) ||   // A–Z
            (code >= 97 && code <= 122) ||  // a–z
            (code >= 48 && code <= 57) ||   // 0–9
            code === 32 ||                  // space
            code === 44 || code === 46 ||   // , .
            code === 33 || code === 63 ||   // ! ?
            code === 45                    // -
          )
        ) {
          return false;
        }
      }
      return true;
    }
  
    // validation
    descInput.addEventListener("input", function () {
      const value = descInput.value.trim();
  
      if (value.length === 0) {
        descError.textContent = ""; // no error on blank
      } else if (value.length < 10) {
        descError.textContent = "At least 10 characters required.";
      } else if (value.length > 300) {
        descError.textContent = "At most 300 characters allowed.";
      } else if (!isValidAsciiDescription(value)) {
        descError.textContent = "Only A–Z, a–z, 0–9, , . ! ? - allowed.";
      } else {
        descError.textContent = "";
      }
    });
  });
  
  
 
  
//validations fro genre
document.addEventListener("DOMContentLoaded", function () {
    const form=document.querySelector("form");
    const genreSelect=document.getElementById("genre");
    const genreError=document.getElementById("genre-error");
  
    // Real-time validation
    genreSelect.addEventListener("change", function () {
      if (genreSelect.value==="") {
        genreError.textContent="Please select a genre.";
      } else {
        genreError.textContent="";
      }
    });
  
    // On form submission
    form.addEventListener("submit", function (e) {
      if(genreSelect.value==="") {
        genreError.textContent="Please select a genre.";
        e.preventDefault();
      }
    });
  });
  
//validations for Language
document.addEventListener("DOMContentLoaded", function () {
    const form=document.querySelector("form");
    const languageInput=document.getElementById("language");
    const languageError=document.getElementById("language-error");
  
    function containsDigit(str) {
      for (let i=0; i<str.length; i++) {
        const code=str.charCodeAt(i);
        if(code>=48 && code<=57) return true;
      }
      return false;
    }
  
    function containsSpecialChar(str) {
      for(let i=0; i<str.length; i++) {
        const code=str.charCodeAt(i);
        if (
          !(code===32 || (code>=65 && code<=90) || (code>=97 && code<=122))
        ) {
          return true;
        }
      }
      return false;
    }
  
    //validation
    languageInput.addEventListener("input", function () {
      const value=languageInput.value.trim();
  
      if (value.length===1) {
        languageError.textContent="At least 2 characters required.";
      } else if(containsDigit(value)) {
        languageError.textContent="Numbers are not allowed.";
      } else if(containsSpecialChar(value)) {
        languageError.textContent="Special characters are not allowed.";
      } else {
        languageError.textContent="";
      }
    });
  });
  
  //validations for poster image
  document.addEventListener("DOMContentLoaded", function () {
    const form=document.querySelector("form");
    const posterInput=document.getElementById("poster");
    const posterError=document.getElementById("poster-error");
  
    // Allowed image types
    const allowedTypes=["image/jpeg", "image/png", "image/gif", "image/webp"];
  
    // validation
    posterInput.addEventListener("change", function () {
      const file=posterInput.files[0];
  
      if(!file) {
        posterError.textContent=""; // No file chosen
      } else if(!allowedTypes.includes(file.type)) {
        posterError.textContent="Only JPG, PNG, GIF, or WEBP images allowed.";
      } else{
        posterError.textContent = "";
      }
    });
  });

  const form = document.querySelector("form");

// Country validation
const countryInput=document.getElementById("country");
const countryError=document.getElementById("country-error");

// allow symbols check
function isValidAsciiCountry(str) {
  for (let i=0; i<str.length; i++) {
    const code=str.charCodeAt(i);
    if (
      !(
        (code>=65 && code<=90) || // A–Z
        (code>=97 && code<=122) || // a–z
        code===32                   // space
      )
    ) {
      return false;
    }
  }
  return true;
}
// Event 
countryInput.addEventListener("input", () => {
  const value=countryInput.value.trim();

  if(value==="") {
    countryError.textContent = ""; // Don't show error on empty
  } else if(value.length < 2) {
    countryError.textContent = "at least 2 characters.";
  } else if(!isValidAsciiCountry(value)) {
    countryError.textContent = "Only letters and spaces are allowed.";
  } else{
    countryError.textContent = "";
  }
});


// Trailer URL


document.addEventListener("DOMContentLoaded", function () {
  const trailerInput = document.getElementById("trailer_url");
  const trailerError = document.getElementById("trailer_url-error");

  function isYouTubeUrl(url) {
    return (
      url.startsWith("https://www.youtube.com/") ||
      url.startsWith("https://youtu.be/")
    );
  }

  trailerInput.addEventListener("input", function () {
    const value = trailerInput.value.trim();

    if (value === "") {
      trailerError.textContent = ""; // Empty field is allowed
      trailerInput.classList.remove("is-invalid");
    } else if (!isYouTubeUrl(value)) {
      trailerError.textContent = "Trailer URL must be a valid YouTube link";
      trailerInput.classList.add("is-invalid");
    } else {
      trailerError.textContent = "";
      trailerInput.classList.remove("is-invalid");
    }
  });
});

//movie url
  document.addEventListener("DOMContentLoaded", function () {
    const movieInput = document.getElementById("movie_url");
    const movieError = document.getElementById("movie_url-error"); // ✅ corrected ID
  
    function isYouTubeUrl(url) {
      return (
        url.startsWith("https://www.youtube.com/") ||
        url.startsWith("https://youtu.be/")
      );
    }
  
    movieInput.addEventListener("input", function () {
      const value = movieInput.value.trim();
  
      if (value === "") {
        movieError.textContent = "";
        movieInput.classList.remove("is-invalid");
      } else if (!isYouTubeUrl(value)) {
        movieError.textContent = "URL must be a valid YouTube link";
        movieInput.classList.add("is-invalid");
      } else {
        movieError.textContent = "";
        movieInput.classList.remove("is-invalid");
      }
    });
  });
  