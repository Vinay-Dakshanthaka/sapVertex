// function fetchServicesDataFromLocalStorage() {
// 	const servicesData = JSON.parse(
// 		sessionStorage.getItem("productsAndServicesData")
// 	);
// 	console.log(servicesData);
// 	return servicesData;
// }

// async function populateServiceContainer() {
// 	const serviceData = fetchServicesDataFromLocalStorage();

// 	const serviceCaption = document.getElementById("ourServiceCaption");
// 	serviceCaption.textContent = serviceData.serviceCaption;

// 	const serviceContainer = document.getElementById("serviceContainer");
// 	serviceContainer.innerHTML = "";

// 	serviceData.services.forEach((service, index) => {
// 		const serviceCard = document.createElement("div");
// 		serviceCard.classList.add("col-lg-4", "col-md-6", "wow", "zoomIn");
// 		serviceCard.dataset.wowDelay = "0.3s";

// 		const cardBody = document.createElement("div");
// 		cardBody.classList.add(
// 			"service-item",
// 			"bg-light",
// 			"rounded",
// 			"d-flex",
// 			"flex-column",
// 			"align-items-center",
// 			"justify-content-center",
// 			"text-center"
// 		);

// 		const iconContainer = document.createElement("div");
// 		iconContainer.classList.add('rounded-2', "shadow")
// 		iconContainer.style.width = "200px";
// 		iconContainer.style.height = "200px";
// 		iconContainer.style.overflow = "hidden";

// 		const icon = document.createElement("img");
// 		icon.src = service.serviceImageUrl;
// 		icon.alt = "Service Icon";
// 		icon.style.width = "100%";
// 		icon.style.height = "100%";

// 		iconContainer.appendChild(icon);
// 		cardBody.appendChild(iconContainer);

// 		const serviceLink = document.createElement("a");

// 		serviceLink.className = "btn btn-lg btn-primary rounded";
// 		// serviceLink.setAttribute("href", "./products.html");
// 		const linkIcon = document.createElement("i");
// 		linkIcon.className = "bi bi-arrow-right";
// 		serviceLink.appendChild(linkIcon);

// 		cardBody.appendChild(serviceLink);

// 		const serviceTitle = document.createElement("h4");
// 		serviceTitle.classList.add("mb-3");
// 		serviceTitle.textContent = service.title;

// 		// const serviceDescription = document.createElement("p");
// 		// serviceDescription.classList.add("m-0");
// 		// serviceDescription.textContent = service.description;

// 		cardBody.appendChild(serviceTitle);
// 		// cardBody.appendChild(serviceDescription);

// 		serviceCard.appendChild(cardBody);

// 		serviceContainer.appendChild(serviceCard);

// 		serviceCard.addEventListener("click", function () {
// 			const userResponse = confirm("Do you wish to know more information?");
// 			if (userResponse) {
// 				// Instead of navigating to a new page, open the modal
// 				openModal(service.description);
// 			}
// 		});

// 		function openModal(description) {
// 			const modal = document.getElementById("serviceModal");
// 			const modalText = document.getElementById("modalText");

// 			// Set modal content
// 			modalText.textContent = `${description}`;

// 			// Display the modal
// 			modal.style.display = "flex";
// 		}

// 		const down = document.getElementById("down");
// 		down.addEventListener("click", closeModal);

// 		// Function to close the modal
// 		function closeModal() {
// 			const modal = document.getElementById("serviceModal");
// 			modal.style.display = "none";
// 		}
// 	})
// }

// populateServiceContainer();

function fetchServicesDataFromLocalStorage() {
    const servicesData = JSON.parse(sessionStorage.getItem("productsAndServicesData"));
    return servicesData;
}

// getDoc(productsAndServicesDocRef).then((doc) => {
//     const servicesDropdownMenu = document.getElementById("servicesDropdownMenu");
//     const services = doc.data().services; 
//     console.log("hello",services)

//     // Loop through the services array and create anchor tags dynamically
//     services.forEach((service, index) => {
//         const dropdownItem = document.createElement("a");
//         dropdownItem.href = `service.html?#serviceBox_${index}`;
//         dropdownItem.classList.add("dropdown-item");
//         dropdownItem.textContent = service.title;

//         // Append the dynamically created anchor tag to the dropdown menu
//         servicesDropdownMenu.appendChild(dropdownItem);
//     });
// });
async function populateServiceContainer() {
    const servicesData = fetchServicesDataFromLocalStorage();
    console.log(servicesData);
    console.log(servicesData.servicesCaption);
    console.log("point",servicesData);
   

    if (!servicesData || !servicesData.services) {
        console.log("No Service data available.");
        return;
    }
    const serviceCaption = document.getElementById("ourServicesCaption");
    serviceCaption.textContent = servicesData.servicesCaption;

    const allServiceContainer = document.getElementById("serviceContainer");
    //allProductContainer.innerHTML = "";

    servicesData.services.forEach((service, index) => {
        console.log(service.servicesPoints);
        const serviceBoxId = `serviceBox_${index}`;
        const serviceBox = document.createElement("div");
        serviceBox.id = serviceBoxId;  // Set the id
        serviceBox.classList.add("container-fluid", "wow", "py-5", "fadeInUp", "product-border");
        
        serviceBox.dataset.wowDelay = `${0.3 * (index + 1)}s`;

        const serviceContainer = document.createElement("div");
        serviceContainer.classList.add("container", "py-2");

        const servicesRow = document.createElement("div");
        servicesRow.classList.add("row", "g-5");

        const serviceColumn = document.createElement("div");
        serviceColumn.classList.add("col-lg-7");

        const serviceTitle = document.createElement("h4");
        serviceTitle.classList.add("fw-bold", "text-primary", "text-uppercase");
        serviceTitle.textContent = service.title;

        const serviceDesp = document.createElement("p");
        serviceDesp.classList.add("font-weight-bold");
        serviceDesp.textContent = service.description;
        serviceTitle.style.overflow = "hidden";

        const servicePointsContainer = document.createElement("div");
        servicePointsContainer.classList.add("service-points-container");

        if (service.servicesPoints && service.servicesPoints.length > 0) {
            service.servicesPoints.forEach((point, index) => {
                const col = document.createElement("div");
                col.className = "col-12 wow zoomIn";
                col.setAttribute("data-wow-delay", 0.2 * (index + 1) + "s");

                const pointElement = document.createElement("div");
                pointElement.className = "mb-3 d-flex align-items-start";

                // Add the icon to the pointElement using addIconToElement function
                addIconToElement(pointElement)
                    .then((message) => {
                        // Icon added successfully
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                const textContainer = document.createElement("div");
                textContainer.style.flexGrow = 1;
                textContainer.textContent = service.servicesPoints[index];
                console.log("points",service.servicesPoints[index])

                pointElement.appendChild(textContainer);
                col.appendChild(pointElement);
                servicePointsContainer.appendChild(col);
            });
        } else {
            const noPointsMessage = document.createElement("p");
            noPointsMessage.textContent = "";
            servicePointsContainer.appendChild(noPointsMessage);
        }


        serviceColumn.appendChild(serviceTitle);
        serviceColumn.appendChild(serviceDesp);
        serviceColumn.appendChild(servicePointsContainer);
        // productColumn.appendChild(pointsDiv);

        

        servicesRow.appendChild(serviceColumn);

        serviceContainer.appendChild(servicesRow);
        serviceBox.appendChild(serviceContainer);
        allServiceContainer.appendChild(serviceBox);


        const imageColumn = document.createElement("div");
        imageColumn.classList.add("col-lg-5");

        const imageBox = document.createElement("div");
        imageBox.classList.add("position-relative", "w-100", "h-100");

        const image = document.createElement("img");
        image.src = service.serviceImageUrl;
        image.style.maxWidth = "100%";
        image.style.height = "100%";
        image.style.padding = "0 10px 10px 10px";
        image.style.borderRadius = "10px";
        image.alt = "image";
        imageBox.appendChild(image);
        imageColumn.appendChild(imageBox);
        servicesRow.appendChild(imageColumn);

        serviceContainer.appendChild(servicesRow);
        serviceBox.appendChild(serviceContainer);
        allServiceContainer.appendChild(serviceBox);



        });

}
const addIconToElement = (pointElement) => {
	return new Promise((resolve, reject) => {
		const icon = document.createElement("i");
		icon.classList.add("fas", "fa-check", "text-primary", "me-3");

		icon.style.marginTop = "auto"; // Align the icon to the middle vertically
        icon.style.marginBottom = "auto"; 

		setTimeout(() => {
			pointElement.insertBefore(icon, pointElement.firstChild);
			resolve("Icon successfully appended to pointElement");
		}, 1000);
	});
};
populateServiceContainer();
new WOW().init();
