function doPost(e) {
  try {
    // Parse incoming payload
    var postData = JSON.parse(e.postData.contents);
    var recipientEmail = postData.recipientEmail;
    var fileTitle = postData.fileTitle;
    var accessMessage = postData.accessMessage || "No additional message provided.";
    
    if (!recipientEmail || !fileTitle) {
      throw new Error("Missing required fields: recipientEmail or fileTitle");
    }
    
    // Construct professional HTML email content
    var emailSubject = "🔒 Secure Document Shared: " + fileTitle;
    
    var htmlBody = 
      "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #0b132b; color: #f1f5f9;'>" +
        "<div style='text-align: center; border-bottom: 1px solid #3a4468; padding-bottom: 15px; margin-bottom: 20px;'>" +
          "<h1 style='color: #22d3ee; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1.5px;'>SmartSystems Enclave</h1>" +
          "<p style='color: #94a3b8; font-size: 11px; margin: 5px 0 0 0;'>SECURE DECENTRALIZED DATA EXCHANGE</p>" +
        "</div>" +
        "<div style='padding: 10px 0;'>" +
          "<p style='font-size: 14px; line-height: 1.6;'>Greetings operations agent,</p>" +
          "<p style='font-size: 14px; line-height: 1.6;'>A secure enclave document signature has been shared with you via the SmartSystems portal.</p>" +
          
          "<div style='background-color: #1c2541; padding: 15px; border-radius: 8px; border-left: 4px solid #22d3ee; margin: 20px 0;'>" +
            "<table style='width: 100%; border-collapse: collapse; font-size: 13px; color: #e2e8f0;'>" +
              "<tr>" +
                "<td style='padding: 5px 0; font-weight: bold; width: 120px;'>Document:</td>" +
                "<td style='padding: 5px 0; font-family: monospace; color: #22d3ee;'>" + fileTitle + "</td>" +
              "</tr>" +
              "<tr>" +
                "<td style='padding: 5px 0; font-weight: bold;'>Security Status:</td>" +
                "<td style='padding: 5px 0; font-weight: bold; color: #34d399;'>AES-256 ENCRYPTED</td>" +
              "</tr>" +
              "<tr>" +
                "<td style='padding: 5px 0; font-weight: bold; vertical-align: top;'>Access Note:</td>" +
                "<td style='padding: 5px 0; font-style: italic; color: #cbd5e1;'>" + accessMessage + "</td>" +
              "</tr>" +
            "</table>" +
          "</div>" +
          
          "<p style='font-size: 14px; line-height: 1.6;'>This secure link and access key signature will remain valid for the next 7 days. If you did not expect this document transfer, please immediately notify the enclave security operations team.</p>" +
        "</div>" +
        "<div style='border-top: 1px solid #3a4468; padding-top: 15px; margin-top: 25px; text-align: center; font-size: 11px; color: #64748b;'>" +
          "<p style='margin: 0;'>Automated dispatch system. Please do not reply directly to this message.</p>" +
          "<p style='margin: 5px 0 0 0;'>SmartSystems Technologies Corp. &copy; 2026</p>" +
        "</div>" +
      "</div>";
      
    // Send email using GmailApp
    GmailApp.sendEmail(recipientEmail, emailSubject, "A secure document has been shared with you: " + fileTitle + "\n\nNote: " + accessMessage, {
      htmlBody: htmlBody,
      name: "SmartSystems Enclave"
    });
    
    // Return success response
    var response = {
      status: "success",
      message: "Secure transmission initiated successfully."
    };
    return ContentService.createTextOutput(JSON.stringify(response))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    var errResponse = {
      status: "error",
      message: error.toString()
    };
    return ContentService.createTextOutput(JSON.stringify(errResponse))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
