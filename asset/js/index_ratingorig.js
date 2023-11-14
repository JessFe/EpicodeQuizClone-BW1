document.addEventListener("DOMContentLoaded", function () {
    const ratingContainer = document.getElementById("rating-container");

    // totale di stelle
    const totalStars = 10;

    // Aggiungi le stelle al container
    for (let i = 1; i <= totalStars; i++) {
        const star = document.createElement("img");
        star.src = "./asset/img/star_dark.svg";
        star.classList.add("star");
        star.dataset.ratingValue = i;

        star.addEventListener("click", handleClick);

        ratingContainer.appendChild(star);
    }



    function handleClick(event) {
        const clickedStar = event.target;
        selectedRating = clickedStar.dataset.ratingValue;

        // Cambia colore fino a quella selezionata
        for (let i = 1; i <= totalStars; i++) {
            const star = ratingContainer.querySelector(`[data-rating-value="${i}"]`);
            if (i <= selectedRating) {
                star.src = "./asset/img/star.svg"; // Stelle attive
            } else {
                star.src = "./asset/img/star_dark.svg"; // Stelle inattive
            }
        }

        // rating in console log
        console.log("Rating selected:", selectedRating);
    }
});



