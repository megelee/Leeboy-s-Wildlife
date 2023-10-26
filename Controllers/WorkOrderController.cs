using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using LeeboysWildlife.Data;
using LeeboysWildlife.Models;

namespace LeeboysWildlife.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkOrderController : ControllerBase
{
    private LeeboysWildlifeDbContext _dbContext;

    public WorkOrderController(LeeboysWildlifeDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet("incomplete")]
[Authorize]
public IActionResult GetIncompleteWorkOrders()
{
    return Ok(_dbContext.WorkOrders
        .Where(wo => wo.DateCompleted == null)
        .Include(wo => wo.Employee) // Replace "Employee" with the actual navigation property name representing employees
        .OrderBy(wo => wo.DateCreated)
        .ThenByDescending(wo => wo.UserProfileId == null)
        .ToList());
}

    [HttpPost]
[Authorize]
public IActionResult CreateWorkOrder(WorkOrder workOrder)
{
    workOrder.DateCreated = DateTime.Now;
    _dbContext.WorkOrders.Add(workOrder);
    _dbContext.SaveChanges();
    return Created($"/api/workorder/{workOrder.Id}", workOrder);
}

[HttpGet("all")]
[Authorize]
public IActionResult Get()
{
    // Get all of the services from the database
    var workOrders = _dbContext.WorkOrders.ToList();

    return Ok(workOrders);
}
[HttpPut("{id}")]
[Authorize]
public IActionResult UpdateWorkOrder(int id, [FromBody] WorkOrder updatedWorkOrder)
{
    WorkOrder workOrderToUpdate = _dbContext.WorkOrders.SingleOrDefault(wo => wo.Id == id);
    if (workOrderToUpdate == null)
    {
        return NotFound();
    }
    else if (id != updatedWorkOrder.Id)
    {
        return BadRequest();
    }

    // Update all properties based on updatedWorkOrder
    _dbContext.Entry(workOrderToUpdate).CurrentValues.SetValues(updatedWorkOrder);

    _dbContext.SaveChanges();

    return NoContent();
}

[HttpPost("complete/{id}")]
    [Authorize]
    public IActionResult CompleteWorkOrder(int id)
    {
        WorkOrder workOrder = _dbContext.WorkOrders.SingleOrDefault(wo => wo.Id == id);
        if (workOrder == null)
        {
            return NotFound();
        }
        else if (id != workOrder.Id)
        {
            return BadRequest();
        }

        workOrder.DateCompleted = DateTime.Now;
        _dbContext.SaveChanges();
        return Created($"/api/workorder/complete/{workOrder.Id}", workOrder);
    }
    [HttpDelete("{id}/delete")]
    [Authorize]
    public IActionResult DeleteWorkOrder(int id)
    {
        WorkOrder workOrderToDelete = _dbContext.WorkOrders.SingleOrDefault(wo => wo.Id == id);
        if (workOrderToDelete == null)
        {
            return NotFound();
        }
        _dbContext.WorkOrders.Remove(workOrderToDelete);
        _dbContext.SaveChanges();
        return NoContent();
    } 

       [HttpGet("{id}")]
        public async Task<ActionResult<WorkOrder>> GetWorkOrder(int id)
        {
            try
            {
                var workOrder = await _dbContext.WorkOrders
                    .Include(wo => wo.Employee) // Include related data as needed
                    .FirstOrDefaultAsync(wo => wo.Id == id);

                if (workOrder == null)
                {
                    return NotFound(); // Work order with the specified ID was not found
                }

                return workOrder;
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed (e.g., log or return a custom error response)
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }

    }}
        