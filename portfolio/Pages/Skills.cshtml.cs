using Microsoft.AspNetCore.Mvc.RazorPages;

namespace portfolio.Pages
{
    public class SkillsModel : PageModel
    {
        private readonly ILogger<SkillsModel> _logger;

        public SkillsModel(ILogger<SkillsModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
