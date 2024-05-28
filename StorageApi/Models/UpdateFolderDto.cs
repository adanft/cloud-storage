using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StorageApi.Models
{
    public class UpdateFolderDto
    {
        public required string OldPath { get; set; }
        public required string NewPath { get; set; }
    }
}
