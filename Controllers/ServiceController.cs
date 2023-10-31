using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LeeboysWildlife.Data;
using LeeboysWildlife.Models;

namespace LeeboysWildlife.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private LeeboysWildlifeDbContext _dbContext;

        public ServiceController(LeeboysWildlifeDbContext context)
        {
            _dbContext = context;
        }

[HttpGet]
// [Authorize]
public IActionResult Get()
{
    // Get all of the services from the database
    var services = _dbContext.Services.ToList();

    return Ok(services);
}

        
[HttpGet("{id}")]
// [Authorize]
public IActionResult GetById(int id)
{
    // Get the service
    Service service = _dbContext.Services.SingleOrDefault(s => s.Id == id);

    if (service == null)
    {
        return NotFound();
    }

    return Ok(service);
}
}
}

