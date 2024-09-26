document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch user details using AJAX
    function fetchUserDetails() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "user_details.php", true);
        
        xhr.onload = function () {
            if (this.status === 200) {
                // Insert the response (HTML table) into the userDetails div
                document.getElementById("userDetails").innerHTML = this.responseText;
            } else {
                console.error("Error fetching user details");
            }
        };

        xhr.onerror = function () {
            console.error("Request failed");
        };

        xhr.send();
    }

    // Call the function to fetch user details when the page loads
    fetchUserDetails();
});
