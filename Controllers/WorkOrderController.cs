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
public IActionResult UpdateWorkOrder(WorkOrder workOrder, int id)
{
    WorkOrder workOrderToUpdate = _dbContext.WorkOrders.SingleOrDefault(wo => wo.Id == id);
    if (workOrderToUpdate == null)
    {
        return NotFound();
    }
    else if (id != workOrder.Id)
    {
        return BadRequest();
    }

    //These are the only properties that we want to make editable
    workOrderToUpdate.Description = workOrder.Description;
    workOrderToUpdate.UserProfileId = workOrder.UserProfileId;

    _dbContext.SaveChanges();

    return NoContent();
}
[HttpPut("{id}/complete")]
    //[Authorize]
    public IActionResult UpDateAsComplete(WorkOrder workOrder, int id)
    {
        WorkOrder workOrderToUpdate = _dbContext.WorkOrders.SingleOrDefault(wo => wo.Id == id);
        if (workOrderToUpdate == null)
        {
            return NotFound();
        }
        else if (id != workOrder.Id)
        {
            return BadRequest();
        }
        workOrderToUpdate.DateCompleted = DateTime.Now;
        _dbContext.SaveChanges();
        return NoContent();
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

}