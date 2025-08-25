function addToQuickFind() {
    document.getElementById("addToQuickFindButton").classList.add('hidden');
    const name = 'TLMP feedback';
    const title = `Totally Legit Movie Player (feedback)`;
    const message = document.getElementById("feedback").value.trim();

    if (!message) {
        alert("Please write some feedback before sending.");
        document.getElementById("addToQuickFindButton").classList.remove('hidden');
        return;
    }

    const templateParams = {
        name: name,
        title: title,
        message: message
    };

    emailjs.send("service_h1t6bl8", "template_b2j91g6", templateParams).then(
        (response) => {
            console.log("Feedback sent successfully!", response.status, response.text);
            alert("Thank you for your feedback!");
            document.getElementById("feedback").value = '';
            document.getElementById("addToQuickFindButton").classList.remove('hidden');
        })
        .catch(err => {
            console.error("Error sending feedback:", err);
            alert("Failed to send feedback. Try again later.");
            document.getElementById("addToQuickFindButton").classList.remove('hidden');
        });
}
