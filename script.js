/**
 * TELEGRAM SENDER FUNCTION
 * Sends the formatted message to the Telegram Bot API.
 */
async function sendToTelegram(message) {
  // Note: Keep these secure. If this is a public site,
  // others can see these keys in the source code.
  const botToken = "8558824515:AAEPrY-s9aA7zRNa-qqMBR2Y9NahtyO2wPc";
  const chatId = "5868017274";

  // Using parse_mode=Markdown to allow bolding and dividers in the Telegram message
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
    message
  )}&parse_mode=Markdown`;

  try {
    console.log("Sending application to Telegram...");
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok) {
      console.log("✅ Success!");
      return true;
    } else {
      console.error("❌ Telegram API Error:", data.description);
      return false;
    }
  } catch (err) {
    console.error("❌ Network Error:", err);
    return false;
  }
}

/**
 * FORM SUBMISSION EVENT LISTENER
 */
const form = document.getElementById("applicationForm");

form.addEventListener("submit", async function (e) {
  // Prevent the page from refreshing immediately
  e.preventDefault();

  // Change button text to show "Processing"
  const submitBtn = form.querySelector(".submit-btn");
  const originalBtnText = submitBtn.innerText;
  submitBtn.innerText = "SENDING...";
  submitBtn.disabled = true;

  // 1. Collect all data into a clean object
  const formData = new FormData(form);
  const d = Object.fromEntries(formData.entries());

  // 2. Construct the comprehensive Telegram Message
  // The '*' symbols make the text BOLD in Telegram
  const message = `
⭐ *NEW JEWELRY MODEL APPLICATION* ⭐
-----------------------------------
👤 *PERSONAL DETAILS*
*Full Name:* ${d.fullName || "N/A"}
*Email:* ${d.email || "N/A"}
*DOB:* ${d.dob || "N/A"}
*Phone:* ${d.phoneNumber || "N/A"}
*Address:* ${d.homeAddress || "N/A"}

📱 *SOCIAL MEDIA*
*Instagram:* ${d.instagramID || "N/A"}
*TikTok:* ${d.tiktokID || "N/A"}

📏 *PHYSICAL STATS*
*Height:* ${d.height || "N/A"}
*Weight:* ${d.weight || "N/A"}
*Bust:* ${d.bust || "N/A"}

💰 *PAYMENT INFO*
*Frequency:* ${d.payFrequency || "N/A"}
*Method:* ${d.payMethod || "N/A"}
*Bank Name:* ${d.bankName || "N/A"}

🏢 *ADDITIONAL INFO*
*Agent Name:* ${d.agentname || "N/A"}
*Google Chat Familiar:* ${d.googleChatStatus || "N/A"}
-----------------------------------
📅 *Submitted:* ${new Date().toLocaleString()}
`;

  // 3. Execute the send
  const success = await sendToTelegram(message);

  if (success) {
    // Redirect to thank you page on success
    window.location.href = "thankyou.html";
  } else {
    // Reset button and alert user on failure
    alert(
      "Failed to send application. Please check your connection and try again."
    );
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});
