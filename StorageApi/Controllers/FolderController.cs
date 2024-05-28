using Microsoft.AspNetCore.Mvc;
using StorageApi.Models;

namespace StorageApi.Controllers
{
    [Route("[controller]")]
    public class FolderController : Controller
    {
        private readonly IConfiguration _configuration;

        public FolderController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpPost]
        public IActionResult Create([FromBody] string folderPath)
        {
            var mainPath = this._configuration["MainDirectory"];
            try
            {
                if (mainPath == null)
                {
                    throw new Exception();
                }

                var path = Path.GetFullPath(mainPath + "/" + folderPath);

                if (Directory.Exists(path))
                {
                    throw new Exception();
                }

                Directory.CreateDirectory(path);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] string folderPath)
        {
            var mainPath = this._configuration["MainDirectory"];

            try
            {
                if (mainPath == null)
                {
                    throw new Exception();
                }

                var path = Path.GetFullPath(mainPath + "/" + folderPath);

                if (!Directory.Exists(path))
                {
                    throw new Exception();
                }

                if (
                    Directory.GetFiles(path).Length == 0
                    && Directory.GetDirectories(path).Length == 0
                )
                {
                    Directory.Delete(path, true);
                    return Ok();
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }
    }
}
