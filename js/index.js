import {
	addDoc,
	collection,
	doc,
	getDoc,
	serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import {
	listAll,
	ref,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";
import { firestore, storage } from "./firebase-config.js";

const totfdCollection = collection(firestore, "totfd");
const contactAndPaymentsDocRef = doc(totfdCollection, "ContactAndPayments");
const homepageDocRef = doc(totfdCollection, "Homepage");

function getHomePageDataFromFirestoreAndSave() {
	getDoc(homepageDocRef)
		.then((docSnapshot) => {
			if (docSnapshot.exists()) {
				const homepageData = docSnapshot.data();
				console.log(homepageData);
				if (homepageData) {
					const navbar = document.querySelector(".navbar");
					const font = homepageData.font;
					const fontSize = homepageData.fontSize;
					if (font) {
						navbar.style.fontFamily = font;
						document.body.style.fontFamily = font;
						if (fontSize) {
							navbar.style.fontSize = fontSize;
						}
					}
					const aboutUsImage = document.getElementById("aboutUsImage");
					const aboutUsPageImageUrl = homepageData.aboutUsPageimageurl;

					if (aboutUsPageImageUrl) {
						aboutUsImage.src = aboutUsPageImageUrl;
					} else {
						aboutUsImage.style.display = "none";
					}
					console.log("Homepage data found in session storage");

					const homepageImageUrl1 = homepageData.homePageImageUrl1;
					const homepageImageUrl2 = homepageData.homePageImageUrl2;

					document.getElementById("logoimage").src = homepageData.logoimageurl;

					const webAppName = document.getElementById("webAppName");
					if (webAppName) {
						webAppName.textContent = homepageData.webAppName;
					}

					// const captionSpan = document.getElementById("caption");
					// captionSpan.textContent = homepageData.webAppName;

					const webAppName1 = document.getElementById("webAppName1");
					webAppName1.textContent = homepageData.webAppName;

					const webAppName2 = document.getElementById("webAppName2");
					webAppName2.textContent = homepageData.webAppName;

					const homePageCaption = document.getElementById("homePageCaption");
					homePageCaption.textContent = homepageData.homePageCaption;

					const homePageWelcome = document.getElementById("homePageWelcome");
					homePageWelcome.textContent = homepageData.homePageWelcome;

					const specialofferMessageText = document.getElementById("specialofferMessage");
					specialofferMessageText.textContent = homepageData.specialOfferMessage;

					console.log("message" , homepageData.specialofferMessage)
					const footerMessage = document.getElementById("footerMessage");
					if (homepageData && homepageData.footerMessage !== undefined) {
						footerMessage.textContent = homepageData.footerMessage;
					} else {
						footerMessage.textContent = null;
					}

					if (homepageImageUrl1 && homepageImageUrl2) {
						console.log(homepageImageUrl1);
						console.log(homepageImageUrl2);
						document.getElementById("homePageImage").src = homepageImageUrl1;
						document.getElementById("homePageImage2").src = homepageImageUrl2;
					} else {
						console.log("No background image to set");
					}

					const aboutUsCaption = document.getElementById("aboutUsCaption");
					aboutUsCaption.textContent = homepageData.aboutUsCaption;

					const aboutUsCaption2 = document.getElementById("aboutUsCaption2");
					aboutUsCaption2.textContent = homepageData.aboutUsCaption2;

					const aboutUsHeader = document.getElementById("aboutUsHeader");
					aboutUsHeader.textContent = homepageData.aboutUsHeader;

					const aboutUsFooter = document.getElementById("aboutUsFooter");
					aboutUsFooter.textContent = homepageData.aboutUsFooter;

					const aboutUsPoints = document.getElementById("aboutUsPoints");
					homepageData.aboutUsPoints.forEach((point, index) => {
						const col = document.createElement("div");
						col.className = "col-12 wow zoomIn";
						col.setAttribute("data-wow-delay", 0.2 * (index + 1) + "s");

						const pointElement = document.createElement("div"); // Use a div instead of h5
						pointElement.className = "mb-3 d-flex align-items-start fw-bold"; // Add d-flex and align-items-start classes

						// Add the icon to the pointElement using addIconToElement function
						addIconToElement(pointElement)
							.then((message) => {
								// Icon added successfully
							})
							.catch((error) => {
								console.error(error);
							});

						const textContainer = document.createElement("div");
						textContainer.style.flexGrow = 1; // Make textContainer take up remaining space
						textContainer.textContent = point;

						pointElement.appendChild(textContainer);
						col.appendChild(pointElement);
						aboutUsPoints.appendChild(col);
					});
					sessionStorage.setItem("homepageData", JSON.stringify(homepageData));
				}
			} else {
				console.log("Homepage document does not exist.");
			}
		})
		.catch((error) => {
			console.error("Error fetching Homepage document:", error);
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


async function servicesAndProducts() {
	try {
		const homePageDataSnapshot = await getDoc(homepageDocRef);
		const homePageData = homePageDataSnapshot.data();

		const productsAndServicesDocRef = doc(
			totfdCollection,
			"ProductsAndServices"
		);
		getDoc(productsAndServicesDocRef).then((doc) => {
			const servicesDropdownMenu = document.getElementById("servicesDropdownMenu");
			const services = doc.data().services; 
			// console.log("hello",services)
		
			// Loop through the services array and create anchor tags dynamically
			services.forEach((service, index) => {
				const dropdownItem = document.createElement("a");
				dropdownItem.href = `service.html?#serviceBox_${index}`;
				dropdownItem.classList.add("dropdown-item");
				dropdownItem.textContent = service.title;
		
				// Append the dynamically created anchor tag to the dropdown menu
				servicesDropdownMenu.appendChild(dropdownItem);
			});
		});
		if (homePageData && homePageData.showServiceSection) {
			const docSnapshot = await getDoc(productsAndServicesDocRef);
			const productsAndServicesData = docSnapshot.data();

			if (
				docSnapshot.exists &&
				productsAndServicesData.servicesCaption &&
				homePageData.showServiceSection === true
			) {
				sessionStorage.setItem(
					"productsAndServicesData",
					JSON.stringify(productsAndServicesData)
				);

				//console.log(homePageData);
				const servicesLink = document.getElementById("services");
				servicesLink.style.display = "block";
				const servicesLink2 = document.getElementById("services2");
				servicesLink2.style.display = "block";

				const serviceContainer = document.getElementById("serviceContainer");
				serviceContainer.style.display = "block";
				const serviceContainer2 = document.getElementById("serviceContainer2");
				serviceContainer2.style.display = "block";

				const servicesTitle = document.getElementById("servicesTitle");
				servicesTitle.textContent = productsAndServicesData.servicesCaption;

				const servicesRow = document.getElementById("servicesRow");
				productsAndServicesData.services.forEach((service, index) => {
					const serviceColumn = document.createElement("div");
					serviceColumn.className = "col-lg-4 col-md-6 wow zoomIn";
					serviceColumn.setAttribute("data-wow-delay", 0.3 * (index + 1) + "s");

					const serviceItem = document.createElement("div");
					serviceItem.className =
						"service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center";

					const cardBody = document.createElement("div");
					cardBody.classList.add(
						"service-item",
						"bg-light",
						"rounded",
						"d-flex",
						"flex-column",
						"align-items-center",
						"justify-content-center",
						"text-center"
					);


					const iconContainer = document.createElement("div");
					iconContainer.classList.add('rounded-2', "shadow")
					iconContainer.style.width = "200px";
					iconContainer.style.height = "200px";
					iconContainer.style.overflow = "hidden";
						
					const icon = document.createElement("img");
					icon.src = service.serviceImageUrl;
					icon.alt = "Service Icon";
					icon.style.width = "100%";
					icon.style.height = "100%";
					icon.style.cursor = "pointer"
					// icon.addEventListener('click',()=>{
					// 	window.location.href = "service.html"
					// })
					icon.addEventListener('click', () => {
						window.location.href = "service.html?#serviceBox_"+index;
					});
					
					iconContainer.appendChild(icon);
					cardBody.appendChild(iconContainer);

					const serviceTitle = document.createElement("h4");
					serviceTitle.className = "mb-3";
					serviceTitle.textContent = service.title;

					// const serviceDescription = document.createElement("p");
					// serviceDescription.className = "m-0";
					// serviceDescription.textContent = service.description;

					const serviceLink = document.createElement("a");
					serviceLink.className = "btn btn-lg btn-primary rounded";
					//serviceLink.setAttribute("href", "./contact.html");
					const linkIcon = document.createElement("i");
					linkIcon.className = "bi bi-arrow-right";
					serviceLink.appendChild(linkIcon);
						serviceLink.addEventListener('click',()=>{
							window.location.href = "service.html?#serviceBox_"+index;
						})
						

					serviceItem.appendChild(icon);
					serviceItem.appendChild(serviceTitle);
					//serviceItem.appendChild(serviceDescription);
					serviceItem.appendChild(serviceLink);

					serviceColumn.appendChild(serviceItem);
					servicesRow.appendChild(serviceColumn);

				});



				const servicesDropdown = document.getElementById("servicesDropdown");
				productsAndServicesData.services.forEach((service) => {
					const option = document.createElement("option");
					option.value = service.title;
					option.text = service.title;
					servicesDropdown.appendChild(option);
				});
			}

			if (
				docSnapshot.exists &&
				productsAndServicesData.productCaption &&
				homePageData.showProductSection === true
			) {
				sessionStorage.setItem(
					"productsAndServicesData",
					JSON.stringify(productsAndServicesData)
				);

				const moreLink = document.getElementById("more");
				moreLink.style.display = "block";
				const productsLink = document.getElementById("products");
				productsLink.style.display = "block";
				const productsLink2 = document.getElementById("products2");
				productsLink2.style.display = "block";
			}
		}
	} catch (error) {
		console.log("Error checking for service data:", error);
	}
}


function displaySocialIcons(data) {
	const connectWithUsBanner = document.getElementById("connectWithUsBanner");
	connectWithUsBanner.innerHTML = "";
	if (
		data &&
		(data.hasOwnProperty("facebook") ||
			data.hasOwnProperty("instagram") ||
			data.hasOwnProperty("youtube") ||
			data.hasOwnProperty("twitter") ||
			data.hasOwnProperty("linkedin"))
	) {
		connectWithUsBanner.style.display = "flex";

		if (data.facebook && data.facebook !== null) {
			const facebookIcon = createSocialIcon(
				"facebook",
				data.facebook,
				"fab fa-facebook-f"
			);
			connectWithUsBanner.appendChild(facebookIcon);
		}
		if (data.instagram && data.instagram !== null) {
			const instagramIcon = createSocialIcon(
				"instagram",
				data.instagram,
				"fab fa-instagram"
			);
			connectWithUsBanner.appendChild(instagramIcon);
		}
		if (data.youtube && data.youtube !== null) {
			const youtubeIcon = createSocialIcon(
				"youtube",
				data.youtube,
				"fab fa-youtube"
			);
			connectWithUsBanner.appendChild(youtubeIcon);
		}
		if (data.twitter && data.twitter !== null) {
			const twitterIcon = createSocialIcon(
				"twitter",
				data.twitter,
				"fab fa-twitter"
			);
			connectWithUsBanner.appendChild(twitterIcon);
		}
		if (data.linkedin && data.linkedin !== null) {
			const linkedinIcon = createSocialIcon(
				"linkedin",
				data.linkedin,
				"fab fa-linkedin"
			);
			connectWithUsBanner.appendChild(linkedinIcon);
		}
	}
}
function createSocialIcon(platform, url, iconClass) {
	const icon = document.createElement("a");
	icon.className = "btn btn-primary btn-square me-2";
	icon.href = url;
	icon.target = "_blank";
	const iconImage = document.createElement("i");
	iconImage.className = iconClass + " fw-normal";
	icon.appendChild(iconImage);
	return icon;
}
function getDataFromFirestoreAndSave() {

	const productClientDocref = doc(totfdCollection, "clientProductRef");
	getDoc(productClientDocref)
		.then((docSnapshot) => {
			if (docSnapshot.exists()) {
				const data = docSnapshot.data();
				const clientsInformationData = data.clients || [];
				sessionStorage.setItem("clientsList", JSON.stringify(clientsInformationData));
				if (Array.isArray(clientsInformationData) && clientsInformationData.length > 0) {
					const clientsLink = document.getElementById("clients");
					clientsLink.style.display = "block";
					const clientsLink2 = document.getElementById("clients2");
					clientsLink2.style.display = "block";
				}



			}
		})
		.catch((error) => {
			console.error("Error checking for clients:", error);
		});




	const careersDocRef = doc(totfdCollection, "Careers");

	getDoc(contactAndPaymentsDocRef)
		.then((doc) => {
			if (doc.exists) {
				const data = doc.data();
				if (
					data &&
					(data.facebook || data.instagram || data.youtube || data.twitter || data.linkedin)
				) {
					displaySocialIcons(data);
				}
				sessionStorage.setItem("contactAndPaymentData", JSON.stringify(data));
				const locationData = document.querySelector(
					".location-section .contact-data"
				);
				if (data && data.location) {
					locationData.textContent = data.location;
				}

				// Update email data
				const emailData = document.querySelector(
					".email-section .contact-data"
				);
				if (data && data.email) {
					emailData.textContent = data.email;
				}

				const phoneData = document.querySelector(
					".phone-section .contact-data"
				);
				const phoneData2 = document.querySelector(
					".phone-section .contact-data2"
				);
				if (data && data.mobile1) {
					const mobile = data.mobile1;
					//phoneData2.textContent = formattedMobile;
					document
						.getElementById("whatsappButton")
						.addEventListener("click", function () {
							const message = "Hello! I want to inquire about your Courses.";
							window.open(
								`https://wa.me/${mobile}?text=${encodeURIComponent(message)}`
							);
						});
					document
						.getElementById("whatsappButton2")
						.addEventListener("click", function () {
							const message = "Hello! I want to inquire about your courses.";
							window.open(
								`https://wa.me/${mobile}?text=${encodeURIComponent(message)}`
							);
						});
				}

				if (data && data.mobile1) {
					const formattedMobile1 = `+91 ${data.mobile1.substring(
						0,
						5
					)} ${data.mobile1.substring(5)}`;
					phoneData.textContent = formattedMobile1;
					//phoneData2.textContent = formattedMobile;
				}

				if (data && data.mobile2) {
					const formattedMobile1 = `+91 ${data.mobile2.substring(
						0,
						5
					)} ${data.mobile2.substring(5)}`;
					//phoneData.textContent = formattedMobile;
					phoneData2.textContent = formattedMobile1;
				}
				const phoneData5 = document.querySelector(".phone-section2 .contact-data2");
				const phoneData3 = document.querySelector(".phone-section2 .contact-data3");
				const phoneData4 = document.querySelector(".phone-section2 .contact-data4");
				if (data && data.mobile1) {
					//phoneData.textContent = data.mobile;
					const formattedMobile = `+91 ${data.mobile1.substring(
						0,
						5
					)} ${data.mobile1.substring(5)}`;
					phoneData5.textContent = formattedMobile;
				} else {
					console.log("No payment data found in session storage.");
				}
				if (data && data.mobile2) {
					//phoneData.textContent = data.mobile;
					const formattedMobile2 = `+91 ${data.mobile2.substring(
						0,
						5
					)} ${data.mobile2.substring(5)}`;
					phoneData3.textContent = formattedMobile2;
				}
				else {
					console.log("No payment data found in session storage.");
				}
				if (data && data.mobile3) {
					//phoneData.textContent = data.mobile;
					const formattedMobile3 = `+91 ${data.mobile3.substring(
						0,
						5
					)} ${data.mobile3.substring(5)}`;
					phoneData4.textContent = formattedMobile3;
				}
				else {
					console.log("No payment data found in session storage.");
				}


				if (data && data.imageUrl) {
					//console.log(data.imageUrl);
					const paymentsLink = document.getElementById("payments");
					paymentsLink.style.display = "block";
					const paymentsLink2 = document.getElementById("payments2");
					paymentsLink2.style.display = "block";
				}
			}
		})
		.catch((error) => {
			console.error("Error getting document:", error);
		});

	getDoc(careersDocRef)
		.then((docSnapshot) => {
			if (docSnapshot.exists()) {
				const data = docSnapshot.data();
				const careersData = data.jobs || [];
				//console.log(data);
				const displayedCareers = careersData.filter(
					(career) => career.displayed === true
				);
				if (Array.isArray(displayedCareers) && displayedCareers.length > 0) {
					const moreLink = document.getElementById("more");
					moreLink.style.display = "block";
					const careersLink = document.getElementById("careers");
					careersLink.style.display = "block";
					const careersLink2 = document.getElementById("careers2");
					careersLink2.style.display = "block";
					sessionStorage.setItem(
						"careersData",
						JSON.stringify(displayedCareers)
					);
				}
			}
		})
		.catch((error) => {
			console.log("Error checking for careers:", error);
		});

	const storageRef = ref(storage, "totfd/gallery-images");

	listAll(storageRef)
		.then((res) => {
			const hasGallery = res.items.length > 0;
			sessionStorage.setItem("hasGallery", hasGallery);
			if (res.items.length > 0) {
				const moreLink = document.getElementById("more");
				moreLink.style.display = "block";
				const galleryLink = document.getElementById("gallery");
				const galleryLink2 = document.getElementById("gallery2");
				galleryLink.style.display = "block";
				galleryLink2.style.display = "block";
			}
		})
		.catch((error) => {
			console.log("Error checking for files:", error);
			0;
		});
	console.log("session storage loaded");
}

const sessionStorageSize = JSON.stringify(sessionStorage).length;
console.log("Session storage size:", sessionStorageSize, "bytes");

// document.addEventListener("DOMContentLoaded", function () {
// 	const testimonialCarousel = document.querySelector(".testimonial-carousel");
// 	const moreLink = document.getElementById("more");
// 	const reviewSection = document.getElementById("reviewSection");
// 	const reviewsLink = document.getElementById("reviews");
// 	const reviewsLink2 = document.getElementById("reviews2");
// 	const reviewDocRef = doc(totfdCollection, "Reviews");

// 	const clientsDocRef = doc(totfdCollection, "Clients");

// 	//console.log("Fetching document...");
// 	getDoc(reviewDocRef)
// 		.then((docSnapshot) => {
// 			//console.log("Document snapshot received:", docSnapshot);
// 			if (docSnapshot.exists) {
// 				const data = docSnapshot.data();
// 				const reviewsData = data.reviews || [];

// 				if (Array.isArray(reviewsData) && reviewsData.length > 0) {
// 					//console.log("Reviews data found:", reviewsData);
// 					moreLink.style.display = "block";
// 					reviewsLink.style.display = "block";
// 					reviewsLink2.style.display = "block";
// 					reviewSection.style.display = "block";

// 					reviewsData.forEach((review) => {
// 						const testimonialItem = document.createElement("div");
// 						testimonialItem.classList.add("testimonial-item", "bg-light");

// 						const innerContent = `
//                             <div class="d-flex align-items-center border-bottom pt-5 pb-4 px-5">
//                                 <img class="img-fluid rounded" src="${review.picUrl}" style="width: 60px; height: 60px" />
//                                 <div class="ps-4">
//                                     <h4 class="text-primary mb-1">${review.name}</h4>
//                                 </div>
//                             </div>
//                             <div class="pt-4 pb-5 px-5">
//                                 ${review.text}
//                             </div>
//                         `;
// 						testimonialItem.innerHTML = innerContent;
// 						testimonialCarousel.appendChild(testimonialItem);
// 						console.log("Added testimonial:", review.name);
// 					});

// 					$(testimonialCarousel).owlCarousel({
// 						autoplay: true,
// 						smartSpeed: 1500,
// 						dots: true,
// 						loop: true,
// 						center: true,
// 						responsive: {
// 							0: {
// 								items: 1,
// 							},
// 							576: {
// 								items: 1,
// 							},
// 							768: {
// 								items: 2,
// 							},
// 							992: {
// 								items: 3,
// 							},
// 						},
// 					});

// 					sessionStorage.setItem("reviewsData", JSON.stringify(reviewsData));
// 					console.log("Reviews data stored in sessionStorage.");
// 				}
// 			} else {
// 				console.log("Document does not exist.");
// 			}
// 		})
// 		.catch((error) => {
// 			console.log("Error checking for reviews:", error);
// 		});

// 	const teamContainer = document.getElementById("teamContainer");
// 	const foundersDocRef = doc(totfdCollection, "Founders");

// 	getDoc(foundersDocRef)
// 		.then((docSnapshot) => {
// 			if (docSnapshot.exists) {
// 				const data = docSnapshot.data();
// 				const foundersData = data.founders || [];

// 				if (Array.isArray(foundersData) && foundersData.length > 0) {
// 					const foundersLink = document.getElementById("founders");
// 					foundersLink.style.display = "block";
// 					const foundersLink2 = document.getElementById("founders2");
// 					foundersLink2.style.display = "block";
// 					const TeamSection = document.getElementById("TeamSection");
// 					TeamSection.style.display = "block";
// 					sessionStorage.setItem("foundersData", JSON.stringify(foundersData));

// 					foundersData.forEach((founder, index) => {
// 						const colDelay = (index + 1) * 0.3;
// 						const colElement = document.createElement("div");
// 						colElement.classList.add("col-12", "wow", "slideInUp");
// 						colElement.setAttribute("data-wow-delay", `${colDelay}s`);

// 						const teamItem = document.createElement("div");
// 						teamItem.classList.add(
// 							"team-item",
// 							"bg-light",
// 							"rounded",
// 							"overflow-hidden"
// 						);

// 						const teamImg = document.createElement("div");
// 						teamImg.classList.add("team-img", "position-relative", "overflow-hidden", "d-flex", "justify-content-center", "align-items-center");

// 						const imgElement = document.createElement("img");
// 						imgElement.classList.add("img-fluid", "w-100");
// 						imgElement.style.maxWidth = "250px"; // Adjust this value as needed
// 						imgElement.style.height = "auto";
// 						imgElement.src = founder.picUrl;
// 						imgElement.alt = founder.founderName;
// 						teamImg.appendChild(imgElement);

// 						const teamSocial = document.createElement("div");
// 						teamSocial.classList.add("team-social");
// 						teamSocial.style.display = "none";

// 						const socialIcons = [
// 							"fa fa-globe",
// 							"fab fa-facebook-f",
// 							"fab fa-instagram",
// 							"fab fa-linkedin-in",
// 						];

// 						socialIcons.forEach((iconClass) => {
// 							const icon = document.createElement("i");
// 							icon.setAttribute(
// 								"class",
// 								`btn btn-lg btn-primary btn-lg-square rounded ${iconClass} fw-normal`
// 							);
// 							teamSocial.appendChild(icon);
// 						});

// 						teamImg.appendChild(teamSocial);
// 						teamItem.appendChild(teamImg);
// 						teamImg.addEventListener("mouseover", () => {
// 							teamSocial.style.display = "none";
// 						});

// 						teamImg.addEventListener("mouseout", () => {
// 							teamSocial.style.display = "none";
// 						});

// 						const textCenter = document.createElement("div");
// 						textCenter.classList.add("py-4");

// 						const nameElement = document.createElement("h4");
// 						nameElement.classList.add("text-center", "text-primary");
// 						nameElement.textContent = founder.founderName;
// 						textCenter.appendChild(nameElement);

// 						const designationElement = document.createElement("p");
// 						designationElement.classList.add("text-center", "text-uppercase", "m-0");
// 						designationElement.textContent = founder.founderDesignation;
// 						textCenter.appendChild(designationElement);

// 						const descriptionElement = document.createElement("p");
// 						descriptionElement.classList.add("text-muted", "mt-3", "p-2");
// 						descriptionElement.textContent = founder.founderDescription;
// 						textCenter.appendChild(descriptionElement);

// 						const descriptionContainer = document.createElement("div");
// 						descriptionContainer.classList.add("row");
// 						const descriptionCol = document.createElement("div");
// 						descriptionCol.classList.add("col-12");
// 						descriptionContainer.appendChild(descriptionCol);

// 						teamItem.appendChild(textCenter);
// 						teamItem.appendChild(descriptionContainer);
// 						colElement.appendChild(teamItem);
// 						teamContainer.appendChild(colElement);
// 					});
// 				}
// 			}
// 		})
// 		.catch((error) => {
// 			console.log("Error checking for founders:", error);
// 		});

// 	getDoc(clientsDocRef)
// 		.then((docSnapshot) => {
// 			if (docSnapshot.exists()) {
// 				const data = docSnapshot.data();
// 				const clientsData = data.clients || [];
// 				console.log(data.clients);
// 				if (Array.isArray(clientsData) && clientsData.length > 0) {
// 					const clientsLink = document.getElementById("Certifications");
// 					clientsLink.style.display = "block";
// 					// const clientsLink2 = document.getElementById("clients2");
// 					// clientsLink2.style.display = "block";
// 					const vendorSection = document.getElementById("vendorSection");
// 					vendorSection.style.display = "block";

// 					const clientsArray = [];

// 					clientsData.forEach((client) => {
// 						clientsArray.push(client);
// 					});
// 					sessionStorage.setItem("clientsData", JSON.stringify(clientsArray));
// 					// initializeClientCarousel();	
// 				}

// 			}
// 		})
// 		.catch((error) => {
// 			console.error("Error checking for clients:", error);
// 		});


// });

// function initializeClientCarousel() {
// 	console.log("xxx");

// 	const storedClientsData = sessionStorage.getItem("clientsData");

// 	if (storedClientsData) {
// 	  const clientsData = JSON.parse(storedClientsData);
// 	  const vendorSection = document.getElementById("vendorSection");

// 	  // Clear existing content in the vendorSection
// 	  vendorSection.innerHTML = "";

// 	  clientsData.forEach((client) => {
// 		const clientContainer = document.createElement("div");
// 		clientContainer.classList.add("client-container");

// 		const imgElement = document.createElement("img");
// 		imgElement.src = client.picUrl;
// 		imgElement.alt = client.name;
// 		imgElement.style.display = "block";
// 		clientContainer.appendChild(imgElement);

// 		const nameElement = document.createElement("p");
// 		nameElement.textContent = client.name;
// 		nameElement.style.fontSize = "14px";
// 		nameElement.style.color = "#333";
// 		nameElement.style.margin = "0";
// 		nameElement.style.textAlign = "center";
// 		clientContainer.appendChild(nameElement);

// 		vendorSection.appendChild(clientContainer);
// 	  });

// 	  // Initialize Owl Carousel after populating the vendorSection
// 	  $("#vendorSection").owlCarousel({
// 		loop: true,
// 		margin: 45,
// 		dots: false,
// 		autoplay: true,
// 		smartSpeed: 1000,
// 		responsive: {
// 		  0: {
// 			items: 2,
// 		  },
// 		  576: {
// 			items: 4,
// 		  },
// 		  768: {
// 			items: 6,
// 		  },
// 		  992: {
// 			items: 8,
// 		  },
// 		},
// 	  });
// 	} else {
// 	  console.log("No data in session storage");
// 	}
// }


document.addEventListener("DOMContentLoaded", function () {
    const testimonialCarousel = document.getElementById("testimonial-carousel");
    const reviewSection = document.getElementById("reviewSection");

    // Dummy reviews data
    const reviewsData = [
        {
            name: "Subhash G T",
            picUrl: "./img/testimonial-avatar.png",
			text:"Amfosys exceeded all my expectations with their SAP training program! The trainers were industry experts who provided in-depth knowledge and practical exercises that were invaluable. The comprehensive course material and the supportive staff made my learning experience truly remarkable. I highly recommend Amfosys for anyone pursuing SAP certification."
        },
        {
            name: "Surya Narayana Reddy",
            picUrl: "./img/testimonial-avatar.png",
			text: "Attending Amfosys for SAP training was a great decision! The instructors were experts in their fields and provided practical, hands-on training that was critical for my SAP certification. The course material was thorough, and the support staff was incredibly helpful. I highly recommend Amfosys to anyone looking to advance their SAP skills"
        },
        {
            name: "Bikram Kumar",
            picUrl: "./img/testimonial-avatar.png",
			text:"I had an outstanding experience at Amfosys for my SAP training! The instructors were exceptionally knowledgeable and provided hands-on training that was crucial for my SAP certification. The course material was detailed and easy to understand, and the support staff was always ready to help. I highly recommend Amfosys to anyone looking to excel in SAP"
        },
        {
            name: "Chethan Gowda",
            picUrl: "./img/testimonial-avatar.png",
			text:" The instructors not only imparted deep knowledge of SAP modules but also tailored the learning experience to suit individual learning styles. The hands-on approach and real-world simulations were incredibly effective in bridging theory with practical application. The guidance from the support team was exceptional throughout. Amfosys sets a gold standard in SAP training, and I can confidently recommend them to anyone looking to master SAP"
		},
        {
            name: "Chandrakaanth",
            picUrl: "./img/testimonial-avatar.png",
			text:"Amfosys exceeded all my expectations with their SAP training program! The trainers were industry experts who provided in-depth knowledge and practical exercises that were invaluable. The comprehensive course material and the supportive staff made my learning experience truly remarkable. I highly recommend Amfosys for anyone pursuing SAP certification."
		}
    ];

    // Display reviews
    if (Array.isArray(reviewsData) && reviewsData.length > 0) {
        reviewSection.style.display = "block";

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

        // Initialize Owl Carousel
        $(testimonialCarousel).owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            center: true,
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 },
                992: { items: 3 },
            },
        });

        console.log("Reviews data displayed from local definition.");
    }
});


document.addEventListener("DOMContentLoaded", function () {
	showSpinner();
	getHomePageDataFromFirestoreAndSave();
	getDataFromFirestoreAndSave();
	servicesAndProducts();
	displayVideoOnHomepage();
	setTimeout(function () {
		hideSpinner();
	}, 2000);
});

var showSpinner = function () {
	$("#spinner").addClass("show");
};

var hideSpinner = function () {
	if ($("#spinner").length > 0) {
		$("#spinner").removeClass("show");
	}
};
document
	.getElementById("submitButton")
	.addEventListener("click", function (event) {
		event.stopPropagation();
		event.preventDefault();

		const name = document.querySelector('input[placeholder="Your Name"]').value;
		const email = document.querySelector(
			'input[placeholder="Your Email"]'
		).value;
		const mobile = document.querySelector(
			'input[placeholder="Your Mobile Number"]'
		).value;
		const service = document.getElementById("servicesDropdown").value || null;
		const message =
			document.querySelector('textarea[placeholder="Message"]').value || null;
		const timestamp = serverTimestamp(firestore);

		const nameError = document.getElementById("nameError");
		const emailError = document.getElementById("emailError");
		const mobileError = document.getElementById("mobileError");

		let isValid = true;

		if (!name) {
			nameError.style.display = "block";
			isValid = false;
		} else {
			nameError.style.display = "none";
		}

		if ((!email && !mobile) || (email && !validateEmail(email))) {
			emailError.style.display = "block";
			isValid = false;
		} else {
			emailError.style.display = "none";
		}

		if ((!email && !mobile) || (mobile && !validateMobile(mobile))) {
			mobileError.style.display = "block";
			isValid = false;
		} else {
			mobileError.style.display = "none";
		}

		if (isValid) {
			const totfd = collection(firestore, "totfd");
			const totfdDocRef = doc(totfd, "totfdDoc");
			const leadsCollection = collection(totfdDocRef, "leadsData");

			const formData = {
				timestamp: timestamp,
				name: name,
				email: email,
				mobile: mobile,
				subject: service,
				comments: message,
				status: "New",
			};

			emailjs.init("2lPToPbLczjJAp1J8");
			const templateParams = {
				to_email: "info@amfosys.com",
				from_name: name,
				from_email: email || "Not Provided",
				mobile_number: mobile || "Not Provided",
				subject: service,
				message: message,
			};
			emailjs
				.send("service_vdatjg2", "template_xd89fld", templateParams)
				.then(function (response) {
					console.log("Email sent:", response);
				})
				.catch(function (error) {
					console.error("Email sending failed:", error);
				});

			addDoc(leadsCollection, formData)
				.then((docRef) => {
					console.log("Document written with ID: ", docRef.id);
					successMessage.style.display = "block";
					document.getElementById("serviceForm").reset();
					setTimeout(() => {
						successMessage.style.display = "none";
					}, 3000);
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
				});


		}
	});

function validateEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}
function validateMobile(mobile) {
	const re = /^\d{10}$/;
	return re.test(mobile);
}


async function displayVideoOnHomepage() {
	try {
		const docSnapshot = await getDoc(homepageDocRef);
		if (docSnapshot.exists()) {
			const data = docSnapshot.data();
			const videoUrl1 = data.videoUrl1;
			const videoUrl2 = data.videoUrl2;

			// Display the videos on the homepage
			displayVideo(videoUrl1, 'videoPlayer1');
			displayVideo(videoUrl2, 'videoPlayer2');
		} else {
			console.log("Homepage document does not exist.");
		}
	} catch (error) {
		console.error("Error fetching video URLs from Firestore:", error);
	}
}

function displayVideo(url, videoPlayerId) {
	var videoPlayer = document.getElementById(videoPlayerId);
	// var playButton = document.getElementById(playButtonId);

	videoPlayer.src = url;
	videoPlayer.load();

	// Add event listener to play button
	// playButton.addEventListener('click', function () {
	//     videoPlayer.play();
	// });
}
