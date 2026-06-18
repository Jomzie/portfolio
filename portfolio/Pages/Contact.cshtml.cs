using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using portfolio.Models;

namespace portfolio.Pages
{
    public class ContactModel : PageModel
    {
        private readonly ILogger<ContactModel> _logger;

        public ContactModel(ILogger<ContactModel> logger)
        {
            _logger = logger;
        }

        [BindProperty]
        public ContactMessage Contact { get; set; }

        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    ErrorMessage = "Please fill in all required fields correctly.";
                    return Page();
                }

                // Validate email format
                if (string.IsNullOrWhiteSpace(Contact.Email) || !Contact.Email.Contains("@"))
                {
                    ErrorMessage = "Please enter a valid email address.";
                    return Page();
                }

                // Set sent date
                Contact.SentDate = DateTime.Now;

                // Here you would typically:
                // 1. Save to database
                // 2. Send email notification
                // 3. Log the submission

                _logger.LogInformation($"Contact form submitted: {Contact.Name} ({Contact.Email}) - Subject: {Contact.Subject}");

                // For now, we'll just show a success message
                SuccessMessage = "Thank you for your message! I'll get back to you soon.";

                // Clear the form
                Contact = new ContactMessage();

                return Page();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing contact form");
                ErrorMessage = "An error occurred while sending your message. Please try again.";
                return Page();
            }
        }
    }
}
