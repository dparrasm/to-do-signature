export const unsignedDocumentsReminder = (titles) => {
  return {
    subject: "Reminder: Unsigned documents waiting for your attention",
    message: "Dear valued user,\n"
      .concat(
        "\nWe hope this email finds you well. We are reaching out to remind you that you have some"
      )
      .concat("\ndocuments pending signature on our document signing platform.")
      .concat("\n more concretely, the following ones: \n")
      .concat(titles)
      .concat(
        "\nPlease log in to your account and sign the necessary documents at your earliest"
      )
      .concat("\nconvenience.")
      .concat(
        "\nThank you for choosing our platform for your document signing needs."
      )
      .concat("\nBest regards")
      .concat("\nFirm@ team."),
  };
};

export const documentsSuccessfullySigned = {
  subject: "Your documents have been successfully signed",
  message: "Dear valued user,\n"
    .concat(
      "\nWe are pleased to inform you that all of your documents have now been successfully"
    )
    .concat(
      "\nsigned on our document signing platform. You may log in to your account to view the "
    )
    .concat("\nsigned documents and download them if necessary.")
    .concat(
      "\nThank you for choosing our platform for your document signing needs.\n"
    )
    .concat("\n\nBest regards")
    .concat("\nFirm@ team."),
};
export const passwordResetRequest = (password) => {
  return {
    subject: "Password reset request",
    message: "Dear valued user,\n"
      .concat(
        "\nWe have received a request to reset your password for your account on our platform. To"
      )
      .concat(
        "\nensure the security of your account, we have temporarily generated a new password for"
      )
      .concat("\nyou.\n")
      .concat(
        "\nPlease use the following temporary password to log in to your account:\n"
      )
      .concat("\n" + password + "\n\n")
      .concat(
        "\n\nOnce you have logged in, we strongly recommend that you change your password to one"
      )
      .concat("\n\nthat is secure and easy for you to remember.")
      .concat(
        "\n\nIf you did not make this request, please contact our support team immediately for"
      )
      .concat("\nassistance.")
      .concat("\n\nBest regards")
      .concat("\nFirm@ team."),
  };
};
