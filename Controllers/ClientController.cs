using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LeeboysWildlife.Data;
using LeeboysWildlife.Models;

namespace LeeboysWildlife.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private LeeboysWildlifeDbContext _dbContext;

        public ClientController(LeeboysWildlifeDbContext context)
        {
            _dbContext = context;
        }

[HttpGet]
[Authorize]
public IActionResult Get()
{
    var clients = _dbContext.Clients.ToList();

    return Ok(clients);
}

        
[HttpGet("{id}")]
[Authorize]
public IActionResult GetById(int id)
{
    // Get the service
   Client client= _dbContext.Clients.SingleOrDefault(c => c.Id == id);

    if (client == null)
    {
        return NotFound();
    }

    return Ok(client);
}
}
}