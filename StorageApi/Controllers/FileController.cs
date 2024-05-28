using Microsoft.AspNetCore.Mvc;

namespace StorageApi.Controllers
{
    [Route("[controller]")]
    public class FileController : Controller
    {
        private readonly IConfiguration _configuration;

        public FileController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetFile([FromQuery] string dir, [FromQuery] string name)
        {
            var mainPath = this._configuration["MainDirectory"];

            try
            {
                if (mainPath == null)
                {
                    throw new Exception();
                }

                var path = Path.GetFullPath(mainPath + "/" + dir + "/" + name);

                var contentType = MimeMapping.MimeUtility.GetMimeMapping(path);
                var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);

                var response = new FileStreamResult(fileStream, contentType)
                {
                    FileDownloadName = name
                };

                return response;
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }

        [HttpPost]
        [RequestSizeLimit(long.MaxValue)]
        [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
        public async Task<IActionResult> PostFile(IFormFile file, [FromQuery] string dir)
        {
            var mainPath = this._configuration["MainDirectory"];

            try
            {
                if (mainPath == null)
                {
                    throw new Exception();
                }

                var path = Path.GetFullPath(mainPath + "/" + dir + "/" + file.FileName);

                await using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal Server Error.");
            }
        }

        [HttpDelete]
        public IActionResult DeleteFile([FromBody] string file)
        {
            var mainPath = this._configuration["MainDirectory"];

            try
            {
                var path = Path.GetFullPath(mainPath + "/" + file);

                if (!System.IO.File.Exists(path))
                {
                    throw new Exception();
                }

                System.IO.File.Delete(path);

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }
    }
}
