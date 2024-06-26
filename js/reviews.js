// const testimonialCarousel = document.querySelector(".testimonial-carousel");

// function populateReviewsTable() {
// 	testimonialCarousel.innerHTML = "";

// 	const reviewsData = JSON.parse(sessionStorage.getItem("reviewsData"));

// 	if (Array.isArray(reviewsData) && reviewsData.length > 0) {
// 		console.log("Reviews data found:", reviewsData);

// 		reviewsData.forEach((review) => {
// 			const testimonialItem = document.createElement("div");
// 			testimonialItem.classList.add("testimonial-item", "bg-light");

// 			const innerContent = `
//                 <div class="d-flex align-items-center border-bottom pt-5 pb-4 px-5">
//                     <img class="img-fluid rounded" src="${review.picUrl}" style="width: 60px; height: 60px" />
//                     <div class="ps-4">
//                         <h4 class="text-primary mb-1">${review.name}</h4>
//                     </div>
//                 </div>
//                 <div class="pt-4 pb-5 px-5">
//                     ${review.text}
//                 </div>
//             `;
// 			testimonialItem.innerHTML = innerContent;
// 			testimonialCarousel.appendChild(testimonialItem);
// 			console.log("Added testimonial:", review.name);
// 		});

// 		$(testimonialCarousel).owlCarousel({
// 			autoplay: true,
// 			smartSpeed: 1500,
// 			dots: true,
// 			loop: true,
// 			center: true,
// 			responsive: {
// 				0: {
// 					items: 1,
// 				},
// 				576: {
// 					items: 1,
// 				},
// 				768: {
// 					items: 2,
// 				},
// 				992: {
// 					items: 3,
// 				},
// 			},
// 		});

// 		sessionStorage.setItem("reviewsData", JSON.stringify(reviewsData));
// 		console.log("Reviews data stored in sessionStorage.");
// 	}
// }

// document.addEventListener("DOMContentLoaded", function () {
// 	populateReviewsTable();
// });


const testimonialCarousel = document.querySelector(".testimonial-carousel");

// Dummy testimonials data as an array of objects
const reviewsData = [
    {
        name: "John Doe",
        picUrl: "https://example.com/john-doe.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero ac ligula imperdiet, nec consequat lorem tempor."
    },
    {
        name: "Jane Smith",
        picUrl: "https://example.com/jane-smith.jpg",
        text: "Sed euismod leo vitae nisi consectetur, sit amet dapibus elit placerat. Quisque fermentum auctor est, non lobortis leo suscipit ac."
    },
    {
        name: "Michael Brown",
        picUrl: "https://example.com/michael-brown.jpg",
        text: "Aenean vehicula, lacus id pulvinar tincidunt, sapien mauris accumsan libero, id efficitur justo magna eget magna."
    }
];

function populateReviewsTable() {
    testimonialCarousel.innerHTML = "";

    if (Array.isArray(reviewsData) && reviewsData.length > 0) {
        console.log("Reviews data found:", reviewsData);

        reviewsData.forEach((review) => {
            const testimonialItem = document.createElement("div");
            testimonialItem.classList.add("testimonial-item", "bg-light");

            const innerContent = `
                <div class="d-flex align-items-center border-bottom pt-5 pb-4 px-5">
                    <img class="img-fluid rounded" src="${review.picUrl}" style="width: 60px; height: 60px" />
                    <div class="ps-4">
                        <h4 class="text-primary mb-1">${review.name}</h4>
                    </div>
                </div>
                <div class="pt-4 pb-5 px-5">
                    ${review.text}
                </div>
            `;
            testimonialItem.innerHTML = innerContent;
            testimonialCarousel.appendChild(testimonialItem);
            console.log("Added testimonial:", review.name);
        });

        $(testimonialCarousel).owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            center: true,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
            },
        });

        console.log("Reviews data used from local definition.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    populateReviewsTable();
});
