namespace LeeboysWildlife.Models;

public class Service
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ServiceTypeId { get; set; }
    public string Description { get; set; }


    public List <ServiceType> ServiceTypes { get; set; }
}