using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LeeboysWildlife.Data;
using LeeboysWildlife.Models;

namespace LeeboysWildlife.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private LeeboysWildlifeDbContext _dbContext;

        public EmployeeController(LeeboysWildlifeDbContext context)
        {
            _dbContext = context;
        }

[HttpGet]
[Authorize]
public IActionResult Get()
{
    // Get all of the services from the database
    var employees = _dbContext.Employees.ToList();

    return Ok(employees);
}

        
[HttpGet("{id}")]
[Authorize]
public IActionResult GetById(int id)
{
    // Get the service
    Employee employee= _dbContext.Employees.SingleOrDefault(e => e.Id == id);

    if (employee == null)
    {
        return NotFound();
    }

    return Ok(employee);
}
    [HttpPost]
[Authorize]
public IActionResult CreateEmployee(Employee employee)
{
    _dbContext.Employees.Add(employee);
    _dbContext.SaveChanges();
    return Created($"/api/employee/{employee.Id}", employee);
}
[HttpPost("deactivate/{id}")]
[Authorize]
public IActionResult DeactivateEmployee(int id)
{
    var employee = _dbContext.Employees.SingleOrDefault(e => e.Id == id);
    if (employee == null)
    {
        return NotFound();
    }

    employee.Active = false;
    _dbContext.SaveChanges();

    return Ok();
}

    }
}
