using Microsoft.AspNetCore.Mvc;

namespace Zuma.Web.Controllers
{
    public class ResultsController : Controller
    {
        private readonly ILogger<ResultsController> _logger;

        public ResultsController(ILogger<ResultsController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}