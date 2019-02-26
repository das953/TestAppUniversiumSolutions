using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace TestAppUniversiumSolutions.Controllers
{
    [Route("api/[controller]/")]
    public class FilesController : Controller
    {
        private IHostingEnvironment _env;

        public FilesController(IHostingEnvironment env)
        {
            _env = env;
        }

        [HttpGet("[action]")]
        public IActionResult GetImageByName(string fileName)
        {
            try
            {
                var webRoot = _env.ContentRootFileProvider.GetDirectoryContents("Resources\\images");
                if (webRoot.Exists)
                {                    
                    var fileInfo = webRoot.Where(f => f.Name == fileName).FirstOrDefault();
                    if (!string.IsNullOrEmpty(fileInfo.PhysicalPath))
                    {
                        var fileExtension = Path.GetExtension(fileName);
                        var image = System.IO.File.OpenRead(fileInfo.PhysicalPath);
                        return File(image, $"image/{fileExtension.Substring(1, fileExtension.Length-1)}");
                    }
                }
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
            return StatusCode(404);
        }
    }
}
