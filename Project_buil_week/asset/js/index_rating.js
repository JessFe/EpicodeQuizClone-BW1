document.addEventListener("DOMContentLoaded", function () {
    const ratingContainer = document.getElementById("rating-container");

    // totale di stelle
    const totalStars = 10;
    let selectedRating;

    // Aggiungi le stelle al container
    for (let i = 1; i <= totalStars; i++) {
        const star = document.createElement("img");
        star.src = "./asset/img/star_dark.svg";
        star.classList.add("star");
        star.dataset.ratingValue = i;

        star.addEventListener("click", handleClick);
        star.addEventListener("mouseover", handleMouseOver); // Aggiunto per l'effetto hover
        star.addEventListener("mouseout", handleMouseOut); // Aggiunto per annullare l'effetto hover

        ratingContainer.appendChild(star);
    }

    function handleMouseOver(event) {
        const hoveredStar = event.target;
        const hoverValue = hoveredStar.dataset.ratingValue;

        // Accendi le stelle fino a quella su cui si trova il mouse
        for (let i = 1; i <= hoverValue; i++) {
            const star = ratingContainer.querySelector(`[data-rating-value="${i}"]`);
            star.src = "./asset/img/star.svg"; // Stelle attive durante l'hover
        }
    }

    function handleMouseOut(event) {
        // Spegni tutte le stelle quando il mouse esce
        if (!selectedRating) {
            for (let i = 1; i <= totalStars; i++) {
                const star = ratingContainer.querySelector(`[data-rating-value="${i}"]`);
                star.src = "./asset/img/star_dark.svg"; // Stelle inattive
            }
        } else {
            // Se è stata fatta una selezione, accendi le stelle fino a quella selezionata.
            for (let i = 1; i <= totalStars; i++) {
                const star = ratingContainer.querySelector(`[data-rating-value="${i}"]`);
                star.src = i <= selectedRating ? "./asset/img/star.svg" : "./asset/img/star_dark.svg";
            }
        }
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



