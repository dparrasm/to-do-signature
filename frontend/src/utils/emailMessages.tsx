export const documentsReadyToBeSign = {
  subject: "Action Required: Your documents are ready for signature",
  message: "Dear valued user,\n"
    .concat(
      "\nWe are pleased to inform you that your documents are now ready for signature on our document signing platform Firm@"
    )
    .concat(
      "\n\nPlease log in to your account to review and sign the necessary documents at your earliest convenience."
    )
    .concat(
      "\n\nThank you for choosing our platform for your document signing needs."
    )
    .concat("\n\nBest regards,")
    .concat("\n\nFirm@ team."),
};

export const invitationEmail = (password) => {
  return {
    subject: "Invitation to join our platform with temporary password",
    message: "Dear valued user,\n"
      .concat(
        "\nWe are pleased to welcome you to our platform and invite you to experience the benefits"
      )
      .concat(
        "\nof our document signing service. Your account has been created and we have temporarily"
      )
      .concat("\ngenerated a password for you to log in.")
      .concat(
        "\nPlease use the following temporary password to log in to your account:\n"
      )
      .concat("\n\n" + password + "\n\n")
      .concat(
        "\n\nOnce you have logged in, we strongly recommend that you change your password to one"
      )
      .concat("\n\nthat is secure and easy for you to remember.")
      .concat(
        "\n\nIf you have any questions or need assistance, our support team is available to assist you."
      )
      .concat("\nassistance.")
      .concat("\n\nBest regards")
      .concat("\nFirm@ team."),
  };
};
