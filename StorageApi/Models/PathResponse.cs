using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StorageApi.Models
{
    public class PathResponse
    {
        public List<string> Directories { get; set; }
        public List<string> Files { get; set; }

        public PathResponse(List<string> directories, List<string> files)
        {
            this.Directories = directories;
            this.Files = files;
        }
    }
}
