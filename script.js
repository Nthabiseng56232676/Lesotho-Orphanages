document.addEventListener("DOMContentLoaded", () => {
    const orphanageList = document.getElementById("orphanage-list");
    const orphanageDetails = document.getElementById("orphanage-details");
    const apiUrl = "https://lesotho-orphanages.vercel.app";

    // Function to fetch orphanage details by ID
    function fetchOrphanageDetails(id) {
        fetch(`${apiUrl}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((details) => {
                const amountDonated = details.donated;
                const targetAmount = details.target;
                const progress = (amountDonated / targetAmount) * 100;

                // Create a progress bar
                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');
                progressBar.style.width = `${progress}%`;

                // Display donation information and progress bar
                const detailsDiv = document.createElement('div');
                detailsDiv.innerHTML = `
                    <h2>${details.name}</h2>
                    <p>Location: ${details.location}</p>
                    <img src="${details.image}" alt="${details.name}" height="300px" width="600px"/>
                    <h3>Donation Details</h3>
                    <p>Amount Donated: $${amountDonated}</p>
                    <p>Target Amount: $${targetAmount}</p>
        
                    <p><b>ProgressBar</b></p>
                `;
                detailsDiv.appendChild(progressBar);

                orphanageDetails.innerHTML = ''; // Clear previous details
                orphanageDetails.appendChild(detailsDiv);
                orphanageList.classList.remove("visible");
                orphanageDetails.classList.add("visible");
            })
            .catch((error) => {
                console.error('Error fetching orphanage details:', error);
            });
    }

    // Fetch orphanages and populate the homepage
    fetch(`${apiUrl}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((orphanage) => {
                const orphanageName = document.createElement("h3");
                orphanageName.innerText = orphanage.name;
                orphanageName.classList.add("clickable");
                orphanageName.addEventListener("click", () => {
                    fetchOrphanageDetails(orphanage.id);
                });
                orphanageList.appendChild(orphanageName);
            });
        })
        .catch((error) => {
            console.error('Error fetching orphanages:', error);
        });
});
