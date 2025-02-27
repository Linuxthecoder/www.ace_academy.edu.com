document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("enrollmentForm");
    const submitButton = form.querySelector("button[type='submit']");
    const messageDiv = document.getElementById("enrollmentMessage");

    // Function to get the current date and time in a readable format
    const getTimestamp = () => {
        const now = new Date();
        const date = now.toISOString();  // ISO format (e.g., 2025-02-27T10:30:00.000Z)
        return date;
    };

    const handleFormSubmit = async (formData) => {
        try {
            // Add timestamp to form data
            const timestamp = getTimestamp();
            formData.timestamp = timestamp;

            // Send form data with timestamp
            const response = await axios.post("http://localhost:4000/submit", formData);
            console.log("Enrollment Success:", response.data.message);

            // Show success message
            messageDiv.textContent = response.data.message;
            messageDiv.className = "message success";
            messageDiv.hidden = false;

            // Reset the form after successful submission
            form.reset();

        } catch (error) {
            console.error("Error submitting form:", error);

            // Show error message
            messageDiv.textContent = "An error occurred. Please try again.";
            messageDiv.className = "message error";
            messageDiv.hidden = false;
        }
    };

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        submitButton.textContent = "Submitting...";
        submitButton.disabled = true;
        messageDiv.hidden = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Call handleFormSubmit to submit the form data using axios
        await handleFormSubmit(data);

        // Reset the submit button
        submitButton.textContent = "Submit";
        submitButton.disabled = false;
    });
});
