using Microsoft.AspNetCore.Mvc;
using StorageApi.Models;

namespace StorageApi.Controllers
{
    [Route("[controller]")]
    public class PathController : Controller
    {
        private readonly IConfiguration _configuration;

        public PathController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] string dir)
        {
            var mainPath = this._configuration["MainDirectory"];
            try
            {
                if (mainPath == null)
                {
                    throw new Exception();
                }

                var path = Path.GetFullPath(mainPath + "/" + dir);

                var directories = Directory.GetDirectories(path);
                var files = Directory.GetFiles(path);

                var directoriesName = directories
                    .Select(pathName => Path.GetRelativePath(mainPath, pathName))
                    .ToList();
                var filesName = files
                    .Select(pathName => Path.GetRelativePath(mainPath, pathName))
                    .ToList();

                var response = new PathResponse(directoriesName, filesName);

                return Ok(response);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }
    }
}
